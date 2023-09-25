import { Action } from "redux";
import { AuthActionTypes } from "../state/actions/authActions";
import { TokenActionTypes } from "../state/actions/tokenActions";
import { RedirectActionTypes } from "../state/actions/redirectActions";

type ActionTypes = AuthActionTypes | TokenActionTypes | RedirectActionTypes;

interface IAction<Payload = {}> extends Action<ActionTypes> {
  payload?: Payload;
}

export default IAction;
