import React from "react";
import { connect } from "react-redux";
import { addLang } from "../actions/langActions";
import Button from "../components/Button";

class LangContainer extends React.Component {
  setInput = e => {
    this.input = e;
  };

  addLang = () => {
    this.props.addLang(this.input.value);
    this.input.value = "";
  };

  render() {
    const { lang: { data, selected } } = this.props;
    return (
      <div>
        <input ref={this.setInput} />
        <Button.Icon iconName={"FaPlus"} onClick={this.addLang} />
      </div>
    );
  }
}

const mapProps = ({ lang }) => ({ lang });

export default connect(mapProps, { addLang })(LangContainer);
