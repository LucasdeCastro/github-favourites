import React from "react";
import renderer from "react-test-renderer";
import ListView from "../components/ListView";
import { List } from "immutable";

describe("[ListView]", () => {
  test("try render component", () => {
    const renderItem = ({ item, key }) => {
      <div key={key}>{item.name}</div>;
    };
    const list = List([
      { name: "React" },
      { name: "Python" },
      { name: "Go" },
      { name: "Lua" }
    ]);

    const component = renderer.create(
      <ListView
        list={list}
        height={130}
        rowHeight={130}
        hasNextPage={false}
        loadNextPage={e => e}
        renderItem={renderItem}
        isNextPageLoading={false}
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
