# Installed skill versions

Installed into each worktree at project scope. This run used OpenCode’s `.opencode/skills/` so OpenCode discovers them automatically; the same standard Agent Skills folders also work in `.agents/skills/` (cross-agent) or `.claude/skills/`.

| Worktree | Skill(s) installed | Source / version | Install command |
|---|---|---|---|
| `frontend-design` | `frontend-design` | `anthropics/skills` @ `dbd4588` (2026-10-09) | copied `skills/frontend-design/` (SKILL.md + LICENSE.txt) |
| `impeccable` | `impeccable` | Impeccable CLI `4.7.0`, engine `0.1.16` | `npx impeccable@latest install -y --providers=opencode --scope=project` |
| `ui-ux-pro-max` | `ui-ux-pro-max` plus its bundle (`design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides`) | `ui-ux-pro-max-cli` `2.15.0` | `npx ui-ux-pro-max-cli init --ai opencode --offline` |
| `emil-kowalski` | `emil-design-eng`, `animate`, `review-animations` | `emilkowalski/skills` @ `2d22863` (2026-10-11) | copied the three skill folders |
| `taste` | `design-taste-frontend` (tasteskill v2, `2.1.3`) | `Leonxlnx/taste-skill` @ `63aba5f` (2026-10-20) | copied `skills/taste-skill/` |

## Notes

- The Anthropic skill is instructions only (`SKILL.md` + `LICENSE.txt`), so copying the folder is the whole install.
- Impeccable installs a command file (`.opencode/commands/impeccable.md`), the skill, and a self-contained engine binary. The worker runs its `init`, `new-work`, `polish`, and `audit` workflow.
- UI UX Pro Max installs multiple supporting skills; the worker is told to use the main `ui-ux-pro-max` workflow, including its Python search/design-system tooling.
- Emil's bundle has 12 skills; the three installed cover his design philosophy, build-from-scratch motion, and motion review. The project does not need native/iOS or performance-specific skills.
- Taste v2 ships scripts and a library. The worker runs `draw.mjs`, `inspect.mjs`, and `lint.mjs` as prescribed, writing scratch files under `.taste-skill/`.
- These installs are gitignored. `NOTES.md` in each worktree records what the worker actually ran.

## Portability

These are standard Agent Skills folders, so they are not tied to OpenCode. At project scope, OpenCode discovers:

- `.opencode/skills/<name>/SKILL.md` — OpenCode-specific
- `.claude/skills/<name>/SKILL.md` — Claude-compatible
- `.agents/skills/<name>/SKILL.md` — cross-agent convention

Use `.agents/skills/` when you want a harness-agnostic layout. Use the agent-specific folder when an installer also needs to write agent-specific commands or hooks; Impeccable, for example, installs a command file and a detector hook alongside its skill.
