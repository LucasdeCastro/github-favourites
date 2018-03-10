import React from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRepo } from "../actions/repoActions";
import { selectLang } from "../actions/langActions";
import { addFavourite, removeFavourite } from "../actions/favouriteActions";
import ListView from "../components/ListView";
import Card from "../components/Repo/Card";
import { FAVOURITE } from "../utils/constants";

class Repo extends React.Component {
  state = { height: 0 };

  componentDidMount() {
    const {
      history,
      repo: { page },
      lang: { selected, data, loading },
      match: { params: { id } }
    } = this.props;

    const lang = id.toLowerCase();
    const hasOnDataLang = data.indexOf(lang) >= 0;

    if (hasOnDataLang) {
      if (selected !== lang) this.props.selectLang(lang);
      if (lang !== FAVOURITE) this.props.fetchRepo(lang, 1);
    }
  }

  componentDidUpdate({ match: { params: { id: oldUrlID } } }) {
    const {
      history,
      lang: { selected, loading, data },
      match: { params: { id } }
    } = this.props;
    const lang = id.toLowerCase();

    if (!loading) {
      const hasOnDataLang = data.indexOf(lang) >= 0;

      if (!hasOnDataLang) history.replace({ pathname: "/" });
      else if (selected !== lang && hasOnDataLang) this.props.selectLang(lang);
    }

    if (oldUrlID.toLowerCase() !== lang && lang !== FAVOURITE)
      this.props.fetchRepo(lang, 1);
  }

  nextPage = () => {
    const { match: { params: { id } } } = this.props;
    if (id !== FAVOURITE) this.props.fetchRepo(id, this.props.repo.page);
  };

  renderItem = ({ key, item, ...e }) => {
    const { match: { params: { id } }, favourite: { keys } } = this.props;
    if (!item) return null;

    return (
      <Card
        {...e}
        key={key}
        item={item}
        addFavourite={this.props.addFavourite}
        isFavourite={id === FAVOURITE || keys[item.id]}
        removeFavourite={this.props.removeFavourite}
      />
    );
  };

  getRef = el => {
    if (el && el.clientHeight) {
      this.el = el;
      this.setState({ height: el.clientHeight });
    }
  };

  render() {
    const { height } = this.state;

    const {
      match: { params: { id } },
      repo: { total, loading, data = [] },
      favourite: { data: favouriteData }
    } = this.props;

    const list = id === FAVOURITE ? List(favouriteData) : List(data);

    if (id !== FAVOURITE && loading && list.size === 0)
      return <div>Loading...</div>;

    return (
      <div className="full-flex" ref={this.getRef}>
        {height && (
          <ListView
            list={list}
            rowHeight={130}
            height={height}
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

const mapProps = ({ lang, repo, favourite }) => ({ lang, repo, favourite });
const connected = connect(mapProps, {
  selectLang,
  fetchRepo,
  addFavourite,
  removeFavourite
})(Repo);

export default withRouter(connected);
