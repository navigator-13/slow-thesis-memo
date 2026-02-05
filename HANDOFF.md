# Handoff Summary

Project context (slow-thesis-memo):
- Branch in use: `visual-id2`. Latest commit: `stable clean`.
- Dev server: `next dev` runs on port 3003 (may require privilege in this environment).
- Markdown source now at `src/content/synthesis-memo-v3.md`. The app reads this file in `src/app/page.tsx`.

Content rendering:
- `src/lib/markdown.ts` parses H1 as `title`, builds sections from H2, and captures a `preface` (everything before first H2).
- The H2 section named “TABLE OF CONTENTS” is skipped from rendering.
- `src/components/SectionContent.tsx` renders the preface (including H1 + intro) above the first section (Executive Summary), but keeps it out of the ToC.

Sidebar:
- Sidebar title now: `SYN(THESIS):` above “CREATOR FUND + FOUNDATION INSIGHTS” (plus sign is white). `SYN(THESIS)` parentheses are white.
- Small logo divider between title block and ToC using `public/logo-day.png` / `public/logo-night.png`, tinted to `#E2C79A` via CSS mask.
- Divider between sidebar and main: 3px, flat color (no gradient), uses theme text color and alpha.

Design system:
- Global CSS in `src/app/globals.css` defines `--earth-900/50`, `--text-dark/light`, gold tokens, gradients, etc.
- Sidebar background is flat; no gradients.
- ToC items: text uses flat gold fallback, hover uses gold wash background (gradient).
- Gold text utilities: base/hover in CSS.

Footer scene:
- `src/components/SidebarFooterScene.tsx` renders 3 hills (180px height), hover states (no pulsing), plus PNG windmill silhouette (masked/tinted to mid hill).
- Sun/moon toggle reverted to simple icon (no circle outline). Dark mode shows moon, light shows sun.

Topo texture:
- `public/topo2.svg` and `public/topo2-light.svg` use low-opacity strokes matching text color.

Other:
- Shovel icon toggle uses mask, light mode color = sidebar bg, dark mode color = `#E2C79A`.

Known issues:
- Hill hover still occasionally flickers/pulses; not fully solved.
