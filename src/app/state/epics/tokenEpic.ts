import { ofType } from "redux-observable";
import { Observable, catchError, switchMap, from, map } from "rxjs";
import { AccessToken } from "@spotify/web-api-ts-sdk";
import { Action } from "@reduxjs/toolkit";
import ActionType from "../../constants/actionType";
import { TokenActionTypes, onSetTokenSuccess } from "../actions/tokenActions";
import { exchangeCodeForToken } from "@/app/services/SpotifyAuth";
export const tokenEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(TokenActionTypes.SET_TOKEN_INIT),
    switchMap((action: ActionType<TokenActionTypes.SET_TOKEN_INIT, string>) => {
      const accessToken$: Observable<AccessToken> = from(
        exchangeCodeForToken(action.payload),
      );

      return accessToken$.pipe(map(onSetTokenSuccess));
    }),
  );
