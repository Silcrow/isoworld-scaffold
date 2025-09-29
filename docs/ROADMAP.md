# Roadmap

## 1. High-Level Vision & Purpose

The project is a **mobile-first isometric action RPG framework**, inspired more by **Wild Rift** than by casual social worlds.

* **Core Gameplay**:

  * Left thumb joystick controls character movement.
  * Right thumb action buttons (basic attack + spell slots) that change dynamically depending on equipped abilities or items.
* **Core Interactions**:

  * **Exploration** – roam a map, enter doors/portals to load new maps.
  * **Structural Interactables** – sit on furniture, open chests, activate switches.
  * **Item System** – pick up items into an inventory, equip them for spells, buffs, or passive stats.
  * **Creature System** – spawn, fight, and interact with creatures. The framework is designed to flexibly support new creature types, behaviors, and combat mechanics.
* **Vision**:

  * A **personal worldbuilding sandbox** where new environments, items, and abilities can be created incrementally.
  * Long-term, it can be extended into a publishable mobile game (Google Play / App Store) or remain a personal creative playground.

---

## 2. Tech Stack

### Engine & Language

* **Godot 4.x** (open-source, lightweight, supports mobile export).
* **GDScript** (Python-like language, easy to generate and extend via AI).

### Platforms

* **Target**: Android & iOS (via Godot export).
* **Optional**: Browser/Web export (for debugging or sharing builds).

### Project Workflow

* **Code-first approach** (minimal use of the Godot editor).
* **AI-driven scaffolding** via Windsurf prompts:

  * Generate new GDScript modules.
  * Add maps, entities, or systems incrementally.
  * Maintain modular folder structure (`/entities`, `/maps`, `/systems`, `/ui`).

---

## 3. Feature Roadmap

### Phase 1 – Core Scaffold

* [ ] Basic Godot project scaffold with entry scene.
* [ ] Player character with joystick-based movement.
* [ ] Simple camera follow system.
* [ ] Basic map loader (load new maps on trigger, e.g., entering a door).

### Phase 2 – Interaction & Inventory

* [ ] Item pickup system (walk over or interact).
* [ ] Inventory UI (list of items).
* [ ] Equip system (items grant abilities or buffs).
* [ ] Structural interactables (sit on sofa, open chest, toggle lever).

### Phase 3 – Combat & Creatures

* [ ] Combat framework with modular abilities.
* [ ] Dynamic action bar (buttons update with equipped abilities).
* [ ] Creature entities with basic AI (wander, chase, attack).
* [ ] Flexible system for creating new creatures and combat mechanics.

### Phase 4 – Expansion & Flexibility

* [ ] Map design tools (easy way to add new environments).
* [ ] Extendable item/ability templates.
* [ ] Modular creature templates (stats, behaviors, abilities).
* [ ] Environmental hazards & puzzles (traps, locked doors, etc.).

### Phase 5 – Polish & Publishing

* [ ] Basic UI polish (menus, HUD).
* [ ] Save/load system.
* [ ] Sound & particle effects.
* [ ] Mobile export pipeline (APK/IPA builds).
* [ ] Optional monetization hooks (skins, unlockables, expansions).

---

⚡ **Principle**: The project is not just a single game—it’s a **flexible worldbuilding engine** that allows rapid experimentation with creatures, maps, items, and combat mechanics.

---

Do you want me to format this `roadmap.md` so it’s ready for a **repo commit**, or keep it in “draft notes” style for you to refine before pushing?
