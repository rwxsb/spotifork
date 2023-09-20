import { AuthActionTypes } from "../state/actions/authActions";
import { Action } from "redux";

type ActionTypes = AuthActionTypes;

interface IAction<Payload = {}> extends Action<ActionTypes> {
  payload?: Payload;
}

export default IAction;
