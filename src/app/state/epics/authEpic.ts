import { ofType } from "redux-observable";
import { Observable, catchError, switchMap, from, map } from "rxjs";
import {
  AuthActionTypes,
  onAuthFailure,
  onAuthSuccess,
} from "../actions/authActions";
import { AccessToken } from "@spotify/web-api-ts-sdk";
import { authWithSpotify } from "@/app/services/SpotifyAuth";
import { authRequest } from "types";
import { Action } from "@reduxjs/toolkit";
import ActionType from "../../constants/actionType";
import IAction from "@/app/constants/action";

export const authEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(AuthActionTypes.AUTH_INIT),
    switchMap((action: ActionType<AuthActionTypes.AUTH_INIT, authRequest>) => {
      const accessToken$: Observable<void> = from(
        authWithSpotify(action.payload),
      );

      return accessToken$.pipe(map(onAuthSuccess));
    }),
  );
