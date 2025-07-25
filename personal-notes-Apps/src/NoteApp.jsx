import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import ArchivedPageWrapper from "./pages/ArchivedPage";
import ErrorPage from "./component/PageNotFound";
import { Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import ToggleTheme from "./component/ToggleTheme";
import { LocaleProvider } from "./context/LocalContext";
import ToggleLocale from "./component/ToggleLocale";
import HomePage from "./pages/HomePage";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";

          localStorage.setItem("theme", newTheme);

          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  onLogout = () => {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  };

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state}>
          <div className="app-container">
            <header className="header">
              <h1>
                {this.state.localeContext.locale === "id"
                  ? "Aplikasi Catatan Pribadi"
                  : "Personal Notes App"}
              </h1>
              <ToggleTheme />
              <ToggleLocale />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route
                  path="/register"
                  element={
                    <RegisterPage localeContext={this.state.localeContext} />
                  }
                />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }
    return (
      <LocaleProvider value={this.state}>
        <div className="app-container">
          <header className="header">
            <h1>
              <Link to="/">
                {this.state.localeContext.locale === "id"
                  ? "Aplikasi Catatan Pribadi"
                  : "Personal Notes App"}
              </Link>
            </h1>
            <ToggleTheme />
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/notes/new"
                element={<AddPage localeContext={this.state.localeContext} />}
              />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route
                path="/notesArchived/:id"
                element={<ArchivedPageWrapper />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default NoteApp;
