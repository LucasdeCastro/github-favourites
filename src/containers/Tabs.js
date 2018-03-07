import React from "react";
import { connect } from "react-redux";
import { Route, Link, withRouter } from "react-router-dom";
import { addLang, selectLang } from "../actions/langActions";

import "../styles/tabs.css";
import Repo from "./Repo";
import Button from "../components/Button";
import TabHeader from "../components/Tabs/TabHeader";

class LangContainer extends React.Component {
  setInput = e => {
    this.input = e;
  };

  addLang = () => {
    if (this.input.value.trim() !== "") {
      this.props.addLang(this.input.value);
      this.input.value = "";
    }
  };

  selectLang = title => this.props.selectLang(title);

  render() {
    const { lang: { data, selected } } = this.props;
    return (
      <div className="tab-container">
        <TabHeader data={data} selected={selected} onClick={this.selectLang} />
        <Route forceRefresh={true} component={Repo} path="/repo/:id" />
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

const connected = connect(mapProps, { addLang, selectLang })(LangContainer);
export default withRouter(connected);
