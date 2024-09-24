type EventListener<T> = (data: T) => T | void;

class EventEmitter<TEvents extends Record<string, any>> {
  private listeners: { [K in keyof TEvents]?: EventListener<TEvents[K]>[] } = {};

  on<K extends keyof TEvents>(event: K, listener: EventListener<TEvents[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof TEvents>(event: K, listener: EventListener<TEvents[K]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(l => l !== listener);
  }

  emit<K extends keyof TEvents>(event: K, data?: TEvents[K]): TEvents[K] {
    if (!this.listeners[event]) return data as TEvents[K];

    let result: TEvents[K] = data as TEvents[K];

    for (const listener of this.listeners[event]!) {
      const res = listener(result);
      if (res !== undefined) {
        result = res;
      }
    }

    return result;
  }
}

// export default EventEmitter;
export type Events = {
	greet: { name: string; message: string };
	farewell: { name: string };
	// Event with no data
	simpleEvent: undefined;
  };
  

  const emitter = new EventEmitter<Events>();


  export default emitter;