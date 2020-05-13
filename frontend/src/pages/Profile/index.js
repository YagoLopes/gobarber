import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { signOut } from "~/store/modules/auth/actions";
import { updateProfileRequest } from "~/store/modules/user/actions";
import AvatarInput from "./AvatarInput";
import schema from "./schema";

import { Container } from "./styles";

export default function Dashboard() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        {/* <AvatarInput name="avatar_id" /> */}

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação da senha"
        />

        <button type="submit">Atualizar perfil</button>
        <button type="button" className="exit" onClick={handleSignOut}>
          Sair do GoBarber
        </button>
      </Form>
    </Container>
  );
}
