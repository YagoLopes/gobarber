import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";

//Cara voce me mandou novos dados né...
export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data; // Peguei seus novos dados!!
    const profile = Object.assign(
      // Montei seu novo perfil!!
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, "users", profile); //Altera esses dados ai api!!

    toast.success("Perfil atualizado com sucesso!"); //Consegui Atualizar tudo!!

    yield put(updateProfileSuccess(response.data)); // Atualizei com sucesso!! ...action.js
  } catch (err) {
    toast.error("Erro ao atualizar seu perfil, confira seus dados!"); //Cara deu um erro nesses dados ai!!
    yield put(updateProfileFailure()); //Deu uma falha nesses novos dados!! ... action.js
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
