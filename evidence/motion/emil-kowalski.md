# Motion (anonymized)

- No page-load animation and no scroll reveals; the page is readable the moment it paints.
- Buttons, chips, cards, and the close control acknowledge a press with a subtle `scale(0.97)` for ~140 ms.
- Cards scale the photograph slightly on hover (~240 ms) and compress on press; an arrow shifts 2 px. The card itself does not move.
- Newly revealed cards after a filter change fade and rise 180 ms with a 30 ms stagger; exits are instant.
- Detail dialog opens in 240 ms and closes in 160 ms, with a synced backdrop and a centred transform origin.
- Newsletter success fades and rises 200 ms; the confirmation is focused.
- Every hover movement is gated behind `(hover: hover) and (pointer: fine)`. Reduced motion removes transforms and stagger but keeps opacity/colour feedback.
