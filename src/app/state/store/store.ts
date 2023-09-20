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

export const createStore = () => {
  const rootReducer = combineReducers<IAppState>({
    auth: authReducer,
  });

  const rootEpic = combineEpics<Action, Action, IAppState>(authEpic);

  const epicMiddleware = createEpicMiddleware<Action, Action, IAppState>();

  //TODO: maybe use configure store in future
  const store = createReduxStore(
    rootReducer,
    compose(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
};
