import React from "react";
import "../../styles/repo.css";
import * as FontAwesome from "react-icons/lib/fa";
import Button from "../Button";

export default class Card extends React.PureComponent {
  state = { showButton: false };
  toggleButton = () => this.setState({ showButton: !this.state.showButton });

  clickButton = _ => {
    const { item, addFavourite, removeFavourite, isFavourite } = this.props;
    if (isFavourite) removeFavourite(item);
    else addFavourite(item);
  };

  render() {
    const { item, style, isFavourite } = this.props;
    if (!item) return null;

    return (
      <div
        style={style}
        className="repo-card-container"
        onMouseEnter={this.toggleButton}
        onMouseLeave={this.toggleButton}
      >
        <div className="repo-card-title">
          <a href={item.html_url} className="repo-card-link">
            <span>{item.owner.login} /</span> {item.name}
          </a>

          {this.state.showButton && (
            <Button.Icon
              onClick={this.clickButton}
              className="repo-card-favorite"
              iconName={isFavourite ? "FaMinus" : "FaHeart"}
            />
          )}
        </div>
        <div className="repo-card-description">
          <p>{item.description}</p>
        </div>

        <div className="repo-card-footer">
          <div className="footer-label">{item.language}</div>
          <div className="footer-label">
            <FontAwesome.FaStar />
            {item.stargazers_count}
          </div>
          <div className="footer-label">
            <FontAwesome.FaCodeFork />
            {item.forks_count}
          </div>
          <div className="footer-label">
            <img
              src={item.owner.avatar_url}
              width={20}
              height={20}
              alt="Owner"
            />
            {item.owner.login}
          </div>
        </div>
      </div>
    );
  }
}
