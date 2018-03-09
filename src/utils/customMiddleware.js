import firebase from "./firebase";

export const LOAD_FROM_FIREBASE = "@LOAD_FROM_FIREBASE";

export default function(actions) {
  function startMiddleware(store) {
    actions.forEach(({ reducer, action }) => {
      caches.match(reducer).then(data => {
        const dbCon = firebase.database().ref(`/${reducer}`);
        dbCon.on("value", snapshot => {
          store.dispatch({
            type: LOAD_FROM_FIREBASE,
            payload: snapshot.val()
          });
        });
      });
    });
  }

  const customMiddleware = store => {
    startMiddleware(store);

    return next => action => {
      next(action);

      const { type } = action;
      const data = actions.find(e => e.action === type);

      if (data) {
        const { reducer } = data;
        const dbCon = firebase.database().ref(`/${reducer}`);
        const state = store.getState();

        if (state[reducer]) {
          const payload = { ...state[reducer] };
          dbCon.set(payload);
        }
      }
    };
  };

  return customMiddleware;
}
