import { EventBus } from "./eventBus";

export class Executor {
  public fulfilled = false;
  public rejected = false;

  private _promise: Promise<void> | null = null;
  private _eventBus: EventBus = new EventBus();
  private _abortController: AbortController | null = null;

  get settled() {
    return this.fulfilled || this.rejected;
  }

  get pending() {
    return this._promise !== null;
  }

  execute(cb: (signal: AbortSignal) => Promise<void>): Promise<void> {
    this._abortController?.abort();

    const abortController = new AbortController();
    this._abortController = abortController;

    const promise = cb(abortController.signal).then(
      () => {
        if (this._abortController === abortController) {
          this._abortController = this._promise = null;
          this.fulfilled = true;
          this.rejected = false;
          this._eventBus.emit();
        }
      },
      () => {
        if (this._abortController === abortController) {
          this._abortController = this._promise = null;
          this.fulfilled = false;
          this.rejected = true;
          this._eventBus.emit();
        }
      }
    );

    if (this._abortController === abortController) {
      this._promise = promise;
      this._eventBus.emit();
    }

    return promise;
  }

  abort(): this {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = this._promise = null;
      this._eventBus.emit();
    }
    return this;
  }

  subscribe(listener: () => void): () => void {
    return this._eventBus.on(listener);
  }
}
