import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRepo } from "../actions/repoActions";
import { selectLang } from "../actions/langActions";

class Repo extends React.Component {
  componentDidMount() {
    const {
      repo: { page },
      lang: { selected },
      match: { params: { id } }
    } = this.props;

    if (selected !== id) this.props.selectLang(id);
    this.props.fetchRepo(id, page);
  }

  componentDidUpdate(prevProps) {
    const { repo: { page }, match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) this.props.fetchRepo(id, page);
  }

  render() {
    const { match, repo: { total, loading } } = this.props;
    return (
      <div>
        Lang: {match.params.id}, total: {total}, loading:{" "}
        {loading ? "true" : "false"}
      </div>
    );
  }
}

const mapProps = ({ lang, repo }) => ({ lang, repo });
const connected = connect(mapProps, { selectLang, fetchRepo })(Repo);
export default withRouter(connected);
