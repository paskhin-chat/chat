export interface IStore<State> {
  readonly state: State;

  reset: () => void;

  subscribe: (callback: (state: State) => void) => () => void;
}
