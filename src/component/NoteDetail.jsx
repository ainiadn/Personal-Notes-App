import React from "react";
import PropTypes from "prop-types";
import NoteItemBody from "./NoteItemBody";

function NoteDetail({ title, createdAt, body, id }) {
  return (
    <div>
      <NoteItemBody id={id} title={title} body={body} createdAt={createdAt} />
    </div>
  );
}

NoteDetail.defaultProps = {
  id: "default-id",
  title: "Default Title",
  createdAt: "2021-01-01T00:00:00.000Z",
  body: "Isi catatan",
};

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteDetail;
