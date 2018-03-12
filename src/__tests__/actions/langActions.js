import { addLang, selectLang, removeLang } from "../../actions/langActions";
import { SET_LANG, SELECT_LANG, REMOVE_LANG } from "../../utils/actions";

describe("[langActions]", () => {
  test("addLang", () => {
    const lang = "Java";
    const dispatch = data => {
      expect(data).toEqual({ type: SET_LANG, payload: [lang.toLowerCase()] });
    };

    addLang(lang)(dispatch);
  });

  test("selectLang", () => {
    const lang = "java";
    const dispatch = data => {
      expect(data).toEqual({ type: SELECT_LANG, payload: lang });
    };

    selectLang(lang)(dispatch);
  });

  test("removeLang", () => {
    const lang = "java";
    const dispatch = data => {
      expect(data).toEqual({ type: REMOVE_LANG, payload: lang });
    };

    removeLang(lang)(dispatch);
  });

  test("try add lang with invalid characters", () => {
    const lang = "+@#=$-!%()";
    const dispatch = data => {
      expect(data).toEqual({ type: SET_LANG, payload: [""] });
    };

    addLang(lang)(dispatch);
  });
});
