# on-off-listener

A lightweight TypeScript library for adding and removing event listeners on `EventTarget` objects with automatic type inference for events. Returns a cleanup function for easy management. MIT licensed.

## Features

- **Type-Safe Event Handling**: Event names are constrained to valid keys for the target (with autocomplete), and event types are automatically inferred from the target and event name, preventing compile-time errors.
- **Cleanup Function**: Returns a remover for the listener.
- **DOM Event Support**: Built-in maps for standard DOM events from TypeScript's lib.
- **Zero Dependencies**: No runtime deps.

## Installation

```bash
npm install on-off-listener
bun add on-off-listener
pnpm add on-off-listener
```

## Usage

Import `on` and attach listeners. For event targets, the event name is constrained to valid keys (with autocomplete), and the event type is inferred automatically from the target and event name.

### Type-Safe

```typescript
import { on } from "on-off-listener";

const button = document.getElementById("myButton")! as HTMLButtonElement;
const off = on(button, "click", (event) => {
  console.log("Button clicked:", event.clientX); // `event` infers as MouseEvent
});

off(); // Cleanup
```

For `Window` or custom events:

```typescript
const offResize = on(window, "resize", (event) => {
  console.log("Window resized"); // Infers UIEvent
});

const offCustom = on(
  document.body,
  "custom-event",
  (event: CustomEvent<{ detail: string }>) => {
    // Manual typing for customs
    console.log(event.detail);
  },
);
```

## API

```typescript
on<
  T extends EventTarget,
  K extends Extract<keyof T[typeof eventMap], string>,
>(target: T, type: K, listener: (this: T, ev: T[typeof eventMap][K]) => void, options?: boolean | AddEventListenerOptions): () => void
```

- Attaches a typed listener to `target` for `type` (constrained to valid event names for the target), inferring `ev` from the target's event map.
- Falls back to generic `addEventListener` for non-DOM use.
- **Params**: `target` (EventTarget), `type` (string, constrained to target's events), `listener` (callback), `options` (optional).
- **Returns**: Cleanup function.

For more details, see the source or TypeScript defs.
