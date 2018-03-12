import store from "./Store";
import { Provider } from "react-redux";
import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";

import Tabs from "./containers/Tabs";
import Error from "./containers/Error";
import "./styles/main.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="full-flex">
            <Error />
            <Tabs />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
