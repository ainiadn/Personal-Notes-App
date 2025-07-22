import React from "react";
import NotesList from "../component/NotesList";
import SearchBar from "../component/SearchBar";
import { useSearchParams } from "react-router-dom";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import LocaleContext from "../context/LocalContext";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  async function onArchiveHandler(id) {
    await archiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onUnArchivedHandler(id) {
    await unarchiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      <h2>{locale === "id" ? "Daftar Catatan" : "Notes List"}</h2>
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchived={onArchiveHandler}
        onUnArchived={onUnArchivedHandler}
      />
    </section>
  );
}

export default HomePage;
