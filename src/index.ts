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
>(
  target: T,
  typeOptions: K | TypeOptions<K>,
): (listener: Listener<T, K>) => Off;
export function on<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
  L extends Listener<T, K>,
>(target: T, typeOptions: K | TypeOptions<K>, listener: L): Off;
export function on<
  T extends EventTarget,
  K extends string | TypeOptions<string>,
>(
  target: T,
  typeOptions: K,
): (listener: EventListenerOrEventListenerObject) => Off;
export function on<
  T extends EventTarget,
  K extends string | TypeOptions<string>,
  L extends EventListenerOrEventListenerObject,
>(target: T, typeOptions: K, listener: L): Off;
export function on<
  T extends EventTarget,
  K extends string | TypeOptions<string>,
  L extends EventListenerOrEventListenerObject,
>(target: T, typeOptions: K, listener?: L): unknown {
  let type: string;
  let options: AddEventListenerOptions;

  if (typeof typeOptions === "string") {
    type = typeOptions;
    options = {};
  } else {
    ({ type, ...options } = typeOptions);
  }

  if (listener === undefined) {
    return (l: EventListenerOrEventListenerObject) => {
      target.addEventListener(type, l, options);
      return () => target.removeEventListener(type, l, options);
    };
  } else {
    target.addEventListener(type, listener, options);
    return () => target.removeEventListener(type, listener, options);
  }
}
