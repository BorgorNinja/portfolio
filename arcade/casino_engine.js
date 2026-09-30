/**
 * BORGOR ARCADIA & GRAND CASINO — HIGH-GRADE VEGAS ENGINE
 * High-performance, 60 FPS, Web Audio & Vector SVG powered gaming engine.
 * Calibrated to the visual and acoustic standard of Gates of Borgor.
 */
(function() {
  'use strict';

  /* =========================================================================
     1. VECTOR SVG SYMBOL LIBRARY (GATES OF BORGOR STANDARD)
     ========================================================================= */
  const SVGS = {
    seven: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <linearGradient id="gold7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff5c0"/>
          <stop offset="30%" stop-color="#f59e0b"/>
          <stop offset="70%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <path d="M18 16 L82 16 L82 32 L54 84 L34 84 L58 32 L18 32 Z" fill="url(#gold7)" stroke="#fef08a" stroke-width="3"/>
      <path d="M24 22 L76 22 L76 28 L56 72 L44 72 L62 28 L24 28 Z" fill="#ffffff" opacity="0.45"/>
      <polygon points="78,14 80,18 84,20 80,22 78,26 76,22 72,20 76,18" fill="#fff"/>
    </svg>`,

    bar: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="25%" stop-color="#94a3b8"/>
          <stop offset="75%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="50%" stop-color="#fef08a"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <rect x="10" y="24" width="80" height="52" rx="8" fill="url(#barGrad)" stroke="url(#goldPlate)" stroke-width="4"/>
      <rect x="14" y="28" width="72" height="44" rx="6" fill="#090d16" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      <text x="50" y="58" font-family="'Cinzel', sans-serif" font-size="22" font-weight="900" fill="url(#goldPlate)" text-anchor="middle" letter-spacing="3">BAR</text>
    </svg>`,

    bell: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="40%" stop-color="#f59e0b"/>
          <stop offset="85%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="18" rx="8" ry="5" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
      <path d="M50 18 C38 28, 22 55, 18 72 L82 72 C78 55, 62 28, 50 18 Z" fill="url(#bellGrad)" stroke="#fef08a" stroke-width="2.5"/>
      <ellipse cx="50" cy="74" rx="36" ry="7" fill="#b45309" stroke="#fef08a" stroke-width="2"/>
      <ellipse cx="50" cy="80" rx="9" ry="8" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
      <path d="M30 40 Q40 50 42 66" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
    </svg>`,

    diamond: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <linearGradient id="diaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0f2fe"/>
          <stop offset="35%" stop-color="#38bdf8"/>
          <stop offset="80%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#075985"/>
        </linearGradient>
      </defs>
      <polygon points="50,14 84,36 50,86 16,36" fill="url(#diaGrad)" stroke="#bae6fd" stroke-width="2.5"/>
      <polygon points="50,14 66,36 50,86 34,36" fill="#38bdf8" opacity="0.6" stroke="#bae6fd" stroke-width="1.5"/>
      <polygon points="34,36 50,14 66,36 50,44" fill="#e0f2fe" opacity="0.8"/>
      <line x1="16" y1="36" x2="84" y2="36" stroke="#bae6fd" stroke-width="1.5"/>
      <circle cx="50" cy="24" r="3" fill="#fff"/>
    </svg>`,

    crown: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <path d="M16 72 L84 72 L90 34 L68 52 L50 22 L32 52 L10 34 Z" fill="url(#crownGold)" stroke="#fef08a" stroke-width="2.5"/>
      <rect x="14" y="68" width="72" height="12" rx="3" fill="#b45309" stroke="#fef08a" stroke-width="2"/>
      <circle cx="10" cy="32" r="4" fill="#ef4444" stroke="#fef08a" stroke-width="1"/>
      <circle cx="50" cy="20" r="5" fill="#38bdf8" stroke="#fef08a" stroke-width="1.5"/>
      <circle cx="90" cy="32" r="4" fill="#ef4444" stroke="#fef08a" stroke-width="1"/>
    </svg>`,

    cherry: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <radialGradient id="cherryRed" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#f87171"/>
          <stop offset="40%" stop-color="#dc2626"/>
          <stop offset="85%" stop-color="#991b1b"/>
          <stop offset="100%" stop-color="#450a0a"/>
        </radialGradient>
      </defs>
      <path d="M36 46 Q46 16 66 18 Q62 26 44 48" fill="none" stroke="#65a30d" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 54 Q68 28 66 18" fill="none" stroke="#65a30d" stroke-width="3" stroke-linecap="round"/>
      <path d="M66 18 Q80 14 84 24 Q74 28 66 18 Z" fill="#84cc16" stroke="#4d7c0f" stroke-width="1"/>
      <circle cx="34" cy="62" r="20" fill="url(#cherryRed)" stroke="#fca5a5" stroke-width="1.5"/>
      <circle cx="66" cy="68" r="19" fill="url(#cherryRed)" stroke="#fca5a5" stroke-width="1.5"/>
      <ellipse cx="28" cy="54" rx="4" ry="2.5" fill="#fff" opacity="0.75" transform="rotate(-30 28 54)"/>
    </svg>`,

    scatter: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <radialGradient id="scGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="scBun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="40%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#9a3412"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#scGlow)"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke="#fef08a" stroke-width="2" stroke-dasharray="6,4"/>
      <path d="M22 42 C22 24, 78 24, 78 42 Z" fill="url(#scBun)" stroke="#fef08a" stroke-width="2"/>
      <ellipse cx="36" cy="33" rx="2" ry="1.2" fill="#fff"/>
      <ellipse cx="64" cy="33" rx="2" ry="1.2" fill="#fff"/>
      <rect x="18" y="46" width="64" height="10" rx="3" fill="#16a34a" stroke="#22c55e" stroke-width="1.5"/>
      <rect x="16" y="58" width="68" height="12" rx="4" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
      <path d="M22 72 C22 84, 78 84, 78 72 Z" fill="url(#scBun)" stroke="#fef08a" stroke-width="2"/>
    </svg>`,

    coin: `<svg viewBox="0 0 100 100" class="slot-svg-sym">
      <defs>
        <radialGradient id="goldCoin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="60%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#goldCoin)" stroke="#fef08a" stroke-width="3"/>
      <circle cx="50" cy="50" r="32" fill="none" stroke="#78350f" stroke-width="2"/>
      <rect x="40" y="40" width="20" height="20" rx="2" fill="#78350f" stroke="#fef08a" stroke-width="2"/>
      <circle cx="50" cy="20" r="2.5" fill="#fef08a"/>
      <circle cx="50" cy="80" r="2.5" fill="#fef08a"/>
    </svg>`
  };

  function getSymbolHTML(sym) {
    if (sym === '7️⃣' || sym === 'seven') return SVGS.seven;
    if (sym === 'BAR' || sym === 'bar') return SVGS.bar;
    if (sym === '🔔' || sym === 'bell') return SVGS.bell;
    if (sym === '💎' || sym === 'diamond') return SVGS.diamond;
    if (sym === '👑' || sym === 'crown') return SVGS.crown;
    if (sym === '🍒' || sym === 'cherry') return SVGS.cherry;
    if (sym === '🪙' || sym === 'coin') return SVGS.coin;
    if (sym === '🍔' || sym === 'scatter') return SVGS.scatter;

    // Fallback crisp badge with drop shadow for other thematic emoji
    return `<div style="font-size:2.2rem; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.6)); line-height:1;">${sym}</div>`;
  }

  /* =========================================================================
     2. WEB AUDIO PROCEDURAL SYNTHESIZER (GATES OF BORGOR AUDIO CORE)
     ========================================================================= */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('borgor_arcade_muted') === '1';
      this.masterGain = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);

          const comp = this.ctx.createDynamicsCompressor();
          comp.threshold.setValueAtTime(-12, this.ctx.currentTime);
          comp.knee.setValueAtTime(24, this.ctx.currentTime);
          comp.ratio.setValueAtTime(10, this.ctx.currentTime);
          comp.attack.setValueAtTime(0.003, this.ctx.currentTime);
          comp.release.setValueAtTime(0.25, this.ctx.currentTime);

          this.masterGain.connect(comp);
          comp.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    out() {
      return this.masterGain || (this.ctx ? this.ctx.destination : null);
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('borgor_arcade_muted', this.muted ? '1' : '0');
      return this.muted;
    }

    playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.15) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.out());
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    lever() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Mechanical lever thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.16);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.18);
    }

    spinTick() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(750 + Math.random() * 250, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.035);
    }

    reelStop(reelIdx = 0) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const baseFreq = 260 + (reelIdx * 65);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.14);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.15);

      // Clack metallic component
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = 'square';
      click.frequency.setValueAtTime(1400 + (reelIdx * 120), now);
      clickGain.gain.setValueAtTime(0.12, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      click.connect(clickGain);
      clickGain.connect(this.out());
      click.start(now);
      click.stop(now + 0.04);
    }

    fanfare(amount = 0) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.07));
        gain.gain.setValueAtTime(0.22, now + (idx * 0.07));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.07) + 0.35);
        osc.connect(gain);
        gain.connect(this.out());
        osc.start(now + (idx * 0.07));
        osc.stop(now + (idx * 0.07) + 0.35);
      });

      // Rapid coin shower clinks
      for (let c = 0; c < 8; c++) {
        setTimeout(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2200 + Math.random() * 1400, t);
          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
          osc.connect(gain);
          gain.connect(this.out());
          osc.start(t);
          osc.stop(t + 0.05);
        }, 120 + (c * 65));
      }
    }

    chip() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.04);
    }

    card() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.08);
    }

    win() { this.fanfare(); }
    bigWin() { this.fanfare(); }
    spin() { this.spinTick(); }

    lose() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.22);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.24);
    }

    click() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.025);
    }

    dice() {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.chip(), i * 40);
      }
    }

    rocket() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.35);
    }

    boom() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.35);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.out());
      osc.start(now);
      osc.stop(now + 0.38);
    }

    cashout() {
      this.fanfare();
    }
  }

  const sound = new SoundEngine();

  /* =========================================================================
     3. 60 FPS PARTICLE BURST & CELEBRATION ENGINE
     ========================================================================= */
  class CelebrationEngine {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animId = null;
    }

    init(container) {
      if (this.canvas) return;
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'theater-particle-canvas';
      container.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width || 800;
      this.canvas.height = rect.height || 600;
    }

    burst(type = 'win', count = 60) {
      if (!this.canvas) return;
      this.resize();
      const w = this.canvas.width;
      const h = this.canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 9;
        this.particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          gravity: 0.28,
          size: 5 + Math.random() * 7,
          color: ['#fde047', '#f59e0b', '#38bdf8', '#ffffff', '#a855f7'][Math.floor(Math.random() * 5)],
          isCoin: Math.random() > 0.4,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
          life: 1,
          decay: 0.015 + Math.random() * 0.015
        });
      }

      if (!this.animId) {
        this.loop();
      }
    }

    loop() {
      if (!this.ctx || !this.canvas) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.life -= p.decay;

        if (p.life <= 0 || p.y > this.canvas.height + 20) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.life);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);

        if (p.isCoin) {
          this.ctx.fillStyle = '#f59e0b';
          this.ctx.strokeStyle = '#fef08a';
          this.ctx.lineWidth = 1.5;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.stroke();
        } else {
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.loop());
      } else {
        this.animId = null;
      }
    }
  }

  const celebration = new CelebrationEngine();

  /* =========================================================================
     4. WALLET & BALANCE CONTROLLER
     ========================================================================= */
  class WalletManager {
    constructor() {
      this.balance = this.loadBalance();
      this.listeners = [];
    }

    loadBalance() {
      const saved = localStorage.getItem('borgor_slots_balance') || localStorage.getItem('jtrash_wallet_balance') || '25000';
      const num = parseInt(saved, 10);
      return isNaN(num) || num <= 0 ? 10000 : num;
    }

    saveBalance() {
      localStorage.setItem('borgor_slots_balance', this.balance);
      localStorage.setItem('jtrash_wallet_balance', this.balance);
      const slotHud = document.getElementById('hud-slot-bal');
      if (slotHud) slotHud.textContent = this.balance.toLocaleString();
      const walletHud = document.getElementById('hud-wallet-bal');
      if (walletHud) walletHud.textContent = this.balance.toLocaleString();
      this.listeners.forEach(cb => cb(this.balance));
    }

    subscribe(cb) { this.listeners.push(cb); }
    get() { return this.balance; }

    deduct(amt) {
      if (this.balance < amt) return false;
      this.balance -= amt;
      this.saveBalance();
      return true;
    }

    add(amt) {
      this.balance += amt;
      this.saveBalance();
    }

    claimAyuda() {
      this.add(2000);
      sound.win();
      return this.balance;
    }
  }

  const wallet = new WalletManager();

  /* =========================================================================
     5. DECK OF CARDS & CASINO FELT UTILITIES
     ========================================================================= */
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  function createDeck(numDecks = 1) {
    const deck = [];
    for (let d = 0; d < numDecks; d++) {
      for (const s of SUITS) {
        for (const r of RANKS) {
          deck.push({
            suit: s,
            rank: r,
            color: (s === '♥' || s === '♦') ? '#dc2626' : '#0f172a',
            val: getCardValue(r)
          });
        }
      }
    }
    return shuffle(deck);
  }

  function getCardValue(rank) {
    if (rank === 'A') return 11;
    if (['K', 'Q', 'J', '10'].includes(rank)) return 10;
    return parseInt(rank, 10);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderCardHTML(card, hidden = false) {
    if (hidden) {
      return `
        <div class="casino-card card-back">
          <div class="card-back-pattern">
            <svg viewBox="0 0 50 70" style="width:75%; height:75%;">
              <rect x="3" y="3" width="44" height="64" rx="4" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,2"/>
              <circle cx="25" cy="35" r="13" fill="#090d16" stroke="#fef08a" stroke-width="1.5"/>
              <text x="25" y="40" font-family="'Cinzel', serif" font-size="13" font-weight="900" fill="#fde047" text-anchor="middle">👑</text>
            </svg>
          </div>
        </div>
      `;
    }
    const isRoyal = ['J', 'Q', 'K'].includes(card.rank);
    const isAce = card.rank === 'A';
    return `
      <div class="casino-card ${isRoyal ? 'card-royal' : ''} ${isAce ? 'card-ace' : ''}" style="color: ${card.color};">
        <div class="card-corner top-left">
          <span>${card.rank}</span>
          <span class="suit-icon">${card.suit}</span>
        </div>
        <div class="card-center">
          ${isAce ? `<span style="font-size: 2.2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${card.suit}</span>` : `<span style="font-size: 1.5rem;">${card.suit}</span>`}
        </div>
        <div class="card-corner bottom-right">
          <span>${card.rank}</span>
          <span class="suit-icon">${card.suit}</span>
        </div>
      </div>
    `;
  }

  function buildBlackjack(gameDef, container) {
    let deck = createDeck(gameDef.id === 'single_deck_bj' ? 1 : 6);
    let bet = 100;
    let playerHand = [];
    let dealerHand = [];
    let inRound = false;

    function calcHand(hand) {
      let sum = 0;
      let aces = 0;
      for (const c of hand) {
        sum += c.val;
        if (c.rank === 'A') aces++;
      }
      while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
      }
      return sum;
    }

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>
          <div class="dealer-area">
            <div class="hand-label">DEALER <span id="dealer-total" class="hand-badge">--</span></div>
            <div class="cards-tray" id="dealer-cards"></div>
          </div>
          <div class="felt-center-banner" id="game-status-msg">Place your bet and click Deal to play</div>
          <div class="player-area">
            <div class="hand-label">YOU <span id="player-total" class="hand-badge">--</span></div>
            <div class="cards-tray" id="player-cards"></div>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-bet-half">1/2</button>
            <input type="number" id="input-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-bet-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-bet-max">MAX</button>
            <div class="chip-rack-selector">
              <button class="casino-chip-btn chip-10" id="chip-add-10" title="Add 10">10</button>
              <button class="casino-chip-btn chip-50" id="chip-add-50" title="Add 50">50</button>
              <button class="casino-chip-btn chip-100" id="chip-add-100" title="Add 100">100</button>
              <button class="casino-chip-btn chip-500" id="chip-add-500" title="Add 500">500</button>
            </div>
          </div>

          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-deal">DEAL</button>
            <button class="btn-action" id="btn-hit" disabled>HIT</button>
            <button class="btn-action" id="btn-stand" disabled>STAND</button>
            <button class="btn-action" id="btn-double" disabled>DOUBLE</button>
          </div>
        </div>
      </div>
    `;

    const elDealerCards = container.querySelector('#dealer-cards');
    const elPlayerCards = container.querySelector('#player-cards');
    const elDealerTotal = container.querySelector('#dealer-total');
    const elPlayerTotal = container.querySelector('#player-total');
    const elStatus = container.querySelector('#game-status-msg');
    const elBet = container.querySelector('#input-bet');
    const btnDeal = container.querySelector('#btn-deal');
    const btnHit = container.querySelector('#btn-hit');
    const btnStand = container.querySelector('#btn-stand');
    const btnDouble = container.querySelector('#btn-double');

    function updateBet(val) {
      bet = Math.max(10, Math.min(wallet.get(), Math.floor(val)));
      elBet.value = bet;
    }

    container.querySelector('#btn-bet-half').onclick = () => updateBet(bet / 2);
    container.querySelector('#btn-bet-double').onclick = () => updateBet(bet * 2);
    container.querySelector('#btn-bet-max').onclick = () => updateBet(wallet.get());
    container.querySelector('#chip-add-10').onclick = () => { updateBet(bet + 10); sound.chip(); };
    container.querySelector('#chip-add-50').onclick = () => { updateBet(bet + 50); sound.chip(); };
    container.querySelector('#chip-add-100').onclick = () => { updateBet(bet + 100); sound.chip(); };
    container.querySelector('#chip-add-500').onclick = () => { updateBet(bet + 500); sound.chip(); };
    elBet.onchange = (e) => updateBet(e.target.value);

    function startDeal() {
      updateBet(elBet.value);
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = '<span style="color:#ef4444">Insufficient coins! Claim Free Ayuda below.</span>';
        return;
      }
      sound.chip();
      deck = createDeck(gameDef.id === 'single_deck_bj' ? 1 : 6);
      playerHand = [deck.pop(), deck.pop()];
      dealerHand = [deck.pop(), deck.pop()];
      inRound = true;

      btnDeal.disabled = true;
      btnHit.disabled = false;
      btnStand.disabled = false;
      btnDouble.disabled = wallet.get() < bet;

      renderTable(true);
      sound.card();

      const pTot = calcHand(playerHand);
      if (pTot === 21) {
        standRound();
      }
    }

    function renderTable(dealerHole = true) {
      elPlayerCards.innerHTML = playerHand.map(c => renderCardHTML(c)).join('');
      elPlayerTotal.textContent = calcHand(playerHand);

      if (dealerHole) {
        elDealerCards.innerHTML = renderCardHTML(dealerHand[0]) + renderCardHTML(dealerHand[1], true);
        elDealerTotal.textContent = dealerHand[0].val;
      } else {
        elDealerCards.innerHTML = dealerHand.map(c => renderCardHTML(c)).join('');
        elDealerTotal.textContent = calcHand(dealerHand);
      }
    }

    function hit() {
      if (!inRound) return;
      playerHand.push(deck.pop());
      sound.card();
      btnDouble.disabled = true;
      renderTable(true);
      const pTot = calcHand(playerHand);
      if (pTot > 21) {
        endRound('bust');
      } else if (pTot === 21) {
        standRound();
      }
    }

    function doubleDown() {
      if (!inRound || wallet.get() < bet) return;
      wallet.deduct(bet);
      bet *= 2;
      elBet.value = bet;
      sound.chip();
      playerHand.push(deck.pop());
      sound.card();
      renderTable(true);
      if (calcHand(playerHand) > 21) {
        endRound('bust');
      } else {
        standRound();
      }
    }

    function standRound() {
      if (!inRound) return;
      inRound = false;
      btnHit.disabled = true;
      btnStand.disabled = true;
      btnDouble.disabled = true;

      // Dealer draws until 17
      renderTable(false);
      let dTot = calcHand(dealerHand);
      const dealerInterval = setInterval(() => {
        if (dTot < 17) {
          dealerHand.push(deck.pop());
          sound.card();
          renderTable(false);
          dTot = calcHand(dealerHand);
        } else {
          clearInterval(dealerInterval);
          evaluateWinner();
        }
      }, 450);
    }

    function evaluateWinner() {
      const pTot = calcHand(playerHand);
      const dTot = calcHand(dealerHand);

      if (pTot > 21) {
        endRound('bust');
      } else if (dTot > 21) {
        endRound('dealer_bust');
      } else if (pTot === 21 && playerHand.length === 2 && (dTot !== 21 || dealerHand.length > 2)) {
        endRound('blackjack');
      } else if (pTot > dTot) {
        endRound('player_win');
      } else if (pTot < dTot) {
        endRound('dealer_win');
      } else {
        endRound('push');
      }
    }

    function endRound(outcome) {
      inRound = false;
      renderTable(false);
      btnHit.disabled = true;
      btnStand.disabled = true;
      btnDouble.disabled = true;
      btnDeal.disabled = false;

      let winAmt = 0;
      if (outcome === 'blackjack') {
        winAmt = Math.floor(bet * 2.5);
        wallet.add(winAmt);
        sound.bigWin();
        celebration.burst('win', 90);
        window.CasinoEngine.showBanner('NATURAL BLACKJACK!', `+${winAmt.toLocaleString()} COINS`);
        elStatus.innerHTML = `<span style="color:#fde047; font-weight:800;">💥 NATURAL BLACKJACK! +${winAmt.toLocaleString()} COINS</span>`;
      } else if (outcome === 'player_win' || outcome === 'dealer_bust') {
        winAmt = bet * 2;
        wallet.add(winAmt);
        sound.win();
        celebration.burst('win', 60);
        const winTitle = outcome === 'dealer_bust' ? 'DEALER BUST!' : 'PLAYER WINS!';
        window.CasinoEngine.showBanner(winTitle, `+${winAmt.toLocaleString()} COINS`);
        elStatus.innerHTML = `<span style="color:#10b981; font-weight:800;">🎉 ${winTitle} +${winAmt.toLocaleString()} COINS</span>`;
      } else if (outcome === 'push') {
        wallet.add(bet);
        sound.click();
        elStatus.innerHTML = `<span style="color:#38bdf8">🤝 PUSH! Staked ${bet.toLocaleString()} returned.</span>`;
      } else {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">💀 DEALER WINS. Staked ${bet.toLocaleString()} lost.</span>`;
      }
    }

    btnDeal.onclick = startDeal;
    btnHit.onclick = hit;
    btnStand.onclick = standRound;
    btnDouble.onclick = doubleDown;
  }

  /* --- 4B: BACCARAT & DRAGON 7 BACCARAT --- */
  function buildBaccarat(gameDef, container) {
    let bet = 100;
    let betTarget = 'player'; // 'player', 'banker', 'tie', 'dragon7'
    let deck = createDeck(8);

    function calcBaccarat(hand) {
      let sum = 0;
      for (const c of hand) {
        sum += (['10', 'J', 'Q', 'K'].includes(c.rank)) ? 0 : (c.rank === 'A' ? 1 : parseInt(c.rank, 10));
      }
      return sum % 10;
    }

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>
          <div class="baccarat-grid">
            <div class="bacc-side">
              <div class="hand-label">PLAYER <span id="bacc-p-score" class="hand-badge">--</span></div>
              <div class="cards-tray" id="bacc-p-cards"></div>
            </div>
            <div class="bacc-side">
              <div class="hand-label">BANKER <span id="bacc-b-score" class="hand-badge">--</span></div>
              <div class="cards-tray" id="bacc-b-cards"></div>
            </div>
          </div>
          <div class="felt-center-banner" id="bacc-status-msg">Choose your bet spot and click Deal</div>
          <div class="baccarat-bet-spots">
            <button class="bacc-spot active" data-target="player">PLAYER (1:1)</button>
            <button class="bacc-spot" data-target="banker">BANKER (${gameDef.id === 'dragon_baccarat' ? '1:1' : '0.95:1'})</button>
            <button class="bacc-spot" data-target="tie">TIE (8:1)</button>
            ${gameDef.id === 'dragon_baccarat' ? '<button class="bacc-spot" data-target="dragon7">DRAGON 7 (40:1)</button>' : ''}
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-bacc-half">1/2</button>
            <input type="number" id="input-bacc-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-bacc-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-bacc-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-bacc-deal">DEAL SQUEEZE</button>
          </div>
        </div>
      </div>
    `;

    const elPCards = container.querySelector('#bacc-p-cards');
    const elBCards = container.querySelector('#bacc-b-cards');
    const elPScore = container.querySelector('#bacc-p-score');
    const elBScore = container.querySelector('#bacc-b-score');
    const elStatus = container.querySelector('#bacc-status-msg');
    const elBet = container.querySelector('#input-bacc-bet');
    const spots = container.querySelectorAll('.bacc-spot');

    spots.forEach(sp => {
      sp.onclick = () => {
        spots.forEach(s => s.classList.remove('active'));
        sp.classList.add('active');
        betTarget = sp.getAttribute('data-target');
        sound.click();
      };
    });

    container.querySelector('#btn-bacc-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-bacc-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-bacc-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    container.querySelector('#btn-bacc-deal').onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = '<span style="color:#ef4444">Insufficient coins!</span>';
        return;
      }
      sound.chip();
      deck = createDeck(8);
      const pHand = [deck.pop(), deck.pop()];
      const bHand = [deck.pop(), deck.pop()];

      elPCards.innerHTML = pHand.map(c => renderCardHTML(c)).join('');
      elBCards.innerHTML = bHand.map(c => renderCardHTML(c)).join('');
      sound.card();

      let pScore = calcBaccarat(pHand);
      let bScore = calcBaccarat(bHand);
      elPScore.textContent = pScore;
      elBScore.textContent = bScore;

      // Natural 8 or 9
      if (pScore >= 8 || bScore >= 8) {
        finishBaccarat(pHand, bHand, pScore, bScore);
        return;
      }

      // Third card rules
      let pThird = null;
      if (pScore <= 5) {
        pThird = deck.pop();
        pHand.push(pThird);
        pScore = calcBaccarat(pHand);
        elPCards.innerHTML = pHand.map(c => renderCardHTML(c)).join('');
        elPScore.textContent = pScore;
      }

      if (!pThird) {
        if (bScore <= 5) {
          bHand.push(deck.pop());
          bScore = calcBaccarat(bHand);
          elBCards.innerHTML = bHand.map(c => renderCardHTML(c)).join('');
          elBScore.textContent = bScore;
        }
      } else {
        const p3v = (['10', 'J', 'Q', 'K'].includes(pThird.rank)) ? 0 : (pThird.rank === 'A' ? 1 : parseInt(pThird.rank, 10));
        let bDraws = false;
        if (bScore <= 2) bDraws = true;
        else if (bScore === 3 && p3v !== 8) bDraws = true;
        else if (bScore === 4 && [2,3,4,5,6,7].includes(p3v)) bDraws = true;
        else if (bScore === 5 && [4,5,6,7].includes(p3v)) bDraws = true;
        else if (bScore === 6 && [6,7].includes(p3v)) bDraws = true;

        if (bDraws) {
          bHand.push(deck.pop());
          bScore = calcBaccarat(bHand);
          elBCards.innerHTML = bHand.map(c => renderCardHTML(c)).join('');
          elBScore.textContent = bScore;
        }
      }

      finishBaccarat(pHand, bHand, pScore, bScore);
    };

    function finishBaccarat(pHand, bHand, pScore, bScore) {
      let win = false;
      let payout = 0;
      let outcome = '';

      const isDragon7 = (gameDef.id === 'dragon_baccarat' && bHand.length === 3 && bScore === 7 && bScore > pScore);

      if (pScore > bScore) outcome = 'player';
      else if (bScore > pScore) outcome = 'banker';
      else outcome = 'tie';

      if (betTarget === 'dragon7') {
        if (isDragon7) { win = true; payout = bet * 41; }
      } else if (betTarget === outcome) {
        win = true;
        if (outcome === 'player') payout = bet * 2;
        else if (outcome === 'banker') {
          if (gameDef.id === 'dragon_baccarat') {
            payout = (bScore === 6) ? Math.floor(bet * 1.5) : bet * 2;
          } else {
            payout = Math.floor(bet * 1.95);
          }
        } else if (outcome === 'tie') {
          payout = bet * 9;
        }
      } else if (outcome === 'tie' && (betTarget === 'player' || betTarget === 'banker')) {
        payout = bet; // Push
      }

      if (win) {
        wallet.add(payout);
        sound.win();
        celebration.burst('win', 70);
        const bannerTitle = isDragon7 ? '🐉 DRAGON 7 40:1 WIN!' : `${outcome.toUpperCase()} WINS!`;
        window.CasinoEngine.showBanner(bannerTitle, `+${payout.toLocaleString()} COINS`);
        elStatus.innerHTML = `<span style="color:#10b981; font-weight:800;">🎉 ${bannerTitle} +${payout.toLocaleString()} COINS</span>`;
      } else if (payout === bet) {
        wallet.add(payout);
        sound.click();
        elStatus.innerHTML = `<span style="color:#38bdf8">🤝 TIE PUSH! Staked ${bet.toLocaleString()} returned.</span>`;
      } else {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">💀 ${outcome.toUpperCase()} WINS. Stake lost.</span>`;
      }
    }
  }

  /* --- 4C: AVIATOR / CRASH ROCKET --- */
  function buildCrash(gameDef, container) {
    let bet = 100;
    let running = false;
    let multiplier = 1.00;
    let crashPoint = 1.00;
    let animId = null;
    let startTime = 0;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="crash-canvas-wrapper">
          <canvas id="crash-canvas" width="600" height="340"></canvas>
          <div class="crash-center-hud">
            <div class="crash-mult-text" id="crash-mult">1.00x</div>
            <div class="crash-sub-text" id="crash-status">READY FOR TAKEOFF</div>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-crash-half">1/2</button>
            <input type="number" id="input-crash-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-crash-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-crash-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-crash-main">LAUNCH ROCKET 🚀</button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#crash-canvas');
    const ctx = canvas.getContext('2d');
    const elMult = container.querySelector('#crash-mult');
    const elStatus = container.querySelector('#crash-status');
    const elBet = container.querySelector('#input-crash-bet');
    const btnMain = container.querySelector('#btn-crash-main');

    container.querySelector('#btn-crash-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-crash-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-crash-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    function drawRocket(progress, mult, crashed = false) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Trajectory curve
      const p = Math.min(1, progress);
      const endX = 40 + p * (canvas.width - 90);
      const endY = canvas.height - 40 - Math.pow(p, 1.8) * (canvas.height - 100);

      ctx.beginPath();
      ctx.moveTo(40, canvas.height - 40);
      ctx.quadraticCurveTo(endX * 0.4, canvas.height - 30, endX, endY);
      ctx.strokeStyle = crashed ? '#ef4444' : '#10b981';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Glowing Rocket head or explosion
      if (!crashed) {
        ctx.font = '28px sans-serif';
        ctx.fillText('🚀', endX - 10, endY + 10);
      } else {
        ctx.font = '32px sans-serif';
        ctx.fillText('💥', endX - 14, endY + 14);
      }
    }

    drawRocket(0, 1.00);

    function startFlight() {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.textContent = 'Insufficient coins!';
        return;
      }
      sound.chip();
      sound.rocket();

      // Provably Fair Crash Distribution (97% RTP)
      const r = Math.random();
      if (r < 0.04) {
        crashPoint = 1.00; // Instant 4% house edge crash
      } else {
        crashPoint = Math.max(1.01, parseFloat((0.97 / (1.0 - r)).toFixed(2)));
      }

      running = true;
      multiplier = 1.00;
      startTime = performance.now();

      btnMain.textContent = `CASHOUT (1.00x)`;
      btnMain.classList.add('btn-cashout-active');
      elStatus.textContent = 'ASCENDING...';
      elStatus.style.color = '#38bdf8';

      function loop(t) {
        if (!running) return;
        const elapsed = (t - startTime) / 1000;
        multiplier = 1.00 + Math.pow(elapsed * 0.7, 1.9);

        if (multiplier >= crashPoint) {
          // Crash!
          running = false;
          multiplier = crashPoint;
          elMult.textContent = `${crashPoint.toFixed(2)}x`;
          elMult.style.color = '#ef4444';
          elStatus.textContent = `CRASHED @ ${crashPoint.toFixed(2)}x`;
          elStatus.style.color = '#ef4444';
          btnMain.textContent = 'LAUNCH ROCKET 🚀';
          btnMain.classList.remove('btn-cashout-active');
          sound.boom();
          drawRocket(1, crashPoint, true);
          return;
        }

        elMult.textContent = `${multiplier.toFixed(2)}x`;
        elMult.style.color = '#10b981';
        btnMain.textContent = `CASHOUT +${Math.floor(bet * multiplier).toLocaleString()} (${multiplier.toFixed(2)}x)`;
        drawRocket(Math.min(1, elapsed / 8), multiplier, false);
        animId = requestAnimationFrame(loop);
      }

      animId = requestAnimationFrame(loop);
    }

    function cashout() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animId);
      const won = Math.floor(bet * multiplier);
      wallet.add(won);
      sound.cashout();

      elStatus.textContent = `WON +${won.toLocaleString()} COINS @ ${multiplier.toFixed(2)}x!`;
      elStatus.style.color = '#fde047';
      btnMain.textContent = 'LAUNCH ROCKET 🚀';
      btnMain.classList.remove('btn-cashout-active');
    }

    btnMain.onclick = () => {
      if (running) cashout();
      else startFlight();
    };
  }

  /* --- 4D: DIAMOND MINESWEEPER --- */
  function buildMines(gameDef, container) {
    let bet = 100;
    let mineCount = 3;
    let grid = []; // 25 items: 'gem' or 'mine'
    let revealed = [];
    let inRound = false;
    let currentMult = 1.00;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="mines-main-area">
          <div class="mines-header-hud">
            <div>MINES: <span style="color:#ef4444; font-weight:800;" id="hud-mine-count">3</span></div>
            <div>NEXT: <span style="color:#38bdf8; font-weight:800;" id="hud-next-mult">1.18x</span></div>
            <div>POT: <span style="color:#fde047; font-weight:800;" id="hud-cur-pot">0 COINS</span></div>
          </div>
          <div class="mines-grid-5x5" id="mines-grid"></div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <input type="number" id="input-mines-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <span class="bet-label" style="margin-left:8px;">MINES</span>
            <select id="select-mine-count" class="theater-select">
              ${[1, 2, 3, 5, 10, 15, 20, 24].map(m => `<option value="${m}" ${m === 3 ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-mines-main">START GAME</button>
          </div>
        </div>
      </div>
    `;

    const elGrid = container.querySelector('#mines-grid');
    const elPot = container.querySelector('#hud-cur-pot');
    const elNext = container.querySelector('#hud-next-mult');
    const elMineCount = container.querySelector('#hud-mine-count');
    const selMines = container.querySelector('#select-mine-count');
    const btnMain = container.querySelector('#btn-mines-main');
    const elBet = container.querySelector('#input-mines-bet');

    selMines.onchange = () => {
      mineCount = parseInt(selMines.value, 10);
      elMineCount.textContent = mineCount;
      calcNextMult();
    };

    function calcNextMult() {
      const gemsFound = revealed.length;
      let mult = 1.0;
      for (let i = 0; i < gemsFound + 1; i++) {
        mult *= (25 - i) / (25 - mineCount - i);
      }
      mult = mult * 0.98; // House edge 2%
      elNext.textContent = `${mult.toFixed(2)}x`;
      return mult;
    }

    function renderEmptyGrid() {
      elGrid.innerHTML = '';
      for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.className = 'mine-tile';
        tile.textContent = '❓';
        tile.onclick = () => stepTile(i);
        elGrid.appendChild(tile);
      }
    }
    renderEmptyGrid();

    function startGame() {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        alert('Insufficient coins!');
        return;
      }
      sound.chip();
      mineCount = parseInt(selMines.value, 10);
      grid = Array(25).fill('gem');
      let placed = 0;
      while (placed < mineCount) {
        const idx = Math.floor(Math.random() * 25);
        if (grid[idx] !== 'mine') {
          grid[idx] = 'mine';
          placed++;
        }
      }

      revealed = [];
      inRound = true;
      currentMult = 1.00;
      elPot.textContent = `${bet.toLocaleString()} COINS (1.00x)`;
      btnMain.textContent = 'CASHOUT';
      btnMain.classList.add('btn-cashout-active');
      renderEmptyGrid();
      calcNextMult();
    }

    function stepTile(idx) {
      if (!inRound || revealed.includes(idx)) return;
      revealed.push(idx);
      const tiles = elGrid.querySelectorAll('.mine-tile');
      const tile = tiles[idx];

      if (grid[idx] === 'mine') {
        // Boom!
        inRound = false;
        tile.className = 'mine-tile mine-bust';
        tile.textContent = '💣';
        sound.boom();
        // Reveal all mines
        grid.forEach((type, i) => {
          if (type === 'mine') {
            tiles[i].className = 'mine-tile mine-bust';
            tiles[i].textContent = '💣';
          }
        });
        elPot.textContent = 'BUSTED! 0 COINS';
        btnMain.textContent = 'START GAME';
        btnMain.classList.remove('btn-cashout-active');
      } else {
        // Gem found!
        tile.className = 'mine-tile gem-found';
        tile.textContent = '💎';
        sound.playTone(800 + revealed.length * 60, 'sine', 0.1, 0.15);

        // Update multiplier
        let mult = 1.0;
        for (let i = 0; i < revealed.length; i++) {
          mult *= (25 - i) / (25 - mineCount - i);
        }
        currentMult = mult * 0.98;
        const curWin = Math.floor(bet * currentMult);
        elPot.textContent = `${curWin.toLocaleString()} COINS (${currentMult.toFixed(2)}x)`;
        calcNextMult();

        if (revealed.length === 25 - mineCount) {
          cashout(); // Clean sweep!
        }
      }
    }

    function cashout() {
      if (!inRound) return;
      inRound = false;
      const won = Math.floor(bet * currentMult);
      wallet.add(won);
      sound.win();
      btnMain.textContent = 'START GAME';
      btnMain.classList.remove('btn-cashout-active');
      elPot.textContent = `WON +${won.toLocaleString()} COINS!`;
    }

    btnMain.onclick = () => {
      if (inRound) cashout();
      else startGame();
    };
  }

  /* --- 4E: PLINKO CYBER DROP --- */
  function buildPlinko(gameDef, container) {
    let bet = 100;
    let rows = 12;
    const multipliers = [33, 14, 4, 1.7, 0.7, 0.4, 0.2, 0.4, 0.7, 1.7, 4, 14, 33];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="plinko-wrapper">
          <canvas id="plinko-canvas" width="540" height="380"></canvas>
          <div class="plinko-buckets" id="plinko-buckets">
            ${multipliers.map(m => `<div class="p-bucket" style="background:${m >= 1 ? '#10b981' : '#f59e0b'}">${m}x</div>`).join('')}
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <input type="number" id="input-plinko-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-drop-ball">DROP ORB 🟢</button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#plinko-canvas');
    const ctx = canvas.getContext('2d');
    const btnDrop = container.querySelector('#btn-drop-ball');
    const elBet = container.querySelector('#input-plinko-bet');

    const pegs = [];
    const startY = 40;
    const spacingY = (canvas.height - 80) / rows;
    for (let r = 0; r < rows; r++) {
      const count = r + 3;
      const spacingX = canvas.width / (count + 1);
      for (let c = 0; c < count; c++) {
        pegs.push({ x: spacingX * (c + 1), y: startY + r * spacingY, radius: 4 });
      }
    }

    function drawScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw pegs
      pegs.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
    drawScene();

    btnDrop.onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        alert('Insufficient coins!');
        return;
      }
      sound.chip();

      let bx = canvas.width / 2 + (Math.random() - 0.5) * 6;
      let by = 15;
      let vx = 0;
      let vy = 2;

      function anim() {
        vy += 0.35; // Gravity
        by += vy;
        bx += vx;
        vx *= 0.98;

        // Peg collisions
        pegs.forEach(p => {
          const dx = bx - p.x;
          const dy = by - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 11) {
            sound.playTone(1200 + Math.random() * 400, 'sine', 0.03, 0.08);
            const angle = Math.atan2(dy, dx);
            vx = Math.cos(angle) * 3 + (Math.random() - 0.5) * 2;
            vy = Math.abs(Math.sin(angle) * 3);
          }
        });

        drawScene();

        // Draw falling orb
        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (by < canvas.height - 15) {
          requestAnimationFrame(anim);
        } else {
          // Landed in bucket
          const bucketW = canvas.width / multipliers.length;
          const bIdx = Math.max(0, Math.min(multipliers.length - 1, Math.floor(bx / bucketW)));
          const mult = multipliers[bIdx];
          const won = Math.floor(bet * mult);
          wallet.add(won);
          if (mult >= 1) sound.win();
          else sound.lose();
          drawScene();
        }
      }

      requestAnimationFrame(anim);
    };
  }

  /* --- 4F: PERYA COLOR GAME --- */
  function buildColorGame(gameDef, container) {
    let bet = 100;
    const colors = [
      { id: 'red', name: 'Red', hex: '#ef4444' },
      { id: 'yellow', name: 'Yellow', hex: '#facc15' },
      { id: 'blue', name: 'Blue', hex: '#3b82f6' },
      { id: 'green', name: 'Green', hex: '#10b981' },
      { id: 'white', name: 'White', hex: '#f8fafc' },
      { id: 'pink', name: 'Pink', hex: '#ec4899' }
    ];
    let bets = { red: 0, yellow: 0, blue: 0, green: 0, white: 0, pink: 0 };

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="color-game-board">
          <div class="perya-cubes-tray" id="cubes-tray">
            <div class="perya-cube" style="background:#ef4444">🎲</div>
            <div class="perya-cube" style="background:#facc15">🎲</div>
            <div class="perya-cube" style="background:#3b82f6">🎲</div>
          </div>
          <div class="felt-center-banner" id="color-status">Place chips on the colors and click Drop Cubes</div>
          <div class="color-bet-grid">
            ${colors.map(c => `
              <div class="color-card-spot" data-color="${c.id}" style="border-color:${c.hex}">
                <div class="color-swatch" style="background:${c.hex}"></div>
                <div class="color-title">${c.name}</div>
                <div class="color-staked" id="stake-${c.id}">0</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">CHIP</span>
            <button class="btn-ctrl-sub active" data-chip="50">50</button>
            <button class="btn-ctrl-sub" data-chip="100">100</button>
            <button class="btn-ctrl-sub" data-chip="500">500</button>
            <button class="btn-ctrl-sub" id="btn-clear-colors">CLEAR</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-drop-cubes">DROP CUBES 🎪</button>
          </div>
        </div>
      </div>
    `;

    let activeChip = 50;
    const chips = container.querySelectorAll('[data-chip]');
    chips.forEach(c => {
      c.onclick = () => {
        chips.forEach(ch => ch.classList.remove('active'));
        c.classList.add('active');
        activeChip = parseInt(c.getAttribute('data-chip'), 10);
        sound.click();
      };
    });

    const spots = container.querySelectorAll('.color-card-spot');
    spots.forEach(sp => {
      sp.onclick = () => {
        const col = sp.getAttribute('data-color');
        if (wallet.deduct(activeChip)) {
          bets[col] += activeChip;
          container.querySelector(`#stake-${col}`).textContent = bets[col].toLocaleString();
          sound.chip();
        } else {
          sound.lose();
        }
      };
    });

    container.querySelector('#btn-clear-colors').onclick = () => {
      let refunded = 0;
      Object.keys(bets).forEach(k => {
        refunded += bets[k];
        bets[k] = 0;
        container.querySelector(`#stake-${k}`).textContent = '0';
      });
      wallet.add(refunded);
      sound.click();
    };

    container.querySelector('#btn-drop-cubes').onclick = () => {
      const totalStaked = Object.values(bets).reduce((a, b) => a + b, 0);
      if (totalStaked <= 0) {
        alert('Place at least one chip on a color first!');
        return;
      }
      sound.dice();
      const tray = container.querySelector('#cubes-tray');
      tray.classList.add('shaking');

      setTimeout(() => {
        tray.classList.remove('shaking');
        const roll1 = colors[Math.floor(Math.random() * 6)];
        const roll2 = colors[Math.floor(Math.random() * 6)];
        const roll3 = colors[Math.floor(Math.random() * 6)];

        tray.innerHTML = `
          <div class="perya-cube" style="background:${roll1.hex}"></div>
          <div class="perya-cube" style="background:${roll2.hex}"></div>
          <div class="perya-cube" style="background:${roll3.hex}"></div>
        `;

        const counts = {};
        [roll1.id, roll2.id, roll3.id].forEach(id => counts[id] = (counts[id] || 0) + 1);

        let won = 0;
        Object.keys(bets).forEach(id => {
          if (counts[id] && bets[id] > 0) {
            // 1 match = stake returned + 1x. 2 matches = stake + 2x. 3 matches = stake + 3x.
            won += bets[id] * (1 + counts[id]);
          }
        });

        // Reset stakes
        Object.keys(bets).forEach(k => {
          bets[k] = 0;
          container.querySelector(`#stake-${k}`).textContent = '0';
        });

        const status = container.querySelector('#color-status');
        if (won > 0) {
          wallet.add(won);
          sound.win();
          status.innerHTML = `<span style="color:#10b981">🎉 COLOR WIN! +${won.toLocaleString()} COINS</span>`;
        } else {
          sound.lose();
          status.innerHTML = `<span style="color:#ef4444">💀 NO MATCHES. Better luck next roll!</span>`;
        }
      }, 700);
    };
  }



  /* =========================================================================
     4G: HIGH-GRADE VEGAS SLOT ENGINE (GATES OF BORGOR QUALITY STANDARD)
     ========================================================================= */
  function buildGenericSlot(gameDef, container) {
    let bet = 100;
    const is3Reel = gameDef.id === 'slot_vegas777';
    const numReels = is3Reel ? 3 : 5;
    const numRows = 3;

    const symbolsMap = {
      slot_vegas777: ['cherry', 'bell', 'bar', 'seven', 'diamond'],
      slot_fruit_fiesta: ['🍉', '🍇', 'cherry', 'bell', 'seven'],
      slot_dragon_hold: ['coin', 'bell', 'crown', 'diamond', 'seven'],
      slot_buffalo: ['🦬', '🦅', 'bell', 'diamond', 'seven'],
      slot_book_dead: ['📖', '⚱️', 'crown', 'diamond', 'seven'],
      slot_money_cart: ['🚂', '💣', 'bar', 'coin', 'seven'],
      slot_mahjong: ['🀄', '🀅', 'coin', 'diamond', 'seven'],
      slot_perya_fruit: ['🍉', 'cherry', 'bell', 'bar', 'seven'],
      slot_neon_reels: ['⚡', 'diamond', 'bar', 'seven', 'crown'],
      slot_aztec_gold: ['coin', 'crown', 'diamond', 'bell', 'seven']
    };

    const symbols = symbolsMap[gameDef.id] || ['cherry', 'bell', 'bar', 'seven', 'diamond'];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="slot-cabinet-frame">
          <div class="table-badge" style="background: rgba(245, 176, 65, 0.2); border-color: #f5b041; color: #fef08a;">
            ${gameDef.title.toUpperCase()} • ${gameDef.badge}
          </div>
          <div class="slot-reels-stage" id="slot-stage" style="grid-template-columns: repeat(${numReels}, 1fr)">
            ${Array.from({ length: numReels }, (_, r) => `
              <div class="slot-reel-strip" id="reel-${r}">
                ${Array.from({ length: numRows }, () => `<div class="slot-symbol-box">${getSymbolHTML(symbols[0])}</div>`).join('')}
              </div>
            `).join('')}
          </div>
          <div class="felt-center-banner" id="slot-banner">Pull the lever to win up to ${gameDef.maxWin}!</div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-slot-half">1/2</button>
            <input type="number" id="input-slot-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-slot-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-slot-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-slot-spin" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #fde047; box-shadow: 0 0 20px rgba(245, 176, 65, 0.4);">
              SPIN REELS 🎰
            </button>
          </div>
        </div>
      </div>
    `;

    const btnSpin = container.querySelector('#btn-slot-spin');
    const elBet = container.querySelector('#input-slot-bet');
    const elBanner = container.querySelector('#slot-banner');

    container.querySelector('#btn-slot-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-slot-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-slot-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    let spinning = false;
    btnSpin.onclick = () => {
      if (spinning) return;
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        alert('Insufficient coins!');
        return;
      }

      sound.lever();
      spinning = true;
      btnSpin.disabled = true;
      elBanner.innerHTML = `<span style="color:#fde047">SPINNING REELS...</span>`;

      // Clear any past glowing symbols
      container.querySelectorAll('.winning-symbol-glow').forEach(el => el.classList.remove('winning-symbol-glow'));

      // Pre-determine final grid
      const finalGrid = [];
      for (let r = 0; r < numReels; r++) {
        const col = [];
        for (let row = 0; row < numRows; row++) {
          col.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }
        finalGrid.push(col);
      }

      // Add spinning blur class to all reels
      for (let r = 0; r < numReels; r++) {
        const reel = container.querySelector(`#reel-${r}`);
        reel.classList.remove('reel-bounce-stop');
        reel.classList.add('reel-spinning');
      }

      // Fast tick animation loop
      const tickTimer = setInterval(() => {
        sound.spinTick();
        for (let r = 0; r < numReels; r++) {
          const reel = container.querySelector(`#reel-${r}`);
          if (reel.classList.contains('reel-spinning')) {
            reel.innerHTML = Array.from({ length: numRows }, () => {
              const sym = symbols[Math.floor(Math.random() * symbols.length)];
              return `<div class="slot-symbol-box">${getSymbolHTML(sym)}</div>`;
            }).join('');
          }
        }
      }, 70);

      // Staggered stop schedule: 600ms, 800ms, 1000ms, etc.
      for (let r = 0; r < numReels; r++) {
        const stopDelay = 550 + (r * 180);
        setTimeout(() => {
          const reel = container.querySelector(`#reel-${r}`);
          reel.classList.remove('reel-spinning');
          reel.classList.add('reel-bounce-stop');
          sound.reelStop(r);

          // Populate reel with final symbols
          reel.innerHTML = finalGrid[r].map((sym, rowIdx) => {
            return `<div class="slot-symbol-box" id="sym-${r}-${rowIdx}">${getSymbolHTML(sym)}</div>`;
          }).join('');

          // If last reel has stopped, finalize evaluation
          if (r === numReels - 1) {
            clearInterval(tickTimer);
            finalizeEvaluation(finalGrid);
          }
        }, stopDelay);
      }

      function finalizeEvaluation(grid) {
        spinning = false;
        btnSpin.disabled = false;

        // Check middle payline (row 1)
        const midRow = grid.map(col => col[1]);
        const first = midRow[0];
        let matches = 1;
        for (let i = 1; i < midRow.length; i++) {
          if (midRow[i] === first) matches++;
          else break;
        }

        let won = 0;
        let isWin = false;

        if (is3Reel && matches === 3) {
          isWin = true;
          const mult = first === 'seven' ? 100 : (first === 'bar' ? 40 : 15);
          won = bet * mult;
        } else if (!is3Reel && matches >= 3) {
          isWin = true;
          const mult = matches === 5 ? 50 : (matches === 4 ? 12 : 3);
          won = bet * mult;
        }

        if (isWin && won > 0) {
          wallet.add(won);
          sound.fanfare(won);
          celebration.burst('win', 70);

          // Highlight winning symbols
          for (let i = 0; i < matches; i++) {
            const symEl = container.querySelector(`#sym-${i}-1`);
            if (symEl) symEl.classList.add('winning-symbol-glow');
          }

          const tier = won >= bet * 25 ? 'SENSATIONAL!' : (won >= bet * 10 ? 'MEGA WIN!' : 'BIG WIN!');
          elBanner.innerHTML = `<span style="color:#fde047; font-weight:800;">🎉 ${tier} +${won.toLocaleString()} COINS (${matches}x MATCH)</span>`;
          window.CasinoEngine.showBanner(tier, `+${won.toLocaleString()} COINS`);
        } else {
          sound.lose();
          elBanner.innerHTML = `<span style="color:#94a3b8">No match. Pull again for the jackpot!</span>`;
        }
      }
    };
  }

  /* =========================================================================
     5. UNIVERSAL THEATER MODAL CONTROLLER
     ========================================================================= */
  class UniversalTheater {
    constructor() {
      this.activeGame = null;
      this.modal = null;
      this.setupDOM();
    }

    setupDOM() {
      if (document.getElementById('universal-game-theater')) return;
      const shell = document.createElement('div');
      shell.id = 'universal-game-theater';
      shell.className = 'theater-backdrop';
      shell.style.display = 'none';
      shell.innerHTML = `
        <div class="theater-box">
          <div class="win-celebration-banner" id="th-celebration-banner">
            <div class="win-celebration-title" id="th-celebration-title">BIG WIN!</div>
            <div class="win-celebration-amount" id="th-celebration-amount">+5,000 COINS</div>
          </div>
          <div class="theater-head">
            <div class="theater-brand">
              <span class="theater-game-icon" id="th-game-icon">🎰</span>
              <div>
                <div class="theater-game-title" id="th-game-title">Game Title</div>
                <div class="theater-game-genre" id="th-game-genre">Genre • 99% RTP</div>
              </div>
            </div>
            <div class="theater-hud-right">
              <div class="theater-balance-pill">
                <span>💰</span>
                <span id="th-balance-val">0</span>
              </div>
              <button class="theater-btn-icon" id="th-btn-ayuda" title="Claim 2,000 Free Coins">🎁 Ayuda</button>
              <button class="theater-btn-icon" id="th-btn-mute" title="Toggle Sound">🔊</button>
              <button class="theater-btn-icon close" id="th-btn-close">✕</button>
            </div>
          </div>
          <div class="theater-body" id="theater-viewport"></div>
        </div>
      `;
      document.body.appendChild(shell);
      this.modal = shell;

      celebration.init(shell.querySelector('.theater-box'));

      // Event handlers
      shell.querySelector('#th-btn-close').onclick = () => this.close();
      shell.querySelector('#th-btn-mute').onclick = (e) => {
        const isMuted = sound.toggleMute();
        e.target.textContent = isMuted ? '🔇' : '🔊';
      };
      shell.querySelector('#th-btn-ayuda').onclick = () => {
        wallet.claimAyuda();
      };

      wallet.subscribe((bal) => {
        const el = document.getElementById('th-balance-val');
        if (el) el.textContent = bal.toLocaleString();
      });
    }

    showCelebration(title, subtitle) {
      const banner = document.getElementById('th-celebration-banner');
      const t = document.getElementById('th-celebration-title');
      const s = document.getElementById('th-celebration-amount');
      if (!banner || !t || !s) return;

      t.textContent = title;
      s.textContent = subtitle;
      banner.classList.add('active');

      setTimeout(() => {
        banner.classList.remove('active');
      }, 2600);
    }

    open(gameId) {
      if (typeof ARCADE_GAMES === 'undefined') return;
      const gameDef = ARCADE_GAMES.find(g => g.id === gameId);
      if (!gameDef) return;

      if (gameDef.directUrl) {
        window.location.href = gameDef.directUrl;
        return;
      }

      this.activeGame = gameDef;
      this.setupDOM();

      document.getElementById('th-game-icon').textContent = gameDef.icon;
      document.getElementById('th-game-title').textContent = gameDef.title;
      document.getElementById('th-game-genre').textContent = `${gameDef.genre} • RTP: ${gameDef.rtp} • Max Win: ${gameDef.maxWin}`;
      document.getElementById('th-balance-val').textContent = wallet.get().toLocaleString();

      const viewport = document.getElementById('theater-viewport');
      viewport.innerHTML = '';

      if (['blackjack', 'single_deck_bj', 'pontoon', 'spanish21'].includes(gameDef.id)) {
        buildBlackjack(gameDef, viewport);
      } else if (['baccarat', 'dragon_baccarat'].includes(gameDef.id)) {
        buildBaccarat(gameDef, viewport);
      } else if (gameDef.id === 'crash') {
        buildCrash(gameDef, viewport);
      } else if (gameDef.id === 'mines') {
        buildMines(gameDef, viewport);
      } else if (gameDef.id === 'plinko') {
        buildPlinko(gameDef, viewport);
      } else if (gameDef.id === 'color_game') {
        buildColorGame(gameDef, viewport);
      } else if (gameDef.id.startsWith('slot_') || gameDef.category === 'slots') {
        buildGenericSlot(gameDef, viewport);
      } else {
        buildBlackjack(gameDef, viewport);
      }

      this.modal.style.display = 'flex';
      sound.click();
    }

    close() {
      if (this.modal) this.modal.style.display = 'none';
      const viewport = document.getElementById('theater-viewport');
      if (viewport) viewport.innerHTML = '';
      this.activeGame = null;
    }
  }

  window.CasinoEngine = {
    sound,
    wallet,
    theater: new UniversalTheater(),
    openGame(id) { this.theater.open(id); },
    closeGame() { this.theater.close(); },
    showBanner(title, sub) { this.theater.showCelebration(title, sub); }
  };

})();
