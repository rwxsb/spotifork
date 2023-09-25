import { AccessToken } from "@spotify/web-api-ts-sdk";
import { of } from "rxjs";
import { authRequest } from "types";

export enum AuthActionTypes {
  AUTH_INIT = "AUTH_INIT",
  AUTH_SUCCEEDED = "AUTH_SUCEEDED",
  AUTH_FAILED = "AUTH_FAILED",
}

export const onAuthSuccess = () => ({
  type: AuthActionTypes.AUTH_SUCCEEDED,
});

export const onAuthFailure = (error: any) => {
  of({
    type: AuthActionTypes.AUTH_FAILED,
    payload: error,
    error: true,
  });
};

export const authUser = (payload: authRequest) => ({
  type: AuthActionTypes.AUTH_INIT,
  payload: payload,
});
