"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _datefns = require('date-fns');
var _ptBR = require('date-fns/locale/pt-BR'); var _ptBR2 = _interopRequireDefault(_ptBR);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _Appointment = require('../models/Appointment'); var _Appointment2 = _interopRequireDefault(_Appointment);

var _Notification = require('../schemas/Notification'); var _Notification2 = _interopRequireDefault(_Notification);

var _CancellationMail = require('../jobs/CancellationMail'); var _CancellationMail2 = _interopRequireDefault(_CancellationMail);
var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await _Appointment2.default.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'canceled_at', 'past', 'cancelable'],
      limit: 1,
      offset: (page - 1) * 1,
      include: [
        {
          model: _User2.default,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: _File2.default,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if user_id is different of provider
     */
    if (req.userId === provider_id) {
      return res.status(400).json({ error: 'Appointment denied' });
    }

    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await _User2.default.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * Check for past date
     */
    const hourStart = _datefns.startOfHour.call(void 0, _datefns.parseISO.call(void 0, date));

    if (_datefns.isBefore.call(void 0, hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permitted' });
    }

    /**
     * Check date availability
     */
    const checkAvailability = await _Appointment2.default.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appintment date is not available' });
    }
    const appointment = await _Appointment2.default.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    /**
     * Notify appointment provider
     */
    const user = await _User2.default.findByPk(req.userId);
    const formattedDate = _datefns.format.call(void 0, hourStart, "dd 'de' MMMM', às' H:mm", {
      locale: _ptBR2.default,
    });
    await _Notification2.default.create({
      content: `Novo agendamento de ${user.name} para o dia ${formattedDate}.`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await _Appointment2.default.findByPk(req.params.id, {
      include: [
        {
          model: _User2.default,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: _User2.default,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment",
      });
    }

    const dateWithSub = _datefns.subHours.call(void 0, appointment.date, 2);

    if (_datefns.isBefore.call(void 0, dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You cant only cancel appointment 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await _Queue2.default.add(_CancellationMail2.default.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

exports. default = new AppointmentController();
