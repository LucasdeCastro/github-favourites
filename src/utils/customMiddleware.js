import firebase from "./firebase";
import { CACHE_NAME } from "./constants";

export const LOAD_FROM_FIREBASE = "@LOAD_FROM_FIREBASE";
export const LOAD_FROM_LOCALSTORE = "@LOAD_FROM_LOCALSTORE";

export default function(actions) {
  function startMiddleware(store) {
    const results = actions.map(({ reducer, local = false }) => {
      if (local) {
        const localData = JSON.parse(
          localStorage.getItem(`${CACHE_NAME}@${reducer}`)
        );

        store.dispatch({
          type: LOAD_FROM_LOCALSTORE,
          payload: { [reducer]: localData }
        });
      } else {
        const dbCon = firebase.database().ref(`/${reducer}`);

        return new Promise(function(res, rej) {
          dbCon.once("value", snapshot => {
            res({ reducer, value: snapshot.val() });
          });
        });
      }

      return null;
    });

    Promise.all(results).then(list => {
      const data = {};
      list.forEach(response => {
        if (response) {
          const { reducer, value } = response;
          if (reducer && value) data[reducer] = value;
        }
      });

      store.dispatch({
        type: LOAD_FROM_FIREBASE,
        payload: data
      });
    });
  }

  const customMiddleware = store => {
    startMiddleware(store);

    return next => action => {
      const nextResult = next(action);

      const { type } = action;
      const data = actions.find(e => {
        return e.actions.indexOf(type) >= 0;
      });

      if (data) {
        const { reducer, local = false } = data;
        const state = store.getState();

        if (local) {
          localStorage.setItem(
            `${CACHE_NAME}@${reducer}`,
            JSON.stringify({ ...state[reducer] })
          );
        } else {
          const dbCon = firebase.database().ref(`/${reducer}`);

          if (state[reducer]) {
            const payload = { ...state[reducer] };
            dbCon.set(payload);
          }
        }
      }

      return nextResult;
    };
  };

  return customMiddleware;
}
