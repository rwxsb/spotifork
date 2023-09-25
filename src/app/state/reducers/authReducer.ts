import { AccessToken, emptyAccessToken } from "@spotify/web-api-ts-sdk";
import { AuthActionTypes } from "../actions/authActions";
import { IAuthAction } from "@/app/constants/state";

export interface IAuthState {
  isLoading: boolean;
  error: any;
}

const initialState: IAuthState = {
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
      return {
        ...state,
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
