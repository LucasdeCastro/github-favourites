import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import "../../styles/tabs.css";
import { FAVOURITE } from "../../utils/constants";

export class TabItem extends React.Component {
  state = { showButton: false };
  showButton = _ => this.setState({ showButton: true });
  hideButton = _ => this.setState({ showButton: false });
  remove = _ => this.props.langRemove(this.props.title);

  render() {
    const { title, onClick, selected } = this.props;
    const isFavourite = FAVOURITE !== title;
    return (
      <li
        onMouseEnter={this.showButton}
        onMouseLeave={this.hideButton}
        className={`tab-item${selected ? " tab-item-seleted" : ""}`}
      >
        <Link onClick={_ => onClick(title)} to={`/repo/${title}`}>
          {title}
        </Link>

        {this.state.showButton && isFavourite ? (
          <Button.Icon
            onClick={this.remove}
            className="tab-item-close"
            iconName="FaClose"
          />
        ) : (
          <div className="tab-item-close" />
        )}
      </li>
    );
  }
}

export default ({ data, selected, onClick, langRemove }) => (
  <ul className="tab-header-container">
    {data.map((title, index) => (
      <TabItem
        key={title}
        title={title}
        index={index}
        onClick={onClick}
        langRemove={langRemove}
        selected={title === selected}
      />
    ))}
  </ul>
);
