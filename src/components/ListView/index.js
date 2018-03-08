import React from "react";
import { InfiniteLoader, List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

export default ({
  list,
  renderItem,
  hasNextPage,
  loadNextPage,
  isNextPageLoading,
  ...otherProps
}) => {
  const rowCount = hasNextPage ? list.size + 1 : list.size;

  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

  const isRowLoaded = ({ index }) => !hasNextPage || index < list.size;

  const rowRenderer = ({ index, key, style }) => {
    const item = list.get(index);

    if (!isRowLoaded({ index }) && item)
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );

    return renderItem({ item, index, key, style });
  };

  return (
    <InfiniteLoader
      rowCount={rowCount}
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              {...otherProps}
              width={width}
              rowCount={rowCount}
              ref={registerChild}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};
