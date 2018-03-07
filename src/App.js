import store from "./Store";
import { Provider } from "react-redux";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Lang from "./containers/Lang";
import Tabs from "./containers/Tabs";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Lang />
            <Tabs />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
