import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";
import LocaleContext from "../context/LocalContext";

function ToggleTheme() {
  const { theme, toggleTheme } = React.useContext(LocaleContext);

  return (
    <button className="button_theme" onClick={toggleTheme}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ToggleTheme;
