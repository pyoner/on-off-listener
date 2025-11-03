/// <reference path="types/generated/lib.dom.ts" />
export * from "./index";

export type DelegatedEvent<E extends Event> = E & { delegatedTarget: Element };

export function delegate(selector: string) {
  return function <
    T extends <E extends Event>(
      this: HTMLElement,
      event: DelegatedEvent<E>,
    ) => void,
  >(fn: T) {
    return function <E extends Event>(this: HTMLElement, event: E) {
      const target = event.target as HTMLElement;
      const delegatedTarget = target.closest(selector);
      if (delegatedTarget) {
        fn.call(this, { ...event, delegatedTarget });
      }
    };
  };
}
