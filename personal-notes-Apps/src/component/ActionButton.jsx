import React from "react";
import PropTypes from "prop-types";

function ActionButton({ id, onArchived, archived, onUnArchived }) {
  const onClick = (id) => {
    if (archived) {
      return onUnArchived(id);
    }
    onArchived(id);
  };
  return (
    <button className="note-item__actionButton" onClick={() => onClick(id)}>
      {archived ? "Undo" : "Archived"}
    </button>
  );
}

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchived: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
  onUnArchived: PropTypes.func.isRequired,
};

export default ActionButton;
