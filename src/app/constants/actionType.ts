export default interface ActionType<K extends string, P = {}> {
  type: K;
  payload?: P;
}
