import { AccessToken, emptyAccessToken } from "@spotify/web-api-ts-sdk";
import { TokenActionTypes } from "../actions/tokenActions";
import { ITokenAction } from "@/app/constants/state";

export interface ITokenState {
  token: AccessToken;
  isLoading: boolean;
  error: any;
}

const initialState: ITokenState = {
  token: emptyAccessToken,
  isLoading: false,
  error: null,
};

export const tokenReducer = (
  state = initialState,
  action: ITokenAction,
): ITokenState => {
  switch (action.type) {
    case TokenActionTypes.SET_TOKEN_INIT:
      return {
        ...state,
        isLoading: true,
      };

    case TokenActionTypes.SET_TOKEN_SUCEEDED:
      console.log("reducer" + JSON.stringify(action.payload));

      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case TokenActionTypes.SET_TOKEN_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
