# Isoworld Scaffold

Minimal, manually testable isometric ARPG prototype. Browser-first (Phaser + Vite), no Unity/Godot editor required.

---

## Zero‑Day Setup (after clone)
- **Install Node.js 18+** (or 20+ recommended).
- From repo root, go to `web/` and install deps:
  - `npm install`
- Start the dev server:
  - `npm run dev`
- Open the shown Local and LAN URLs in your browser.
  - For phone testing, ensure the phone is on the same Wi‑Fi.

## How to run
In `web/`:
```
npm install
npm run dev
```
Open the local and LAN URLs in your browser. On phone, ensure it’s on the same Wi‑Fi.

## Suggested browsers
- **Desktop**: Latest Chrome or Edge
- **Android**: Latest Chrome
- **iOS**: Latest Safari (Chrome on iOS is fine but uses WebKit; Safari is baseline)

## Manual test checklist
- **Movement**: Drag the left joystick to move; camera follows
- **Actions**: Tap two right buttons; see tint/scale feedback and console logs
- **Portal**: Move to around `600,600`; console logs “Loading Map: demo-2”

## Project structure
```
docs/
  PROJECT_PLAN.md        # Project plan and milestones
  ROADMAP.md             # Vision and high-level roadmap
web/
  index.html             # App shell
  main.ts                # Phaser game bootstrap
  scenes/PlayScene.ts    # Map, player, camera, portal
  ui/virtualJoystick.ts  # Touch joystick
  ui/actionButtons.ts    # Two action buttons
  package.json           # Scripts and deps
  vite.config.ts         # Dev server config
```

## Scripts (in web/)
- **dev**: Start Vite dev server
- **build**: Production build to `dist/`
- **preview**: Preview the production build

## Troubleshooting
- **LAN URL not reachable on phone**: Ensure desktop and phone are on the same Wi‑Fi; check firewall settings; try using the machine IP directly
- **Blank screen**: Check browser console for errors; re-run `npm install`
- **Slow or jittery input**: Close background tabs/apps; ensure low power mode is off on mobile

## Git hygiene
- Repo root includes `/.gitignore` to exclude `node_modules`, `dist`, caches, logs, and optional Godot temp files.

## Next steps
- See `docs/PROJECT_PLAN.md` for milestones (PWA, inventory, basic combat).

### How to test A2HS
Dev server: `cd web && npm run dev`
- Note: service workers are most reliable with a production build:
  - `npm run build && npm run preview`

Android/Chrome:
- Open LAN URL → Chrome menu → Install app (or Add to Home screen).
iOS/Safari:
- Open LAN URL → Share → Add to Home Screen.
