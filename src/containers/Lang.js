import React from "react";
import { connect } from "react-redux";
import Button from "../components/Button";
import { withRouter } from "react-router-dom";
import { addLang } from "../actions/langActions";
import { setError } from "../actions/errorActions";

import "../styles/lang.css";

class LangContainer extends React.Component {
  state = { show: false };
  setInput = e => {
    this.input = e;
  };

  toggleInput = _ => this.setState({ show: !this.state.show });

  addLang = () => {
    const reg = /[^\w\s]/gi;
    const value = this.input.value.trim().toLowerCase();
    const { data, selected } = this.props.lang;

    if (reg.test(value)) {
      this.props.setError("Caracteres inválidos.");
    } else if (data.find(e => e.toLowerCase() === value)) {
      this.props.setError("Essa linguagem já foi adicionada.");
    } else if (value !== "") {
      this.props.addLang(value);
      this.input.value = "";
      this.setState({ show: false });

      if (!selected) this.props.history.push(`/repo/${value}`);
    }
  };

  onEnter = e => {
    if (e.keyCode === 13) this.addLang();
    else if (e.keyCode === 27) this.toggleInput();
  };

  render() {
    const { show } = this.state;
    return (
      <div className="lang-add">
        {show && (
          <div>
            <input
              ref={this.setInput}
              onKeyDown={this.onEnter}
              className={"lang-input"}
              placeholder={"Digite a linguagem"}
            />
            <Button.Icon
              iconName="FaCheck"
              className="add-button-icon"
              onClick={this.addLang}
            />
            <Button.Icon
              iconName="FaClose"
              className="add-button-icon"
              onClick={this.toggleInput}
            />
          </div>
        )}

        {!show && (
          <Button.Icon
            text={"Add"}
            iconName="FaPlus"
            className="add-button"
            onClick={this.toggleInput}
          />
        )}
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

const connected = connect(mapProps, { addLang, setError })(LangContainer);

export default withRouter(connected);
