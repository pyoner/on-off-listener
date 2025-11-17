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
  L extends Listener<T, K>,
>(target: T, typeOptions: K | TypeOptions<K>, listener: L): Off;
export function on<
  T extends EventTarget,
  K extends string | TypeOptions<string>,
  L extends EventListenerOrEventListenerObject,
>(target: T, typeOptions: K, listener: L): Off;
export function on<
  T extends EventTarget,
  K extends string | TypeOptions<string>,
  L extends EventListenerOrEventListenerObject,
>(target: T, typeOptions: K, listener: L): Off {
  let type: string;
  let options: AddEventListenerOptions;

  if (typeof typeOptions === "string") {
    type = typeOptions;
    options = {};
  } else {
    ({ type, ...options } = typeOptions);
  }

  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
