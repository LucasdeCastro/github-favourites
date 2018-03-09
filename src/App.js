import store from "./Store";
import { Provider } from "react-redux";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Tabs from "./containers/Tabs";
import "./styles/main.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="full-flex">
            <Tabs />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
