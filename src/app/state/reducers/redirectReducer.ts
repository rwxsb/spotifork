import { IRedirectAction } from "@/app/constants/state";
import { RedirectActionTypes } from "../actions/redirectActions";

export interface IRedirectState {
  redirectUrl: string;
}

const initialState: IRedirectState = {
  redirectUrl: null,
};

export const redirectReducer = (
  state = initialState,
  action: IRedirectAction,
): IRedirectState => {
  switch (action.type) {
    case RedirectActionTypes.REDIRECT:
      return {
        ...state,
        redirectUrl: action.payload,
      };
    default:
      return state;
  }
};
