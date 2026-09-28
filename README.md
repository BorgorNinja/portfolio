# Rochelle's Portfolio & Arcade Suite

A showcase of software engineering, 3D graphics experiments, and interactive web games.

Live Site: [https://borgorninja.duckdns.org](https://borgorninja.duckdns.org)

## Features & Modules

### 🌐 Main Portfolio
- Terminal / retro-cyber aesthetic portfolio featuring software engineering, sysadmin, automation, and systems architecture projects.
- Live 3D experimental viewers:
  - `/house3d/` - Interactive 3D isometric room built with Three.js.
  - `/hand3d/` - Rigged 3D hand model viewer and interaction lab.

### 🕹️ The Arcade Lobby (`/arcade/`)
Central game hub featuring live 3D preview cards, persistent player balance, and responsive desktop/mobile layouts.

- **🎱 Perya Billiard Ball Roulette (`/roulette/`)**:
  - Authentic 28-tile perimeter tabletop roulette inspired by traditional Philippine perya machines.
  - Multiplayer room sync (up to 4 live seats) connected to JTrash profiles.
  - 30-second betting countdown, 15-second suspense runner spin with zero-teleport physical deceleration.
  - Dynamic special features: Reverse Rotation, Explosion / All Lights On, and 9th Ball Mystery payouts.
  - 7-segment digital LED odds displays and Web Audio synthesis for authentic mechanical relay clicks.

- **🎰 Cyber Scatter Slots (`/slots/`)**:
  - 6x5 tumbling reel slot machine with neon graphic arts and animated scatter drops.
  - Multiplier cascades, free spins mode, dynamic soundscapes, and mobile-optimized autoplay.

- **🎱 3D Billiard Pool (`/pool/`)**:
  - Three.js 3D pool table simulation featuring realistic rolling vector physics, rail bounces, cue targeting, and spin transfer.

- **🪀 Cyber Pinball (`/pinball/`)**:
  - Canvas 2D / physics-driven arcade pinball cabinet with responsive flippers, drop targets, bumpers, and multiball mechanics.

- **🪙 JTrash Wallet Hub (`/jtrash/`)**:
  - Simulated arcade economy with persistent cookies and localStorage sync across all games, Ayuda faucet claims, and transaction histories.

## Tech Stack
- Frontend: Vanilla HTML5, CSS3 (CSS Grid / Flexbox / Custom Properties), Modern JavaScript (ES6+).
- 3D Graphics: Three.js, WebGL.
- Audio: Native Web Audio API procedural synthesis.
- Backend: PHP / JSON room state synchronization.
