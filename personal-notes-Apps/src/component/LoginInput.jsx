import React, { useState } from "react";
import LocaleContext from "../context/LocalContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function LoginInput({ login }) {
  const [notes, setNotes] = useState({
    email: "",
    password: "",
  });
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);

  const onEmailChangeHandler = (event) => {
    setNotes({ ...notes, email: event.target.value });
  };

  const onPasswordChangeHandler = (event) => {
    setNotes({ ...notes, password: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email: notes.email,
      password: notes.password,
    });
  };

  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Silakan masuk untuk melanjutkan..."
          : "Please login to continue"}
      </h2>
      <form onSubmit={onSubmitHandler} className="login-input">
        <input
          type="email"
          placeholder="Email"
          value={notes.email}
          onChange={onEmailChangeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={notes.password}
          onChange={onPasswordChangeHandler}
        />
        <button>{locale === "id" ? "Masuk" : "Login"}</button>
      </form>
      <p>
        {locale === "id" ? "Belum punya akun?" : "No account yet?"}{" "}
        <Link to="/register">
          {locale === "id" ? "Daftar di sini!" : "Sign up here!"}
        </Link>
      </p>
    </section>
  );
}
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
