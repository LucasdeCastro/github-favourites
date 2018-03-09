import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { addLang, selectLang } from "../actions/langActions";

import "../styles/tabs.css";
import Repo from "./Repo";
import Lang from "./Lang";
import TabHeader from "../components/Tabs/TabHeader";

class LangContainer extends React.Component {
  setInput = e => {
    this.input = e;
  };

  selectLang = title => this.props.selectLang(title);

  render() {
    const { lang: { data, selected } } = this.props;
    return (
      <div className="tab-container">
        <div className="tab-header">
          <TabHeader
            data={data}
            selected={selected}
            onClick={this.selectLang}
          />

          <Lang />
        </div>

        <Route path="/repo/:id" component={Repo} forceRefresh={true} />
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

const connected = connect(mapProps, { addLang, selectLang })(LangContainer);
export default withRouter(connected);
