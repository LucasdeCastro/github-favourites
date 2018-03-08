import React from "react";
import { Link } from "react-router-dom";
import "../../styles/tabs.css";
import Button from "../Button";

export const TabItem = ({ title, onClick, index, selected }) => (
  <li className={`tab-item${selected ? " tab-item-seleted" : ""}`}>
    <Link onClick={_ => onClick(title)} to={`/repo/${title}`}>
      {title}
    </Link>
  </li>
);

export default ({ data, selected, onClick }) => (
  <ul className="tab-header-container">
    {data.map((title, index) => (
      <TabItem
        key={title}
        title={title}
        index={index}
        onClick={onClick}
        selected={title == selected}
      />
    ))}
  </ul>
);
