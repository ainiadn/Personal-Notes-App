import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiPlusCircle, FiLogOut } from "react-icons/fi";
import { LocaleConsumer } from "../context/LocalContext";

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
      {({ localeContext: { locale, toggleLocale } }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>
              <li>
                <Link to="/notes/new">
                  <FiPlusCircle />
                </Link>
              </li>
              <li>
                <Link to="/notesArchived/:id">Archived</Link>
              </li>
              <li>
                <button onClick={logout}>
                  {name}
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
