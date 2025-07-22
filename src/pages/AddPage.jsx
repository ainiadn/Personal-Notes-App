import React from "react";
// import { addNote } from "../utils/local-data";
import { addNote } from "../utils/network-data";
import NoteInput from "../component/NoteInput";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNotesHandler(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <section>
      <NoteInput addNote={onAddNotesHandler} />
    </section>
  );
}

export default AddPage;
