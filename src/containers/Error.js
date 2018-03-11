import React from "react";
import { connect } from "react-redux";
import Button from "../components/Button";
import { withRouter } from "react-router-dom";
import { clearError } from "../actions/errorActions";
import "../styles/error.css";

class ErroContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (!prevProps.error.error && this.props.error.error)
      this.timer = setTimeout(this.props.clearError, 8000);
  }

  clearError = _ => {
    clearTimeout(this.timer);
    this.props.clearError();
  };

  render() {
    const { errorMessage, error } = this.props.error;
    if (!error) return null;

    return (
      <div className="alert-error">
        <div className="error-message">{errorMessage}</div>
        <div className="close-error">
          <Button.Icon onClick={this.clearError} iconName="FaClose" />
        </div>
      </div>
    );
  }
}

const mapProps = ({ error }) => ({ error });

const connected = connect(mapProps, { clearError })(ErroContainer);

export default withRouter(connected);
