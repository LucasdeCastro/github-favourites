import React from "react";
import renderer from "react-test-renderer";
import Button from "../components/Button/ButtonIcon";

describe("[ButtonIcon]", () => {
  test("try render component", () => {
    const component = renderer.create(
      <Button iconName="FaClose" text={"close"} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("try render component without iconName", () => {
    const component = renderer.create(<Button text={"close"} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("try render component without text", () => {
    const component = renderer.create(<Button iconName={"FaClose"} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
