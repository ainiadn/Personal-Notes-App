import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocalContext";

function NotesList({ notes, onDelete, onArchived, onUnArchived }) {
  const newNotes = notes.filter((note) => note.archived === false);
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);
  const noteLang = locale === "id" ? "Tidak ada catatan" : "No notes here";

  return (
    <div className="notes-list">
      {!newNotes.length
        ? noteLang
        : newNotes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              onDelete={onDelete}
              onArchived={onArchived}
              onUnArchived={onUnArchived}
              {...note}
            />
          ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  onUnArchived: PropTypes.func.isRequired,
};

export default NotesList;
