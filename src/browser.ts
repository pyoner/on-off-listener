/// <reference path="types/generated/lib.dom.ts" />

import { on } from "./index";

export * from "./index";

export type Listener<T extends EventTarget, E extends Event> = (
  this: T,
  e: E,
) => void;

export type DelegatedEvent<T extends Element, E extends Event> = E & {
  readonly delegatedTarget: T;
};

export type DelegatedListener<
  T extends EventTarget,
  D extends Element,
  E extends Event,
> = Listener<T, DelegatedEvent<D, E>>;

export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof HTMLElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<T, HTMLElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof SVGElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<T, SVGElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof MathMLElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<T, MathMLElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: DelegatedListener<T, D, E>): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: DelegatedListener<T, D, E>): Listener<T, E> {
  return function (event) {
    const target = event.target as HTMLElement;
    const delegatedTarget = target.closest<D>(selector);

    if (delegatedTarget) {
      listener.call(
        this,
        Object.create(event, {
          delegatedTarget: {
            value: delegatedTarget,
            writable: false,
          },
        }),
      );
    }
  };
}

const handler = delegate<HTMLBodyElement, MouseEvent>("a", function (e) {
  this;
  e.target;
  e.currentTarget;
  e.delegatedTarget;
  e.button;
});

declare function d<E extends Event, K extends keyof HTMLElementTagNameMap>(
  s: K,
  l: (e: E) => void,
): (e: E) => void;
document.addEventListener(
  "click",
  d("abbr", (e) => {
    e.target;
    e.button;
  }),
);

document.addEventListener(
  "click",
  delegate("a", function (e) {
    this;
    e.button;
    e.target;
    e.delegatedTarget;
  }),
);

on(document, "click", function (e) {
  this;
  e.button;
  e.target;
  e.delegatedTarget;
});

on(
  document,
  "click",
  delegate("a", function (e) {
    this;
    e.button;
    e.target;
    e.delegatedTarget;
  }),
);

on(
  document,
  { type: "click" },
  delegate("a", function (e) {
    this;
    e.button;
    e.target;
    e.delegatedTarget;
  }),
);
