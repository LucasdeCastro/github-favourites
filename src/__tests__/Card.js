import React from "react";
import renderer from "react-test-renderer";
import Card from "../components/Repo/Card";

describe("[CARD]", () => {
  test("try render component", () => {
    const item = {
      name: "React",
      language: "Java",
      html_url: "https://github.com/freeCodeCamp/freeCodeCamp",
      owner: {
        login: "facebook",
        avatar_url: "https://avatars1.githubusercontent.com/u/6407041?v=4"
      },
      description:
        "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      forks_count: 10,
      stargazers_count: 10
    };

    const component = renderer.create(<Card item={item} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onMouseEnter();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
