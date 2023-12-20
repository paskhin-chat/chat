type Listener<Event> = (event: Event) => void;

export class EventBus<Event = void> {
  private readonly _listeners: Array<Listener<Event>> = [];

  public on(listener: Listener<Event>): () => void {
    this._listeners.push(listener);

    return () => {
      const index = this._listeners.indexOf(listener);

      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
  }

  public emit(event: Event): void {
    for (const listener of this._listeners) {
      listener(event);
    }
  }
}
