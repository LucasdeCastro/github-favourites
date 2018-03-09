import React from "react";
import { connect } from "react-redux";
import Button from "../components/Button";
import { addLang } from "../actions/langActions";

import "../styles/lang.css";

class LangContainer extends React.Component {
  state = { show: false };
  setInput = e => {
    this.input = e;
  };

  showInput = _ => this.setState({ show: !this.state.show });

  addLang = () => {
    const value = this.input.value.trim();
    const { data } = this.props.lang;

    if (data.find(e => e === value)) console.log("Essa linguagem já foi salva");
    else if (value !== "") {
      this.props.addLang(this.input.value);
      this.input.value = "";
      this.setState({ show: false });
    }
  };

  onEnter = e => e.key === "Enter" && this.addLang();

  render() {
    const { show } = this.state;

    return (
      <div className="lang-add">
        {show && (
          <div>
            <input
              ref={this.setInput}
              onKeyPress={this.onEnter}
              className={"lang-input"}
              placeholder={"Digite a linguagem"}
            />
            <Button.Icon
              text={""}
              iconName="FaCheck"
              className="add-button-icon"
              onClick={this.addLang}
            />
            <Button.Icon
              text={""}
              iconName="FaClose"
              className="add-button-icon"
              onClick={this.showInput}
            />
          </div>
        )}

        {!show && (
          <Button.Icon
            text={"add"}
            iconName="FaPlus"
            className="add-button"
            onClick={this.showInput}
          />
        )}
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

export default connect(mapProps, { addLang })(LangContainer);
