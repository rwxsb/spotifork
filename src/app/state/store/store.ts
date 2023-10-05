import { IAppState } from "@/app/constants/state";
import {
  combineReducers,
  Action,
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { authEpic } from "../epics/authEpic";
import { tokenReducer } from "../reducers/tokenReducer";
import { tokenEpic } from "../epics/tokenEpic";
import { redirectOnLoginSuccessEpic } from "../epics/redirectEpic";
import { redirectReducer } from "../reducers/redirectReducer";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const createStore = () => {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const rootReducer = combineReducers<IAppState>({
    auth: authReducer,
    token: tokenReducer,
    redirect: redirectReducer,
  });

  const rootEpic = combineEpics<Action, Action, IAppState>(
    authEpic,
    tokenEpic,
    redirectOnLoginSuccessEpic,
  );

  const persistConfig = {
    key: "root",
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const epicMiddleware = createEpicMiddleware<Action, Action, IAppState>();

  const middlewares =
    process.env.NODE_ENV === "production"
      ? [epicMiddleware]
      : [epicMiddleware, createLogger()];

  //TODO: maybe use configure store in future
  const store = createReduxStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  epicMiddleware.run(rootEpic);

  return store;
};
