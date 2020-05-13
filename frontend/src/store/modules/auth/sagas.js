import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signInSuccess, signFailure } from "./actions";
// Calma ai!! vou verificar se voce pode logar...
export function* signIn({ payload }) {
  try {
    const { email, password } = payload; //Peguei seus dados

    const response = yield call(api.post, "sessions", {
      //Vou enviar para o servidor validar!!
      email,
      password
    });

    const { token, user } = response.data; // OK! esse usuario está valido

    if (!user.provider) {
      // Cara, você está logando na plataforma errada, Seus dados só são validos para app mobile
      toast.error("Usuário não é prestador");
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`; // Apartir de agora vou utilizar seu token para saber se é você mesmo

    yield put(signInSuccess(token, user)); //Os dados estão corretos pode prosseguir! ... reducer.js

    history.push("/dashboard"); // Manda ele para essa pagina
  } catch (err) {
    toast.error("Falha na auttenticação, verifique seus dados"); // Cara esses dados estão todos errados!!
    console.tron.log(err); // mostra o erro no tron
    yield put(signFailure()); // Os dados estão incorretos!! ... reducer.js
  }
}

// Calma ai!! Tentar te cadastrar...
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload; //Peguei seus dados
    yield call(api.post, "users", {
      // Vou enviar seus dados
      name,
      email,
      password,
      provider: true // Você vai ser Provider
    });
    history.push("/"); //Tudo pronto, agora vá efetuar o login
  } catch (err) {
    toast.error("Falha no cadastro, verifique seus dados"); //Uhm não consegui te cadastrar
    yield put(signFailure()); //Deu um erro aqui nos dados! ...actions.js
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/");
}

//Rotas chamadas pelos reducers e actions
export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT", signOut)
]);
