# Motion (anonymized)

- No page-load hero animation; content is readable immediately.
- Filter chips change state instantly, deliberately avoiding a low-contrast transition frame.
- Cards and buttons have hover/press feedback; the detail view is a right drawer on desktop and a bottom sheet on mobile with a short transform/opacity transition.
- Newsletter success swaps in place; the page does not navigate.
- `prefers-reduced-motion: reduce` disables smooth scrolling, transitions, and hover transforms.
