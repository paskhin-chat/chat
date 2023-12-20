interface Listener<Event> {
  (event: Event): void;
}

export class EventBus<Event = void> {
  private _listeners: Listener<Event>[] = [];

  on(listener: Listener<Event>): () => void {
    this._listeners.push(listener);

    return () => {
      const index = this._listeners.indexOf(listener);

      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
  }

  emit(event: Event): void {
    this._listeners.forEach((listener) => listener(event));
  }
}
