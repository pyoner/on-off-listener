/// <reference path="types/generated/lib.dom.ts" />

export * from "./index";

export type Listener<T extends EventTarget, E extends Event> = (
  this: T,
  e: E,
) => void;

export type DelegatedEvent<T extends Element, E extends Event> = E & {
  readonly delegatedTarget: T;
};

export type DelegatedListener<T extends Element, E extends Event> = Listener<
  T,
  DelegatedEvent<T, E>
>;

export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof HTMLElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<HTMLElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof SVGElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<SVGElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  K extends keyof MathMLElementTagNameMap,
>(
  selector: K,
  listener: DelegatedListener<MathMLElementTagNameMap[K], E>,
): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: DelegatedListener<D, E>): Listener<T, E>;
export function delegate<
  T extends EventTarget,
  E extends Event,
  D extends Element = Element,
>(selector: string, listener: DelegatedListener<D, E>): Listener<T, E> {
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

const handler = delegate<HTMLBodyElement, MouseEvent>("a", (e) => {
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
  delegate("a", (e) => {
    e.button;
    e.delegatedTarget;
  }),
);
