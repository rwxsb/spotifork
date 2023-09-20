import { AccessToken, emptyAccessToken } from "@spotify/web-api-ts-sdk";
import { AuthActionTypes } from "../actions/authActions";
import { IAuthAction } from "@/app/constants/state";

export interface IAuthState {
  token: AccessToken;
  isLoading: boolean;
  error: any;
}

const initialState: IAuthState = {
  token: emptyAccessToken,
  isLoading: false,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: IAuthAction,
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_INIT:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionTypes.AUTH_SUCCEEDED:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case AuthActionTypes.AUTH_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
