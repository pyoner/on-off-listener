/// <reference path="types/generated/lib.dom.ts" />

export * from "./index";

export type Listener<T extends EventTarget, E extends Event> = (
  this: T,
  event: E,
) => void;

export type FilterListener<
  T extends EventTarget,
  E extends Event,
  F = undefined,
> = (this: T, event: E, value: F) => void;

export function closest<
  T extends EventTarget,
  E extends Event,
  K extends keyof HTMLElementTagNameMap,
>(
  selector: K,
  listener: FilterListener<T, E, HTMLElementTagNameMap[K]>,
): Listener<T, E>;
export function closest<
  T extends EventTarget,
  E extends Event,
  K extends keyof SVGElementTagNameMap,
>(
  selector: K,
  listener: FilterListener<T, E, SVGElementTagNameMap[K]>,
): Listener<T, E>;
export function closest<
  T extends EventTarget,
  E extends Event,
  K extends keyof MathMLElementTagNameMap,
>(
  selector: K,
  listener: FilterListener<T, E, MathMLElementTagNameMap[K]>,
): Listener<T, E>;
export function closest<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: FilterListener<T, E, D>): Listener<T, E>;
export function closest<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: FilterListener<T, E, D>): Listener<T, E> {
  return function (event) {
    const target = event.target as HTMLElement;
    const value = target.closest<D>(selector);

    if (value) {
      listener.call(this, event, value);
    }
  };
}
