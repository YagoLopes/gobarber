"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'GoBarber <noreply@gobarber.com>',
  },
};
