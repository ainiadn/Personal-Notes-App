import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ActionButton from "./ActionButton";

import PropTypes from "prop-types";

function NoteItem({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchived,
  archived,
  onUnArchived,
}) {
  return (
    <div className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} id={id} />
      <DeleteButton id={id} onDelete={onDelete} />
      <ActionButton
        id={id}
        onArchived={onArchived}
        archived={archived}
        onUnArchived={onUnArchived}
      />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
  onUnArchived: PropTypes.func.isRequired,
};

export default NoteItem;
