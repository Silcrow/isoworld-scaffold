# Project Plan: Isometric ARPG Scaffold (Manual-Testable M0)

## 1. Overview
- **Purpose**: Stand up a minimal, manually testable prototype without Unity or GUI-heavy editors. Validate mobile-first controls, camera, and map-transition loop.
- **Long-term vision**: A mobile-first isometric action RPG framework. Modular systems for maps, items, abilities, creatures.
- **Constraint**: No Unity3D or similar app usage. Prefer code-first flow.

## 2. Options Summary
- **Option A (Recommended M0)**: Web PWA using Phaser 3, Vite. Zero editor footprint. Easiest way to test touch controls and share via a local LAN URL.
- **Option B**: Godot 4, strictly code-first (CLI to run). Aligns with long-term engine, slightly more setup.

## 3. M0 Scope (Manually Testable)
- **Movement**: Left on-screen joystick moves player smoothly; camera follows.
- **Actions**: Two right-side action buttons trigger dummy effects (e.g., tint/flash, console log).
- **Portal**: Collide with a marked tile to log "Loading Map: X".
- **Mobile**: Confirm touch works on iOS/Android browser.

## 4. Option A — Web PWA (Phaser 3)
### 4.1 Architecture
- **Tech**: TypeScript, Phaser 3, Vite dev server, optional Service Worker for PWA.
- **Rationale**: Fast iteration, simple local+mobile testing, no heavy runtime.

### 4.2 Directory Structure
```
web/
  index.html
  main.ts
  scenes/
    PlayScene.ts
  ui/
    virtualJoystick.ts
    actionButtons.ts
  assets/
    player.png (placeholder)
    ui/*.png (placeholders)
  vite.config.ts
  package.json
  manifest.webmanifest (M0+1)
  service-worker.js   (M0+1)
```

### 4.3 Core Implementation Notes
- **PlayScene**: Creates map (placeholder grid/tiles), spawns player sprite, sets `camera.startFollow(player)`.
- **virtualJoystick**: Single touch area on left; derive normalized vector; update player velocity.
- **actionButtons**: Two right-side buttons; onTap triggers visual effects or logs.
- **Portal Trigger**: A tile or rectangle zone; on overlap -> `console.log('Loading Map: demo-2')`.

### 4.4 Manual Test Plan
- **Desktop**: Run `npm run dev` in `web/`. Drag joystick with mouse, tap buttons, collide portal, observe logs and effects.
- **Mobile**: Visit LAN URL shown by Vite (same Wi-Fi). Repeat tests. Optional: Add-to-Home-Screen when PWA is enabled.

### 4.5 Success Criteria
- **Controls**: Responsive joystick and camera follow, no jitter on mobile.
- **Feedback**: Actions immediately change player tint/scale or spawn a flash sprite.
- **Portal**: Overlap reliably logs map-load intent.
- **Performance**: ~60 FPS with placeholders on a mid-tier phone.

### 4.6 Delivery Artifacts (M0)
- `web/index.html`, `web/main.ts`, `web/scenes/PlayScene.ts`, `web/ui/virtualJoystick.ts`, `web/ui/actionButtons.ts`
- `web/package.json` with scripts: `dev`, `build`, `preview`
- Minimal `assets/` placeholders
- `README.md` (run instructions)

### 4.7 Run Instructions (M0)
- `npm install`
- `npm run dev`
- Open the provided local and LAN URLs in desktop/mobile browsers.

### 4.8 Risks & Mitigations
- **Touch input inconsistencies**: Use Pointer Events and a single-touch zone for the joystick.
- **Mobile keyboard focus or scroll**: Lock viewport, prevent default gestures on canvas.
- **PWA install quirks on iOS**: Keep PWA optional in M0; add service worker and manifest in M0+1.

## 5. Option B — Godot 4 (Code-First)
### 5.1 Structure
```
godot/
  project.godot
  scenes/
    Entry.tscn
    Play.tscn
  scripts/
    Player.gd
    Joystick.gd
    ActionButtons.gd
  assets/
    placeholders
```

### 5.2 Notes
- Run via CLI: `godot4 --path godot/ --run`.
- Same joystick + actions + portal behavior reimplemented in GDScript.
- Export to HTML5/Android later once M0 is validated.

## 6. Milestones
- **M0 (Web)**: Joystick, actions, camera, portal trigger, local testing.
- **M0+1**: PWA manifest + service worker; basic HUD polish.
- **M1**: Inventory scaffold + item pickup; minimal data model.
- **M2**: Basic combat loop; creature placeholder with wander/chase/attack.

## 7. Decision
- Proceed with **Option A (Web PWA)** for M0 to validate controls and loop quickly.
- Reassess at M1 whether to keep Web path or port to Godot 4 code-first.

## 8. Suggested Browsers (for M0 testing)
- **Desktop**: Latest Chrome or Edge.
- **Android**: Latest Chrome.
- **iOS**: Latest Safari. Chrome on iOS is acceptable but uses WebKit; test Safari for baseline.

## 9. Next Actions
- Scaffold `web/` and implement M0 files.
- Add run instructions to `README.md`.
- Verify mobile touch on at least one Android and one iOS device.
