import { EventBus } from './eventBus';

export class Executor {
  public fulfilled = false;

  public rejected = false;

  private _promise: Promise<void> | null = null;

  private readonly _eventBus: EventBus = new EventBus();

  private _abortController: AbortController | null = null;

  public get settled(): boolean {
    return this.fulfilled || this.rejected;
  }

  public get pending(): boolean {
    return this._promise !== null;
  }

  public execute(cb: (signal: AbortSignal) => Promise<void>): Promise<void> {
    this._abortController?.abort();

    const abortController = new AbortController();

    this._abortController = abortController;

    // eslint-disable-next-line promise/prefer-await-to-then
    const promise = cb(abortController.signal).then(
      () => {
        // eslint-disable-next-line promise/always-return
        if (this._abortController === abortController) {
          this._abortController = null;
          this._promise = null;
          this.fulfilled = true;
          this.rejected = false;
          this._eventBus.emit();
        }
      },
      () => {
        if (this._abortController === abortController) {
          this._abortController = null;
          this._promise = null;
          this.fulfilled = false;
          this.rejected = true;
          this._eventBus.emit();
        }
      },
    );

    if (this._abortController === abortController) {
      this._promise = promise;
      this._eventBus.emit();
    }

    return promise;
  }

  public abort(): this {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
      this._promise = null;
      this._eventBus.emit();
    }

    return this;
  }

  public subscribe(listener: () => void): () => void {
    return this._eventBus.on(listener);
  }
}
