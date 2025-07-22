import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../context/LocalContext";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };
  }

  onTitleChangeEventHamdler = (event) => {
    this.setState(() => {
      const title = event.target.value;
      return {
        title,
      };
    });
  };

  onBodyChangeEventHandler = (event) => {
    const body = event.target.value;
    this.setState(() => {
      return {
        body,
      };
    });
  };

  onSubmitEventHandler = (event) => {
    event.preventDefault();
    this.props.addNote(this.state);
  };

  render() {
    return (
      <LocaleConsumer>
        {({ localeContext: { locale, toggleLocale } }) => {
          return (
            <form
              className="add-new-page__input"
              onSubmit={this.onSubmitEventHandler}
            >
              <input
                className="add-new-page__input__title"
                type="text"
                placeholder={locale === "id" ? "Masukkan Judul" : "Input Title"}
                value={this.state.title}
                onChange={this.onTitleChangeEventHamdler}
                required
              />

              <input
                className="add-new-page__input__body"
                type="text"
                placeholder={
                  locale === "id" ? "Tulis Catatan.." : "Write a Note.."
                }
                value={this.state.body}
                onChange={this.onBodyChangeEventHandler}
                required
              />
              <button type="submit" className="add-button">
                {locale === "id" ? "Tambah" : "Add"}
              </button>
              <Link to="/"></Link>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
