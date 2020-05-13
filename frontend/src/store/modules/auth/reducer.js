import produce from "immer";

const INITIAL_STATE = {
  token: null,
  signed: false, //controla usuario logado
  loading: false //controla animação na tela
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      //Ok! Você está querendo logar então pode mostra a animação de carregando na tela!! ... sagas.js
      case "@auth/SIGN_IN_REQUEST": {
        draft.loading = true;
        break;
      }
      //Tudo certo com os dados!!
      case "@auth/SIGN_IN_SUCCESS": {
        //Guarda o token dele ai!!
        draft.token = action.payload.token;
        //Atualiza o status dele para logado!!
        draft.signed = true;
        //Finaliza a animação de carregando na tela!!
        draft.loading = false;
        break;
      }
      //Dados incorretos!!
      case "@auth/SIGN_FAILURE": {
        //Finaliza a animação de carregando na tela!!
        draft.loading = false;
        break;
      }
      //O Cara quer ir embora!!
      case "@auth/SIGN_OUT": {
        draft.token = null; //remove o token dele
        draft.signed = false; //finaliza a sessão dele
        break;
      }
      default:
    }
  });
}
