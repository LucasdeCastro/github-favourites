import React from "react";
import * as FontAwesome from "react-icons/lib/fa";

export default ({ onClick, text, iconName, ...rest }) => {
  const Icon = FontAwesome[iconName];
  if (!Icon) return null;

  return (
    <button onClick={onClick} {...rest}>
      <Icon /> {text || ""}
    </button>
  );
};
