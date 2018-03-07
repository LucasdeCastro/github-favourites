import React from "react";
import * as FontAwesome from "react-icons/lib/fa";

export default ({ onClick, text, iconName }) => {
  const Icon = FontAwesome[iconName];
  return (
    <button onClick={onClick}>
      <Icon /> {text || ""}
    </button>
  );
};
