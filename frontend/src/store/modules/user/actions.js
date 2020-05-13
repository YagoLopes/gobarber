//Atualiza esses dados ai no meu perfil!! ... reducer.js
export function updateProfileRequest(data) {
  return {
    type: "@user/UPDATE_PROFILE_REQUEST",
    payload: { data }
  };
}

//Atualizei os novos dados dele, pega ai eles atualizados!!
export function updateProfileSuccess(profile) {
  return {
    type: "@user/UPDATE_PROFILE_SUCCESS",
    payload: { profile } // peguei!!
  };
}

//Não consegui alterar seus dados !!
export function updateProfileFailure() {
  return {
    type: "@user/UPDATE_PROFILE_REQUEST"
  };
}
