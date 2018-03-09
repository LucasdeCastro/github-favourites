import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { addLang, selectLang, removeLang } from "../actions/langActions";

import "../styles/tabs.css";
import Repo from "./Repo";
import Lang from "./Lang";
import TabHeader from "../components/Tabs/TabHeader";

class LangContainer extends React.Component {
  setInput = e => {
    this.input = e;
  };

  selectLang = title => this.props.selectLang(title);

  componentDidUpdate() {
    this.redirectToRepo();
  }

  componentDidMount() {
    this.redirectToRepo();
  }

  redirectToRepo = () => {
    const {
      lang: { selected },
      history: { location: { pathname } }
    } = this.props;

    if (selected && selected.length > 0 && pathname === "/")
      this.props.history.push(`/repo/${selected}`);
  };

  removeLang = lang => this.props.removeLang(lang);

  render() {
    const { lang: { data, selected } } = this.props;
    return (
      <div className="tab-container">
        <div className="tab-header">
          <TabHeader
            data={data}
            selected={selected}
            onClick={this.selectLang}
            langRemove={this.removeLang}
          />

          <Lang />
        </div>

        <Route path="/repo/:id" component={Repo} forceRefresh={true} />
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

const connected = connect(mapProps, { addLang, selectLang, removeLang })(
  LangContainer
);
export default withRouter(connected);
