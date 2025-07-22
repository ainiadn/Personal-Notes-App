import React, { useState } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocalContext";
import { Link } from "react-router-dom";

function RegisterInput({ register }) {
  const [notes, setNotes] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);

  const onNameChange = (event) => {
    setNotes({ ...notes, name: event.target.value });
  };

  const onEmailChange = (event) => {
    setNotes({ ...notes, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    setNotes({ ...notes, password: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    register({
      name: notes.name,
      email: notes.email,
      password: notes.password,
    });
  };

  return (
    <section className="register-page">
      <h2>
        {locale === "id"
          ? "Daftar untuk Menggunakan Aplikasi"
          : "Sign Up to use the app"}
      </h2>
      <form onSubmit={onSubmitHandler} className="register-input">
        <input
          type="text"
          placeholder={locale === "id" ? "Nama" : "Name"}
          value={notes.name}
          onChange={onNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={notes.email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={notes.password}
          onChange={onPasswordChange}
        />

        <button>{locale === "id" ? "Daftar" : "Register"}</button>
      </form>
      <p>
        {locale === "id" ? "Kembali ke" : "Back to"}{" "}
        <Link to="/">{locale === "id" ? "Masuk" : "Login"}</Link>
      </p>
    </section>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
