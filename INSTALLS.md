# Installed skill versions

Installed into each worktree at project scope in the cross-agent `.agents/skills/` directory. Where an installer expects a harness-specific project folder, the canonical folder is mirrored or symlinked into that path.

| Worktree | Skill(s) installed | Source / version | How it was installed |
|---|---|---|---|
| `frontend-design` | `frontend-design` | `anthropics/skills` @ `dbd4588` (2026-10-09) | Copied `skills/frontend-design/` (SKILL.md + LICENSE.txt) into `.agents/skills/` |
| `impeccable` | `impeccable` | Impeccable CLI `4.7.0`, engine `0.1.16` | Vendor installer at project scope; skill folder moved into `.agents/skills/` |
| `ui-ux-pro-max` | `ui-ux-pro-max` plus its bundle (`design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides`) | `ui-ux-pro-max-cli` `2.15.0` | Vendor installer at project scope; skill bundle moved into `.agents/skills/` |
| `emil-kowalski` | `emil-design-eng`, `animate`, `review-animations` | `emilkowalski/skills` @ `2d22863` (2026-10-11) | Copied the three skill folders into `.agents/skills/` |
| `taste` | `design-taste-frontend` (tasteskill v2, `2.1.3`) | `Leonxlnx/taste-skill` @ `63aba5f` (2026-10-20) | Copied `skills/taste-skill/` into `.agents/skills/` |

## Notes

- The Anthropic skill is instructions only (`SKILL.md` + `LICENSE.txt`), so copying the folder is the whole install.
- Impeccable also writes a command file and a self-contained engine binary alongside its skill. The worker runs its `init`, `new-work`, `polish`, and `audit` workflow.
- UI UX Pro Max installs multiple supporting skills; the worker is told to use the main `ui-ux-pro-max` workflow, including its Python search/design-system tooling.
- Emil's bundle has 12 skills; the three installed cover his design philosophy, build-from-scratch motion, and motion review. The project does not need native/iOS or performance-specific skills.
- Taste v2 ships scripts and a library. The worker runs `draw.mjs`, `inspect.mjs`, and `lint.mjs` as prescribed, writing scratch files under `.taste-skill/`.
- These installs are gitignored. `NOTES.md` in each worktree records what the worker actually ran.

## Portability

These are standard Agent Skills folders. The cross-agent project location is:

```
.agents/skills/<name>/SKILL.md
```

Some harnesses only scan their own project skills folder. If yours does, mirror or symlink the `.agents/skills/` folders into the path it documents; keep `.agents/skills/` as the canonical copy. Use an agent-specific folder when an installer also needs to write agent-specific commands or hooks; Impeccable, for example, writes a command file and a detector hook alongside its skill.
