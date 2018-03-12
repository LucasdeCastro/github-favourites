import { REMOVE_FAVOURITE, ADD_FAVOURITE } from "../../utils/actions";
import { addFavourite, removeFavourite } from "../../actions/favouriteActions";

describe("[favouriteActions]", () => {
  test("addFavourite", () => {
    const item = "Java";
    const dispatch = data => {
      expect(data).toEqual({ type: ADD_FAVOURITE, payload: [item] });
    };

    addFavourite(item)(dispatch);
  });

  test("removeFavourite", () => {
    const item = "Java";
    const dispatch = data => {
      expect(data).toEqual({ type: REMOVE_FAVOURITE, payload: item });
    };

    removeFavourite(item)(dispatch);
  });
});
