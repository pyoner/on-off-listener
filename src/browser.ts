/// <reference path="types/generated/lib.dom.ts" />
export * from "./index";

export type DelegatedEvent<E extends Event, T> = E & {
  delegatedTarget: T;
};

export type DelegatedListener<D extends Element> = <
  T extends Element,
  E extends Event,
>(
  this: T,
  e: DelegatedEvent<E, D>,
) => void;

export type DelegatedWrapper<D extends Element> = (
  fn: DelegatedListener<D>,
) => <T extends Element, E extends Event>(this: T, e: E) => void;

export function delegate<K extends keyof HTMLElementTagNameMap>(
  selector: K,
): DelegatedWrapper<HTMLElementTagNameMap[K]>;
export function delegate<K extends keyof SVGElementTagNameMap>(
  selector: K,
): DelegatedWrapper<SVGElementTagNameMap[K]>;
export function delegate<K extends keyof MathMLElementTagNameMap>(
  selector: K,
): DelegatedWrapper<MathMLElementTagNameMap[K]>;
export function delegate<E extends Element = Element>(
  selector: string,
): DelegatedWrapper<E>;
export function delegate<E extends Element = Element>(
  selector: string,
): DelegatedWrapper<E> {
  return function (fn) {
    return function (event) {
      const target = event.target as HTMLElement;
      const delegatedTarget = target.closest<E>(selector);

      if (delegatedTarget) {
        fn.call(this, { ...event, delegatedTarget });
      }
    };
  };
}
