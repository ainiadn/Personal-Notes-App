import React from "react";
import LocaleContext from "../context/LocalContext";

function ToggleLocale() {
  const {
    localeContext: { locale, toggleLocale },
  } = React.useContext(LocaleContext);

  return (
    <button className="button_lang" onClick={toggleLocale}>
      {locale === "id" ? "en" : "id"}
    </button>
  );
}

export default ToggleLocale;
