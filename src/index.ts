import { eventMap } from "./property-key";

export type TypeOptions<T extends string> = AddEventListenerOptions & {
  type: T;
};

export function on<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
>(
  target: T,
  typeOptions: K | TypeOptions<K>,
  listener: (this: T, ev: T[typeof eventMap][K]) => void,
): () => void;
export function on<T extends EventTarget>(
  target: T,
  typeOptions: string | TypeOptions<string>,
  listener: EventListenerOrEventListenerObject,
): () => void;
export function on<T extends EventTarget>(
  target: T,
  typeOptions: string | TypeOptions<string>,
  listener: EventListenerOrEventListenerObject,
) {
  const { type, ...options } =
    typeof typeOptions === "string" ? { type: typeOptions } : typeOptions;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
