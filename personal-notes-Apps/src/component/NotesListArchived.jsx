import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import LocaleContext from "../context/LocalContext";

function NotesListArchived({ notes, onDelete, onUnArchived, onArchived }) {
  const filteredNotes = notes.filter((note) => note.archived === true);
  const {
    localeContext: { locale },
  } = React.useContext(LocaleContext);
  const noteLang = locale === "id" ? "Tidak ada catatan" : "No notes here";

  return (
    <div className="notes-list">
      {!filteredNotes.length
        ? noteLang
        : filteredNotes.map((noteItem) => (
            <NoteItem
              key={noteItem.id}
              id={noteItem.id}
              onDelete={onDelete}
              onUnArchived={onUnArchived}
              onArchived={onArchived}
              {...noteItem}
            />
          ))}
    </div>
  );
}

NotesListArchived.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  onUnArchived: PropTypes.func.isRequired,
};

export default NotesListArchived;
