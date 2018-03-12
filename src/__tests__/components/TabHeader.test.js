import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import TabHeader, { TabItem } from "../../components/Tabs/TabHeader";

describe("[TabItem]", () => {
  test("try render component", () => {
    const context = {};
    const component = renderer.create(
      <StaticRouter context={context}>
        <TabItem title="favourite" selected={false} />
      </StaticRouter>
    );

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

describe("[TabItem - Selected]", () => {
  test("try render component", () => {
    const context = {};
    const component = renderer.create(
      <StaticRouter context={context}>
        <TabItem title="favourite" selected={true} />
      </StaticRouter>
    );

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

describe("[TabHeader]", () => {
  test("try render component", () => {
    const data = ["Java", "Python"];

    const state = { selected: "Java" };

    const context = {};
    const component = renderer.create(
      <StaticRouter context={context}>
        <TabHeader data={data} selected={state.selected} />
      </StaticRouter>
    );
  });
});
