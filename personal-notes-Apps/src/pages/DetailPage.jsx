import React from "react";
import NoteDetail from "../component/NoteDetail";
// import { getNote } from "../utils/local-data";
import { getNote } from "../utils/network-data";
import { Navigate, useParams } from "react-router-dom";
import PropTypes, { bool } from "prop-types";

function DetailPageWrapper() {
  const { id } = useParams();

  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: [],
    };
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);

    this.setState(() => {
      return {
        note: data,
      };
    });
  }

  render() {
    if (this.state.note === undefined) {
      return <Navigate to="*" replace={true} />;
    }

    if (this.state.note === null) {
      return <p>tidak ada catatan!</p>;
    }

    return (
      <section>
        <NoteDetail {...this.state.note} />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.any,
};

export default DetailPageWrapper;
