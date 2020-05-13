import produce from "immer";

const INITIAL_STATE = {
  profile: null // novos dados do perfil
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/SIGN_IN_SUCCESS": {
        draft.profile = action.payload.user;
        break;
      }

      //O cara alterou o perfil dele, pega os novos dados ai!! ... sagas.js
      case "@user/UPDATE_PROFILE_SUCCESS": {
        draft.profile = action.payload.profile; //Peguei!!
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
