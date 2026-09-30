/**
 * BORGOR ARCADIA & GRAND CASINO — Procedural 3D Lobby Visuals Engine
 * High-performance, lightweight 3D Canvas / WebGL procedural renderers for all 50+ arcade catalog games.
 * Features:
 * - 3D perspective projection and geometric rotation matrices
 * - Dedicated themes: Cards, Roulette/Wheels, Tumbling Dice, Minted Coin, Slot Drums, Rockets, Plinko/Mines, Derby, Scratch, Keno
 * - IntersectionObserver to pause off-screen animations and guarantee 60 FPS
 * - Interactive 3D tilt responding to cursor hover
 */

(function () {
  'use strict';

  // Master tracking
  const activeCanvases = new Set();
  const cardConfigs = new Map();
  let animFrameId = null;
  let isObserverSetup = false;
  let observer = null;

  // Global particles & physics state per canvas
  const canvasStates = new Map();

  function getState(id) {
    if (!canvasStates.has(id)) {
      canvasStates.set(id, {
        particles: [],
        seed: Math.random() * 100,
        spinOffset: Math.random() * 10,
        lastTime: performance.now(),
        scratchProgress: 0,
        balls: null,
        dice: null
      });
    }
    return canvasStates.get(id);
  }

  /* =========================================================================
     3D MATH & GRAPHICS UTILITIES
     ========================================================================= */

  function project3D(x, y, z, cx, cy, fov) {
    const scale = fov / (fov + z);
    return {
      x: cx + x * scale,
      y: cy + y * scale,
      scale: scale,
      z: z
    };
  }

  function rotX(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
  }

  function rotY(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
  }

  function rotZ(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
  }

  function drawRoundRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* =========================================================================
     1. 3D FANNING PLAYING CARDS RENDERER (Poker, Blackjack, War, Tongits, etc.)
     ========================================================================= */

  function renderCardGame3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;
    const mx = parseFloat(cv.dataset.mx || 0);
    const my = parseFloat(cv.dataset.my || 0);

    const time = t * 0.0018;
    const hoverPitch = my * 0.25;
    const hoverYaw = mx * 0.3;
    const floatY = Math.sin(time * 2 + st.seed) * 5;
    const tiltZ = Math.cos(time * 1.6 + st.seed) * 0.04;

    ctx.clearRect(0, 0, cv.width, cv.height);

    // Subtle table felt glow
    const feltGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
    feltGrad.addColorStop(0, `${g.accent}20`);
    feltGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
    ctx.fillStyle = feltGrad;
    ctx.fillRect(0, 0, cv.width, cv.height);

    // Helpers to render a single 3D card
    function draw3DCard(xOffset, yOffset, angleDeg, rank, suit, isOpponent, scaleFactor = 1) {
      ctx.save();
      const rad = (angleDeg * Math.PI) / 180 + tiltZ + hoverYaw * 0.5;
      ctx.translate(cx + xOffset, cy + yOffset + floatY);
      ctx.rotate(rad);
      ctx.scale(scaleFactor * (1 - hoverPitch * 0.15), scaleFactor);

      const w = 78;
      const h = 114;
      const r = 7;

      // Cast shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 12 - floatY * 0.5;

      // Card Body
      if (isOpponent) {
        // Royal dark carbon card back
        const backGrad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
        backGrad.addColorStop(0, '#0f172a');
        backGrad.addColorStop(0.5, '#1e293b');
        backGrad.addColorStop(1, '#020617');
        ctx.fillStyle = backGrad;
        drawRoundRect(ctx, -w / 2, -h / 2, w, h, r);
        ctx.fill();

        // Intricate geometric back pattern
        ctx.strokeStyle = `${g.accent}99`;
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 4);
        ctx.stroke();

        ctx.fillStyle = `${g.accent}55`;
        ctx.font = '22px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♦', 0, 0);
      } else {
        // Crisp ivory face
        const faceGrad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
        faceGrad.addColorStop(0, '#ffffff');
        faceGrad.addColorStop(1, '#f1f5f9');
        ctx.fillStyle = faceGrad;
        drawRoundRect(ctx, -w / 2, -h / 2, w, h, r);
        ctx.fill();

        // Bevel border
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Gold border inner accent
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
        ctx.strokeRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8);

        // Rank and suit color
        const isRed = suit === '♥' || suit === '♦';
        const color = isRed ? '#dc2626' : '#0f172a';
        ctx.fillStyle = color;

        // Top-left rank
        ctx.font = 'bold 12px "JetBrains Mono", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(rank, -w / 2 + 7, -h / 2 + 7);
        ctx.font = '11px serif';
        ctx.fillText(suit, -w / 2 + 7, -h / 2 + 20);

        // Center Emblem
        ctx.font = '32px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(suit, 0, 2);

        // Bottom-right rank
        ctx.font = 'bold 12px "JetBrains Mono", sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(rank, w / 2 - 7, h / 2 - 7);
      }

      // Holographic Foil Reflection Sweep
      const sheenX = Math.sin(time * 1.5 + xOffset * 0.02) * (w * 1.5);
      const sheen = ctx.createLinearGradient(sheenX - 30, -h / 2, sheenX + 30, h / 2);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0)');
      sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      sheen.addColorStop(0.7, `${g.accent}44`);
      sheen.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.save();
      ctx.clip();
      ctx.fillStyle = sheen;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();

      ctx.restore();
    }

    // Adapt layout per card game type
    const id = g.id;

    if (id === 'blackjack' || id === 'single_deck_bj' || id === 'pontoon' || id === 'spanish21') {
      // Classic 2-Card Blackjack Fan (Ace & King)
      draw3DCard(-24, 6, -14, 'A', '♠', false);
      draw3DCard(24, 2, 14, id === 'pontoon' ? 'J' : 'K', '♣', false);

      // 21 Gold Badge
      ctx.save();
      ctx.translate(cx, cy + 54 + floatY * 0.5);
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      drawRoundRect(ctx, -28, -12, 56, 24, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(id === 'pontoon' ? 'PONTOON' : '21 BJ', 0, 1);
      ctx.restore();

    } else if (id === 'holdem_heads_up') {
      // Texas Hold'em Pocket Aces + 3D Chip Stack
      draw3DCard(-20, 8, -16, 'A', '♠', false);
      draw3DCard(18, 4, 12, 'A', '♥', false);

      // Stacked 3D Chips in front
      for (let c = 0; c < 4; c++) {
        const chipY = cy + 42 - c * 5;
        ctx.fillStyle = c % 2 === 0 ? '#dc2626' : '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(cx + 42, chipY, 18, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

    } else if (id === 'baccarat' || id === 'dragon_baccarat') {
      // Baccarat Natural 9 Showdown
      draw3DCard(-26, 4, -12, '8', '♦', false);
      draw3DCard(26, 4, 12, '9', '♣', false);

      ctx.save();
      ctx.fillStyle = g.accent;
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.shadowColor = g.accent;
      ctx.shadowBlur = 10;
      ctx.fillText(id === 'dragon_baccarat' ? '🐉 DRAGON 7' : 'NATURAL 9', cx, cy - 60);
      ctx.restore();

    } else if (id === 'three_card_poker' || id === 'caribbean_stud' || id === 'teen_patti') {
      // 3-Card Majestic Fan
      draw3DCard(-34, 10, -22, 'Q', '♠', false);
      draw3DCard(0, 0, 0, 'K', '♠', false);
      draw3DCard(34, 10, 22, 'A', '♠', false);

    } else if (id === 'casino_war' || id === 'dragon_tiger') {
      // 3D Angled Clash: Player vs Dealer / Dragon vs Tiger
      draw3DCard(-45, 6, -20, 'K', '♦', false, 0.95);
      draw3DCard(45, 6, 20, 'A', '♠', false, 0.95);

      // Clash VS emblem
      ctx.save();
      ctx.translate(cx, cy + floatY);
      ctx.fillStyle = '#ef4444';
      ctx.font = '900 18px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 15;
      ctx.fillText('⚡ VS ⚡', 0, 0);
      ctx.restore();

    } else if (id === 'hilo_cards') {
      // High-Low runner
      draw3DCard(-20, 6, -6, '7', '♦', false);
      draw3DCard(35, 14, 18, '?', '?', true, 0.85);

      // Pulse neon arrows
      const arrowPulse = Math.sin(time * 4) * 4;
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 14px "JetBrains Mono"';
      ctx.fillText('▲ HI', cx + 45, cy - 35 - arrowPulse);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('▼ LO', cx + 45, cy + 45 + arrowPulse);

    } else if (id === 'tongits_blitz') {
      // 3-Card Bahay meld fan (7-8-9 clubs)
      draw3DCard(-30, 8, -18, '7', '♣', false);
      draw3DCard(0, 2, 0, '8', '♣', false);
      draw3DCard(30, 8, 18, '9', '♣', false);

      ctx.save();
      ctx.translate(cx, cy + 54);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fillText('🃏 TONGITS!', 0, 0);
      ctx.restore();

    } else if (id.startsWith('vp_')) {
      // Video Poker: 5 Cards in curved 3D perspective
      const ranks = id === 'vp_deuces' ? ['2', '2', '2', '2', 'A'] : ['10', 'J', 'Q', 'K', 'A'];
      const suits = ['♠', '♥', '♦', '♣', '♠'];
      const offsets = [-64, -32, 0, 32, 64];

      offsets.forEach((ox, idx) => {
        const curAngle = (ox / 64) * 12;
        const curY = Math.abs(ox) * 0.15;
        draw3DCard(ox, curY, curAngle, ranks[idx], suits[idx], false, 0.72);
      });

      // Held badge over cards
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 9px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText('HELD', cx - 32, cy - 46);
      ctx.fillText('HELD', cx + 32, cy - 46);

    } else {
      // General Card Game layout
      draw3DCard(-24, 6, -14, 'A', '♦', false);
      draw3DCard(24, 4, 14, 'K', '♠', false);
    }
  }

  /* =========================================================================
     2. 3D ROTATING ROULETTE & WHEELS RENDERER
     ========================================================================= */

  function renderRouletteWheel3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2 + 10;
    const mx = parseFloat(cv.dataset.mx || 0);
    const my = parseFloat(cv.dataset.my || 0);

    const time = t * 0.0015;
    const rotSpeed = g.id === 'wheel' ? 0.028 : 0.022;
    st.spinOffset += rotSpeed;

    ctx.clearRect(0, 0, cv.width, cv.height);

    const rx = 108;
    const ry = 48 + my * 6;
    const isWheel = g.id === 'wheel';

    // Outer Beveled Mahogany / Carbon Rim
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx + 14, ry + 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Metallic rim border
    ctx.strokeStyle = g.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx + 6, ry + 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Radial Segments
    const numSegments = isWheel ? 24 : 37;
    const colors = isWheel
      ? ['#facc15', '#a855f7', '#06b6d4', '#ec4899', '#22c55e', '#ef4444']
      : ['#b91c1c', '#18181b'];

    for (let i = 0; i < numSegments; i++) {
      const a1 = st.spinOffset + (i * 2 * Math.PI) / numSegments;
      const a2 = a1 + (2 * Math.PI) / numSegments;

      ctx.fillStyle = (!isWheel && i === 0) ? '#15803d' : colors[i % colors.length];
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a1) * rx, cy + Math.sin(a1) * ry);
      ctx.lineTo(cx + Math.cos(a2) * rx, cy + Math.sin(a2) * ry);
      ctx.closePath();
      ctx.fill();
    }

    // Outer golden studs
    for (let i = 0; i < 16; i++) {
      const ang = st.spinOffset + (i * 2 * Math.PI) / 16;
      const sx = cx + Math.cos(ang) * (rx + 4);
      const sy = cy + Math.sin(ang) * (ry + 4);
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center Turret Cone / Hub
    const hubRx = 32;
    const hubRy = 14;
    const hubGrad = ctx.createLinearGradient(cx - hubRx, cy - 10, cx + hubRx, cy + 10);
    hubGrad.addColorStop(0, '#fde047');
    hubGrad.addColorStop(0.5, '#d97706');
    hubGrad.addColorStop(1, '#78350f');

    ctx.fillStyle = hubGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, hubRx, hubRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Rotating 3D cross handles for roulette
    if (!isWheel) {
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      for (let h = 0; h < 4; h++) {
        const armAng = -st.spinOffset * 1.5 + (h * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(armAng) * (hubRx + 12), cy + Math.sin(armAng) * (hubRy + 5));
        ctx.stroke();
      }

      // 3D Spinning Ivory Ball (orbits in reverse)
      const ballAng = -st.spinOffset * 2.8;
      const bx = cx + Math.cos(ballAng) * (rx - 8);
      const by = cy + Math.sin(ballAng) * (ry - 4);

      // Ball shadow
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.ellipse(bx, by + 3, 5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ball
      const ballGrad = ctx.createRadialGradient(bx - 2, by - 2, 1, bx, by, 5);
      ballGrad.addColorStop(0, '#ffffff');
      ballGrad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();

    } else {
      // Spring-loaded flipper pointer at top 12 o'clock
      const clickWobble = Math.sin(st.spinOffset * 24) * 3;
      ctx.save();
      ctx.translate(cx, cy - ry - 2);
      ctx.rotate((clickWobble * Math.PI) / 180);
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-7, -14);
      ctx.lineTo(7, -14);
      ctx.lineTo(0, 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  /* =========================================================================
     3. 3D TUMBLING TEXTURED DICE RENDERER (Dice, Craps, Sic Bo, Color Game)
     ========================================================================= */

  function renderDice3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;
    const mx = parseFloat(cv.dataset.mx || 0);
    const my = parseFloat(cv.dataset.my || 0);

    const time = t * 0.0016;
    ctx.clearRect(0, 0, cv.width, cv.height);

    const isColorGame = g.id === 'color_game';
    const isSicBo = g.id === 'sicbo';
    const numDice = isColorGame || isSicBo ? 3 : 2;

    // Define standard cube 8 vertices
    const S = isColorGame || isSicBo ? 22 : 26;
    const baseVerts = [
      { x: -S, y: -S, z: -S },
      { x: S, y: -S, z: -S },
      { x: S, y: S, z: -S },
      { x: -S, y: S, z: -S },
      { x: -S, y: -S, z: S },
      { x: S, y: -S, z: S },
      { x: S, y: S, z: S },
      { x: -S, y: S, z: S }
    ];

    // 6 Faces: vertices indices, normal direction, pips
    const faces = [
      { verts: [4, 5, 6, 7], pips: 1, normal: { x: 0, y: 0, z: 1 }, color: '#facc15' }, // +Z (Yellow)
      { verts: [1, 0, 3, 2], pips: 6, normal: { x: 0, y: 0, z: -1 }, color: '#f8fafc' }, // -Z (White)
      { verts: [5, 1, 2, 6], pips: 2, normal: { x: 1, y: 0, z: 0 }, color: '#ec4899' }, // +X (Pink)
      { verts: [0, 4, 7, 3], pips: 5, normal: { x: -1, y: 0, z: 0 }, color: '#2563eb' }, // -X (Blue)
      { verts: [7, 6, 2, 3], pips: 3, normal: { x: 0, y: 1, z: 0 }, color: '#dc2626' }, // +Y (Red)
      { verts: [0, 1, 5, 4], pips: 4, normal: { x: 0, y: -1, z: 0 }, color: '#16a34a' }  // -Y (Green)
    ];

    const dicePositions = numDice === 3
      ? [{ x: -55, y: 10 }, { x: 0, y: -8 }, { x: 55, y: 10 }]
      : [{ x: -38, y: 4 }, { x: 38, y: -4 }];

    dicePositions.forEach((dp, dIdx) => {
      const rotAngleX = time * (1.8 + dIdx * 0.4) + st.seed + my * 0.5;
      const rotAngleY = time * (2.2 + dIdx * 0.3) + st.seed + mx * 0.5;
      const rotAngleZ = time * (1.2 + dIdx * 0.2);

      const bounceY = Math.abs(Math.sin(time * 3 + dIdx * 1.5)) * -18;
      const dieX = cx + dp.x;
      const dieY = cy + dp.y + bounceY;

      // Drop shadow on ground plane
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      const shadowScale = 1 + bounceY * -0.02;
      ctx.beginPath();
      ctx.ellipse(dieX, cy + 42, 28 * shadowScale, 9 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Transform vertices
      const transformedVerts = baseVerts.map(v => {
        let p = rotX(v, rotAngleX);
        p = rotY(p, rotAngleY);
        p = rotZ(p, rotAngleZ);
        return project3D(p.x, p.y, p.z, dieX, dieY, 300);
      });

      // Transform and sort faces by average Z depth
      const sortedFaces = faces.map((f, fIdx) => {
        let n = rotX(f.normal, rotAngleX);
        n = rotY(n, rotAngleY);
        n = rotZ(n, rotAngleZ);

        const avgZ = f.verts.reduce((sum, vIdx) => sum + transformedVerts[vIdx].z, 0) / 4;
        return { ...f, transNormal: n, avgZ, origIndex: fIdx };
      }).sort((a, b) => b.avgZ - a.avgZ);

      // Render visible faces
      sortedFaces.forEach(f => {
        // Backface culling
        if (f.transNormal.z <= 0.05) return;

        // Directional light
        const light = 0.5 + 0.5 * Math.max(0, f.transNormal.x * 0.5 - f.transNormal.y * 0.7 + f.transNormal.z * 0.5);

        ctx.save();
        ctx.beginPath();
        const v0 = transformedVerts[f.verts[0]];
        ctx.moveTo(v0.x, v0.y);
        for (let i = 1; i < 4; i++) {
          const vi = transformedVerts[f.verts[i]];
          ctx.lineTo(vi.x, vi.y);
        }
        ctx.closePath();

        // Base color
        if (isColorGame) {
          ctx.fillStyle = f.color;
        } else if (g.id === 'craps') {
          ctx.fillStyle = `rgba(${Math.round(220 * light)}, 38, 38, 0.92)`;
        } else {
          // Cyber / Gold die
          const cVal = Math.round(245 * light);
          ctx.fillStyle = g.id === 'dice' ? `rgba(6, 182, 212, ${light * 0.85})` : `rgb(${cVal}, ${Math.round(cVal * 0.85)}, 40)`;
        }
        ctx.fill();

        // Face outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Pips (center dots)
        const faceCenterX = (transformedVerts[f.verts[0]].x + transformedVerts[f.verts[2]].x) / 2;
        const faceCenterY = (transformedVerts[f.verts[0]].y + transformedVerts[f.verts[2]].y) / 2;

        if (isColorGame) {
          // Centered emblem circle for Perya
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(faceCenterX, faceCenterY, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Circular pips
          ctx.fillStyle = g.id === 'craps' ? '#ffffff' : (g.id === 'dice' ? '#00f2fe' : '#0f172a');
          const pipR = 2.5;

          if (f.pips === 1 || f.pips === 3 || f.pips === 5) {
            ctx.beginPath();
            ctx.arc(faceCenterX, faceCenterY, pipR, 0, Math.PI * 2);
            ctx.fill();
          }
          if (f.pips >= 2) {
            const dx = (transformedVerts[f.verts[1]].x - transformedVerts[f.verts[0]].x) * 0.25;
            const dy = (transformedVerts[f.verts[1]].y - transformedVerts[f.verts[0]].y) * 0.25;
            ctx.beginPath();
            ctx.arc(faceCenterX - dx, faceCenterY - dy, pipR, 0, Math.PI * 2);
            ctx.arc(faceCenterX + dx, faceCenterY + dy, pipR, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      });
    });
  }

  /* =========================================================================
     4. 3D MINTED GOLD COIN RENDERER (Coinflip)
     ========================================================================= */

  function renderCoinFlip3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;
    const mx = parseFloat(cv.dataset.mx || 0);

    const time = t * 0.0028;
    ctx.clearRect(0, 0, cv.width, cv.height);

    const spinAngle = time * 3.2;
    const cosVal = Math.cos(spinAngle);
    const sinVal = Math.sin(spinAngle);
    const floatY = Math.sin(time * 3) * 6;

    const R = 54;
    const thickness = 14;

    // Drop shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    const shadowWidth = R * Math.abs(cosVal) + 18;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 46, shadowWidth, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(cx, cy + floatY);

    // Coin Edge Ridges / Cylinder Band
    const edgeSteps = 16;
    ctx.fillStyle = '#b45309';
    for (let i = 0; i <= edgeSteps; i++) {
      const stepAngle = -Math.PI / 2 + (i * Math.PI) / edgeSteps;
      const x1 = Math.sin(stepAngle) * thickness * 0.5 * sinVal;
      const xOffset = cosVal * R;
      ctx.fillRect(xOffset - 4, -R * 0.8, 8, R * 1.6);
    }

    // Main Coin Faces
    const isHeads = cosVal >= 0;
    const faceScaleX = Math.abs(cosVal);

    // Coin outer rim
    const goldGrad = ctx.createLinearGradient(-R, -R, R, R);
    goldGrad.addColorStop(0, '#fef08a');
    goldGrad.addColorStop(0.3, '#facc15');
    goldGrad.addColorStop(0.7, '#ca8a04');
    goldGrad.addColorStop(1, '#854d0e');

    ctx.save();
    ctx.scale(faceScaleX, 1);

    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();

    // Beveled inner ridge
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, R - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Embossed Emblem (Crown for Heads, Star for Tails)
    ctx.fillStyle = '#78350f';
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 4;
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isHeads ? '👑' : '⭐', 0, -2);

    // Beaded rim dots
    for (let d = 0; d < 20; d++) {
      const a = (d * Math.PI * 2) / 20;
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(Math.cos(a) * (R - 10), Math.sin(a) * (R - 10), 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Specular anisotropic glint sweep
    const glintX = Math.sin(time * 2) * R * 1.5;
    const glint = ctx.createLinearGradient(glintX - 15, -R, glintX + 15, R);
    glint.addColorStop(0, 'rgba(255, 255, 255, 0)');
    glint.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
    glint.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glint;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  /* =========================================================================
     5. 3D CYLINDRICAL ROTATING REELS RENDERER (9 Dynamic Slot Machines)
     ========================================================================= */

  function renderSlotReels3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.0022;
    ctx.clearRect(0, 0, cv.width, cv.height);

    // Thematic symbol mappings
    const symbolMap = {
      slot_fruit_fiesta: ['🍉', '🍇', '🍒', '🍋', '7️⃣', '🔔'],
      slot_dragon_hold: ['🐉', '🔮', '🏮', '🪙', '💎', '⚡'],
      slot_buffalo: ['🦬', '🦅', '🐺', '🌵', '💰', '👑'],
      slot_book_dead: ['📜', '👁️', '🏺', '☥', '👑', '💎'],
      slot_money_cart: ['🚂', '💣', '💰', '💵', '⚙️', '🧨'],
      slot_mahjong: ['🀄', '🀅', '🀆', '🏮', '🪙', '🎋'],
      slot_perya_fruit: ['🍍', '🍉', '🔔', '🍒', '7️⃣', '🪙'],
      slot_neon_reels: ['⚡', '💠', '🤖', '💾', '🔮', '🚀'],
      slot_aztec_gold: ['🗿', '🏺', '🐍', '🐆', '☀️', '💎']
    };

    const symbols = symbolMap[g.id] || ['7️⃣', '👑', '💎', '⭐', '🔔', '🍒'];
    const numSymbols = symbols.length;

    // Outer Chassis Frame
    ctx.save();
    ctx.fillStyle = '#080d1a';
    ctx.strokeStyle = `${g.accent}66`;
    ctx.lineWidth = 2;
    drawRoundRect(ctx, 45, 25, 210, 140, 14);
    ctx.fill();
    ctx.stroke();

    // 3 Reels side-by-side
    const reelXPositions = [88, 150, 212];
    const drumRadius = 55;

    reelXPositions.forEach((rx, idx) => {
      const reelSpin = time * (3.0 + idx * 0.6) + st.seed;

      // Reel background slot track
      ctx.fillStyle = '#020617';
      drawRoundRect(ctx, rx - 27, 30, 54, 130, 8);
      ctx.fill();

      // Curved drum symbols
      for (let i = 0; i < numSymbols; i++) {
        const ang = reelSpin + (i * 2 * Math.PI) / numSymbols;
        const sinVal = Math.sin(ang);
        const cosVal = Math.cos(ang);

        // Visible on front hemisphere
        if (cosVal > -0.2) {
          const symY = cy + sinVal * drumRadius;
          const scaleY = Math.max(0.2, cosVal);
          const alpha = Math.max(0.1, cosVal);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(rx, symY);
          ctx.scale(1, scaleY);
          ctx.font = '28px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Glow on winning center line
          if (Math.abs(sinVal) < 0.25) {
            ctx.shadowColor = g.accent;
            ctx.shadowBlur = 14;
          }

          ctx.fillText(symbols[i], 0, 0);
          ctx.restore();
        }
      }

      // Vertical Chrome separator struts
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(rx - 27, 30, 54, 130);
    });

    // Horizontal Neon Payline Beam
    ctx.save();
    ctx.strokeStyle = g.accent;
    ctx.lineWidth = 2;
    ctx.shadowColor = g.accent;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(50, cy);
    ctx.lineTo(250, cy);
    ctx.stroke();
    ctx.restore();

    // Curved Glass Cylinder Glare
    const glassGrad = ctx.createLinearGradient(0, 30, 0, 100);
    glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glassGrad;
    drawRoundRect(ctx, 45, 25, 210, 70, 14);
    ctx.fill();

    ctx.restore();
  }

  /* =========================================================================
     6. 3D NEON ROCKET / CRASH / LIMBO RENDERER (Crash, Limbo)
     ========================================================================= */

  function renderRocketCrash3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.0024;
    ctx.clearRect(0, 0, cv.width, cv.height);

    if (g.id === 'crash') {
      // Aviator Crash Rocket
      const rocketX = cx + Math.sin(time * 1.5) * 14 + 10;
      const rocketY = cy - 8 + Math.cos(time * 2.0) * 10;
      const climbAngle = -35 * (Math.PI / 180);

      // Trajectory curve
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, 160);
      ctx.quadraticCurveTo(cx - 30, 140, rocketX - 20, rocketY + 15);
      ctx.stroke();
      ctx.restore();

      // Thruster Exhaust Particles
      if (!st.particles || st.particles.length > 30) st.particles = [];
      st.particles.push({
        x: rocketX - 25,
        y: rocketY + 16,
        vx: -Math.cos(climbAngle) * (2 + Math.random() * 2) + (Math.random() - 0.5),
        vy: -Math.sin(climbAngle) * (2 + Math.random() * 2) + (Math.random() - 0.5),
        life: 1.0,
        size: 3 + Math.random() * 4
      });

      st.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life > 0) {
          ctx.fillStyle = p.life > 0.6 ? '#fde047' : '#f97316';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      st.particles = st.particles.filter(p => p.life > 0);

      // 3D Spacecraft Body
      ctx.save();
      ctx.translate(rocketX, rocketY);
      ctx.rotate(climbAngle);

      // Fuselage
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(28, 0); // Nosecone
      ctx.lineTo(-20, -10);
      ctx.lineTo(-14, 0);
      ctx.lineTo(-20, 10);
      ctx.closePath();
      ctx.fill();

      // Cockpit Canopy
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(4, -1, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delta Wings with Navigation Lights
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-6, -10);
      ctx.lineTo(-20, -22);
      ctx.lineTo(-18, -10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-6, 10);
      ctx.lineTo(-20, 22);
      ctx.lineTo(-18, 10);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Live Multiplier Ticker
      const multVal = (1.0 + ((Math.sin(time) + 1) * 3.4)).toFixed(2);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillText(`🚀 ${multVal}x`, cx - 30, cy + 54);

    } else {
      // Limbo Turbo Rocket - Hyperspace Warp Tunnel
      for (let r = 0; r < 5; r++) {
        const ringProgress = ((time * 1.5 + r * 0.2) % 1.0);
        const radius = ringProgress * 120;
        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - ringProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Center Supersonic Missile
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 16;
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡', cx, cy);

      const limboTarget = (50.0 + Math.sin(time * 2) * 45).toFixed(1);
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 14px "JetBrains Mono"';
      ctx.fillText(`TARGET ${limboTarget}x`, cx, cy + 50);
    }
  }

  /* =========================================================================
     7. 3D PLINKO / MINES / SPIRE RENDERER (Plinko, Mines, Tower)
     ========================================================================= */

  function renderPlinkoMinesSpire3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.002;
    ctx.clearRect(0, 0, cv.width, cv.height);

    if (g.id === 'plinko') {
      // 3D Pegged Pyramid Board
      const rows = 5;
      const pegSpacing = 28;

      for (let r = 0; r < rows; r++) {
        const count = r + 3;
        const rowY = 40 + r * 22;
        const startX = cx - ((count - 1) * pegSpacing) / 2;

        for (let c = 0; c < count; c++) {
          const px = startX + c * pegSpacing;
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.arc(px, rowY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Cascading 3D bouncing spheres
      for (let b = 0; b < 2; b++) {
        const progress = ((time * 1.6 + b * 0.5) % 1.0);
        const ballY = 32 + progress * 115;
        const zigZag = Math.sin(progress * Math.PI * 4) * 18;
        const ballX = cx + zigZag;

        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Multiplier buckets at base
      const bucketColors = ['#ef4444', '#f59e0b', '#10b981', '#f59e0b', '#ef4444'];
      bucketColors.forEach((bc, idx) => {
        const bx = cx - 56 + idx * 28;
        ctx.fillStyle = bc;
        drawRoundRect(ctx, bx - 10, 155, 20, 8, 3);
        ctx.fill();
      });

    } else if (g.id === 'mines') {
      // 3D Isometric Diamond Grid (4x4)
      const tileSize = 20;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const isoX = cx + (col - row) * tileSize * 1.5;
          const isoY = cy - 20 + (col + row) * tileSize * 0.75;

          // Tile base
          ctx.save();
          ctx.fillStyle = (row === 1 && col === 1) ? '#10b98133' : '#1e293b';
          ctx.strokeStyle = (row === 1 && col === 1) ? '#10b981' : '#334155';
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(isoX, isoY - 10);
          ctx.lineTo(isoX + tileSize, isoY);
          ctx.lineTo(isoX, isoY + 10);
          ctx.lineTo(isoX - tileSize, isoY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }

      // Center revealed rotating 3D crystal diamond
      const rotDiamond = time * 2;
      ctx.save();
      ctx.translate(cx, cy - 2);
      ctx.rotate(rotDiamond);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💎', 0, 0);
      ctx.restore();

    } else {
      // Spire Tower Climb
      for (let step = 0; step < 5; step++) {
        const sy = 150 - step * 25;
        const sw = 100 - step * 14;
        ctx.strokeStyle = step === 3 ? '#ec4899' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, sy, sw, 10, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 14;
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡', cx, 150 - 3 * 25 - 12);
    }
  }

  /* =========================================================================
     8. 3D DERBY RACETRACK RENDERER (Horse Derby)
     ========================================================================= */

  function renderHorseDerby3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.003;
    ctx.clearRect(0, 0, cv.width, cv.height);

    // 3D Perspective Racetrack Grid
    const vanishY = 40;
    const laneLines = [-80, -25, 25, 80];

    laneLines.forEach(lx => {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, vanishY);
      ctx.lineTo(cx + lx * 1.8, cv.height);
      ctx.stroke();
    });

    // Rushing horizontal speed markers
    for (let i = 0; i < 6; i++) {
      const p = ((time * 2 + i * 0.16) % 1.0);
      const markerY = vanishY + Math.pow(p, 2) * (cv.height - vanishY);
      const markerW = p * 160;
      ctx.strokeStyle = `rgba(253, 224, 71, ${p * 0.5})`;
      ctx.lineWidth = p * 3;
      ctx.beginPath();
      ctx.moveTo(cx - markerW, markerY);
      ctx.lineTo(cx + markerW, markerY);
      ctx.stroke();
    }

    // 3 Galloping Mecha Horses
    const horses = [
      { laneX: -45, color: '#facc15', label: '#1', speed: 1.0 },
      { laneX: 0, color: '#00f2fe', label: '#2', speed: 1.2 },
      { laneX: 45, color: '#ec4899', label: '#3', speed: 0.9 }
    ];

    horses.forEach((h, idx) => {
      const gallop = Math.sin(time * 12 + idx * 2) * 5;
      const hx = cx + h.laneX;
      const hy = 115 + gallop;

      ctx.save();
      ctx.fillStyle = h.color;
      ctx.shadowColor = h.color;
      ctx.shadowBlur = 12;
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🐎', hx, hy);

      ctx.font = 'bold 10px "JetBrains Mono"';
      ctx.fillText(h.label, hx, hy + 18);
      ctx.restore();
    });
  }

  /* =========================================================================
     9. 3D HOLOGRAPHIC SCRATCH CARD RENDERER (Scratch & Win)
     ========================================================================= */

  function renderScratchCard3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.002;
    ctx.clearRect(0, 0, cv.width, cv.height);

    // 3D Tilted Card Body
    ctx.save();
    ctx.translate(cx, cy);

    const w = 210;
    const h = 130;
    drawRoundRect(ctx, -w / 2, -h / 2, w, h, 10);
    ctx.fillStyle = '#0f172a';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 18;
    ctx.fill();

    // Iridescent Rainbow Foil Sheen
    const sheenGrad = ctx.createLinearGradient(-w / 2 + Math.sin(time) * 40, -h / 2, w / 2, h / 2);
    sheenGrad.addColorStop(0, '#fde047');
    sheenGrad.addColorStop(0.3, '#ec4899');
    sheenGrad.addColorStop(0.7, '#38bdf8');
    sheenGrad.addColorStop(1, '#a855f7');
    ctx.strokeStyle = sheenGrad;
    ctx.lineWidth = 3;
    drawRoundRect(ctx, -w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 8);
    ctx.stroke();

    // 3 Scratch Reveal Windows
    const windows = [-60, 0, 60];
    const reveals = ['💰 $10K', '👑 777', '💎 WIN'];

    windows.forEach((wx, idx) => {
      // Scratched window background
      ctx.fillStyle = '#020617';
      drawRoundRect(ctx, wx - 24, -15, 48, 48, 6);
      ctx.fill();

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 10px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(reveals[idx], wx, 9);
    });

    // 3D Coin actively scratching middle window
    const coinScratchX = Math.sin(time * 6) * 12;
    const coinScratchY = Math.cos(time * 6) * 10;
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(coinScratchX, coinScratchY - 5, 12, 6, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* =========================================================================
     10. 3D KENO LOTTERY TUMBLER RENDERER (Keno Mega 80)
     ========================================================================= */

  function renderKeno3D(ctx, cv, g, t, st) {
    const cx = cv.width / 2;
    const cy = cv.height / 2;

    const time = t * 0.002;
    ctx.clearRect(0, 0, cv.width, cv.height);

    const R = 54;

    // Outer Brass Stand
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, R + 4, 0.3 * Math.PI, 0.7 * Math.PI, false);
    ctx.stroke();

    // Initialize 3D bouncy balls if needed
    if (!st.balls) {
      st.balls = [];
      const numColors = ['#f43f5e', '#38bdf8', '#facc15', '#a855f7', '#10b981'];
      for (let b = 0; b < 10; b++) {
        st.balls.push({
          x: (Math.random() - 0.5) * R * 0.8,
          y: (Math.random() - 0.5) * R * 0.8,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          num: Math.floor(Math.random() * 80) + 1,
          color: numColors[b % numColors.length]
        });
      }
    }

    // Transparent Glass Sphere Globe
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fill();

    // Swirling balls
    st.balls.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Spherical bounce
      const dist = Math.sqrt(ball.x * ball.x + ball.y * ball.y);
      if (dist > R - 8) {
        const nx = ball.x / dist;
        const ny = ball.y / dist;
        const dot = ball.vx * nx + ball.vy * ny;
        ball.vx -= 2 * dot * nx;
        ball.vy -= 2 * dot * ny;
      }

      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(cx + ball.x, cy + ball.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ball.num.toString(), cx + ball.x, cy + ball.y);
    });

    // Glass reflection highlights
    const glassGrad = ctx.createRadialGradient(cx - 20, cy - 20, 4, cx, cy, R);
    glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
    glassGrad.addColorStop(1, 'rgba(56, 189, 248, 0.2)');
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* =========================================================================
     MASTER THEME DISPATCHER
     ========================================================================= */

  function renderCardCanvas(t, cv, g) {
    const ctx = cv._ctx || (cv._ctx = cv.getContext('2d'));
    if (!ctx) return;
    const st = getState(g.id);

    const cat = g.category;
    const id = g.id;

    if (cat === 'cards') {
      renderCardGame3D(ctx, cv, g, t, st);
    } else if (id === 'roulette_euro' || id === 'roulette_us' || id === 'wheel') {
      renderRouletteWheel3D(ctx, cv, g, t, st);
    } else if (id === 'dice' || id === 'craps' || id === 'sicbo' || id === 'color_game') {
      renderDice3D(ctx, cv, g, t, st);
    } else if (id === 'coinflip') {
      renderCoinFlip3D(ctx, cv, g, t, st);
    } else if (cat === 'slots' || id.startsWith('slot_')) {
      renderSlotReels3D(ctx, cv, g, t, st);
    } else if (id === 'crash' || id === 'limbo') {
      renderRocketCrash3D(ctx, cv, g, t, st);
    } else if (id === 'plinko' || id === 'mines' || id === 'tower_climb') {
      renderPlinkoMinesSpire3D(ctx, cv, g, t, st);
    } else if (id === 'horse_derby') {
      renderHorseDerby3D(ctx, cv, g, t, st);
    } else if (id === 'scratch_gold') {
      renderScratchCard3D(ctx, cv, g, t, st);
    } else if (id === 'keno') {
      renderKeno3D(ctx, cv, g, t, st);
    } else {
      // Fallback: 3D Cards
      renderCardGame3D(ctx, cv, g, t, st);
    }
  }

  /* =========================================================================
     CENTRAL INTERSECTION OBSERVER & ANIMATION LOOP
     ========================================================================= */

  let lastMasterTick = 0;

  function setupObserver() {
    if (isObserverSetup) return;
    isObserverSetup = true;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const cv = entry.target;
          if (entry.isIntersecting) {
            activeCanvases.add(cv);
          } else {
            activeCanvases.delete(cv);
          }
        });
      }, {
        root: null,
        rootMargin: '20px 0px 20px 0px',
        threshold: 0.05
      });
    }
  }

  function masterLoop(t) {
    animFrameId = requestAnimationFrame(masterLoop);

    // Dynamic FPS throttling: hovered cards get full 60 FPS responsiveness,
    // while visible background cards tick at ~24 FPS to eliminate CPU/GPU lag
    const isThrottled = (t - lastMasterTick) < 40;
    if (isThrottled) {
      for (const cv of activeCanvases) {
        if (cv.dataset && cv.dataset.hover === '1') {
          const g = cardConfigs.get(cv.id);
          if (g) renderCardCanvas(t, cv, g);
        }
      }
      return;
    }
    lastMasterTick = t;

    // Only render active visible canvases
    for (const cv of activeCanvases) {
      const g = cardConfigs.get(cv.id);
      if (g) {
        renderCardCanvas(t, cv, g);
      }
    }
  }

  // Public API
  window.Arcade3D = {
    init: function () {
      setupObserver();
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(masterLoop);
      }
    },

    registerCard: function (cv, gameData) {
      if (!cv || !gameData) return;
      cardConfigs.set(cv.id, gameData);
      // Render single initial static frame immediately so card is never blank
      try {
        renderCardCanvas(0, cv, gameData);
      } catch (e) {}
      if (observer) {
        observer.observe(cv);
      }
    },

    isCanvasVisible: function (cv) {
      if (!cv) return false;
      return activeCanvases.has(cv);
    },

    observeCanvas: function (cv) {
      if (!cv) return;
      if (observer) {
        observer.observe(cv);
      }
    }
  };

  // Auto initialize on DOMContentLoaded if not already
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.Arcade3D.init());
  } else {
    window.Arcade3D.init();
  }

})();
