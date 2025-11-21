# on-off-listener

A tiny helper that adds event listeners with full TypeScript safety and hands you a cleanup function so you never forget to unsubscribe.

## Why people reach for it

- **Intellisense everywhere** – Event names autocomplete per target, and handler arguments are strongly typed.
- **One-line cleanup** – The function you get back removes the listener with the exact same options.
- **No dependencies** – Ships as plain TypeScript. Works in any modern build step.
- **DOM-friendly extras** – Includes a `closest` helper for event delegation in the browser.

## Installation

```bash
npm install on-off-listener
pnpm add on-off-listener
bun add on-off-listener
```

## Quick start

```ts
import { on } from "on-off-listener";

const button = document.querySelector("button")!;
const off = on(button, "click", (event) => {
  console.log("Button clicked at X:", event.clientX); // `event` is a MouseEvent
});

off(); // Removes the listener
```

Need to pass `AddEventListenerOptions` (like `capture` or `once`)? Provide a small object with a `type` property:

```ts
on(window, { type: "resize", passive: true }, () => {
  console.log("Resized!");
});
```

Custom events still work—just type the handler yourself and enjoy the shared cleanup story.

## Browser `closest` helper

If you prefer event delegation, wrap your listener with `closest` so you only attach one handler:

```ts
import { on, closest } from "on-off-listener";

const off = on(
  document.body,
  "click",
  closest("button", (event, button) => {
    console.log("Clicked button text:", button.textContent);
  }),
);
```

The filtered listener receives the original event plus the closest matching element, passed as the second argument.

## API highlights

- `on(target, typeOrOptions, listener)`
  - `target`: Any `EventTarget`
  - `typeOrOptions`: Either the event name (`"click"`) or `{ type, ...addEventListener options }`
  - `listener`: Function or `EventListenerObject`
  - **Returns**: `() => void` to remove the listener

- `closest(selector, listener)`  
  Filters a listener so it only fires when the event target or one of its ancestors matches the selector. Your listener receives the original event and the matched element, with HTML, SVG, and MathML tags typed out of the box.

## How typing works

During development you can run `bun run gen-types:browser` to regenerate the DOM event map shim. The library attaches a hidden `eventMap` symbol to each DOM interface so TypeScript can infer the right event types for every `EventTarget`.

---

That’s it—import `on`, attach listeners with confidence, and tear them down just as easily.
