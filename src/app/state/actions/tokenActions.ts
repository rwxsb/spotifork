import { AccessToken } from "@spotify/web-api-ts-sdk";
import { of } from "rxjs";

export enum TokenActionTypes {
  SET_TOKEN_INIT = "SET_TOKEN_INIT",
  SET_TOKEN_SUCEEDED = "SET_TOKEN_SUCEEDED",
  SET_TOKEN_FAILED = "SET_TOKEN_FAILED",
}

export const onSetTokenSuccess = (result: AccessToken) => ({
  type: TokenActionTypes.SET_TOKEN_SUCEEDED,
  payload: result,
});

export const onSetTokenFailure = (error: any) => {
  of({
    type: TokenActionTypes.SET_TOKEN_FAILED,
    payload: error,
    error: true,
  });
};

export const setToken = (payload: string) => ({
  type: TokenActionTypes.SET_TOKEN_INIT,
  payload: payload,
});
