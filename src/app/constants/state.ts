import { AccessToken } from "@spotify/web-api-ts-sdk";
import { IAuthState } from "../state/reducers/authReducer";
import IAction from "./action";
import { ITokenState } from "../state/reducers/tokenReducer";
import { IRedirectState } from "../state/reducers/redirectReducer";

export interface IAppState {
  auth: IAuthState;
  token: ITokenState;
  redirect: IRedirectState;
}

export type IAuthAction = IAction<void>;

export type ITokenAction = IAction<AccessToken>;

export type IRedirectAction = IAction<string>;
