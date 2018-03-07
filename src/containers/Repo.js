import React from "react";
import { connect } from "react-redux";
import { selectLang } from "../actions/langActions";
import { withRouter } from "react-router-dom";

class Repo extends React.Component {
  componentDidMount() {
    const { lang: { selected }, match: { params: { id } } } = this.props;

    console.log(selected, this.props.match);
    if (selected !== id) this.props.selectLang(id);
  }

  render() {
    const { match } = this.props;
    return <div>Lang: {match.params.id}</div>;
  }
}

const mapProps = ({ lang }) => ({ lang });
const connected = connect(mapProps, { selectLang })(Repo);
export default withRouter(connected);
