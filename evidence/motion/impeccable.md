# Motion (anonymized)

- A subtle marquee-bulb flicker runs in the hero chrome; a shutter clip-path intro reveals the feature photograph.
- Cards fade and rise ~10 px when a filter change reveals them; the effect is short and staggered by order.
- Buttons, cards, arrows, and the close control have hover and press transforms with custom ease-out curves.
- The puppy detail is a native modal dialog with a short open/close transition; background scroll is locked and focus is trapped.
- Filter state changes are immediate; the selected state is legible without waiting for a colour transition.
- `prefers-reduced-motion: reduce` collapses animations and transitions to 0.01 ms and removes hover transforms and smooth scrolling.
