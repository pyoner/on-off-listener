import { eventMap } from "./event-maps/property-key";

export function on<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
>(
  target: T,
  type: K,
  listener: (this: T, ev: T[typeof eventMap][K]) => void,
  options?: boolean | AddEventListenerOptions,
): () => void;
export function on<T extends EventTarget>(
  target: T,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): () => void {
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
on(document, "DOMContentLoaded", (e) => {
  e;
});
on(new Worker(""), "error", (e) => {
  e;
});

on(new AbortSignal(), "abort", (e) => {
  e;
});
