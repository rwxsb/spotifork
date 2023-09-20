import { AccessToken } from "@spotify/web-api-ts-sdk";
import { IAuthState } from "../state/reducers/authReducer";
import IAction from "./action";

export interface IAppState {
  auth: IAuthState;
}

export type IAuthAction = IAction<AccessToken>;
