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

export const createStore = () => {
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

  const epicMiddleware = createEpicMiddleware<Action, Action, IAppState>();

  //TODO: maybe use configure store in future
  const store = createReduxStore(
    rootReducer,
    compose(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
};
