# Motion (anonymized)

- No page-load sequence and no scroll-triggered reveals. The only ambient motion is the hero photograph settling slightly on load.
- Filter state changes instantly; cards do not animate in or out.
- Dialog opens and closes with a short opacity/transform transition, with focus moved in and returned on close.
- Newsletter state changes appear without a choreographed sequence.
- `prefers-reduced-motion: reduce` removes the hero settle and smooth scrolling; nothing depends on motion.
