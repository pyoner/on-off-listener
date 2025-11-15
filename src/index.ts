import { eventMap } from "./property-key";

export type TypeOptions<T extends string> = AddEventListenerOptions & {
  type: T;
};

export type Off = () => void;

export type Listener<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
> = (this: T, ev: T[typeof eventMap][K]) => void;

export function on<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
>(target: T, typeOptions: K | TypeOptions<K>, listener: Listener<T, K>): Off;
export function on<T extends EventTarget>(
  target: T,
  typeOptions: string | TypeOptions<string>,
  listener: EventListenerOrEventListenerObject,
): Off;
export function on<T extends EventTarget>(
  target: T,
  typeOptions: string | TypeOptions<string>,
  listener: EventListenerOrEventListenerObject,
): Off {
  const { type, ...options } =
    typeof typeOptions === "string" ? { type: typeOptions } : typeOptions;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
