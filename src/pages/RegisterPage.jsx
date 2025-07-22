import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../component/RegistrasiInput";
import { register } from "../utils/network-data";
import LocaleContext from "../context/LocalContext";

function RegisterPage() {
  const navigate = useNavigate();
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }
  return (
    <section>
      <RegisterInput register={onRegisterHandler} />
    </section>
  );
}

export default RegisterPage;
