//Actions do redux

export function signInRequest(email, password) {
  return {
    //Ei eu estou querendo logar toma aqui minhas credenciais!! ...reducer.js

    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, password }
  };
}

export function signInSuccess(token, user) {
  // Verifiquei seus dados e está tudo ok, pode prosseguir
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user }
  };
}

//Ei eu estou querendo me cadastar toma aqui meus dados!! ...sagas.js
export function signUpRequest(name, email, password) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: { name, email, password }
  };
}
//Deu erro com os dados
export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}
//To querendo finalizar minha sessão
export function signOut() {
  return {
    type: "@auth/SIGN_OUT"
  };
}
