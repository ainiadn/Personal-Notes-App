import React from "react";
import {
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import NotesListArchived from "../component/NotesListArchived";
import SearchBar from "../component/SearchBar";
import { useSearchParams } from "react-router-dom";
// import PropTypes from "prop-types";
import LocaleContext from "../context/LocalContext";

function ArchivedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredArchivedNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  async function onArchiveHandler(id) {
    await archiveNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  async function onUnArchivedHandler(id) {
    await unarchiveNote(id);

    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      <h2>
        {locale === "id" ? "Daftar Arsip Catatan" : "Archived Notes List"}
      </h2>

      <NotesListArchived
        notes={filteredArchivedNotes}
        onDelete={onDeleteHandler}
        onUnArchived={onUnArchivedHandler}
        onArchived={onArchiveHandler}
      />
    </section>
  );
}
export default ArchivedPage;
