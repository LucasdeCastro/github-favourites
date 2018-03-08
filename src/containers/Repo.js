import React from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRepo } from "../actions/repoActions";
import { selectLang } from "../actions/langActions";

import ListView from "../components/ListView";
import { GITHUB_API_KEY } from "../utils/constants";
import Card from "../components/Repo/Card";

class Repo extends React.Component {
  componentDidMount() {
    this.height = this.el.clientHeight;
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
    if (prevProps.match.params.id !== id) this.props.fetchRepo(id, 1);
  }

  nextPage = () => {
    this.props.fetchRepo(this.props.match.params.id, this.props.repo.page);
  };

  renderItem = ({ key, ...e }) => <Card key={key} {...e} />;

  render() {
    const { match, repo: { total, loading, data = [] } } = this.props;
    const list = List(data);

    return (
      <div className="full-flex" ref={el => (this.el = el)}>
        {this.height && (
          <ListView
            list={list}
            rowHeight={130}
            height={this.height}
            isNextPageLoading={loading}
            loadNextPage={this.nextPage}
            renderItem={this.renderItem}
            hasNextPage={list.size !== total}
          />
        )}
      </div>
    );
  }
}

const mapProps = ({ lang, repo }) => ({ lang, repo });
const connected = connect(mapProps, { selectLang, fetchRepo })(Repo);
export default withRouter(connected);
