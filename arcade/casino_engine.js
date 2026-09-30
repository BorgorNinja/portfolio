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
    deal() { this.card(); }

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

    getAyudaCooldownRemaining() {
      const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour cooldown
      const last = parseInt(localStorage.getItem('arcade_last_ayuda_timestamp') || localStorage.getItem('jtrash_last_ayuda_timestamp') || '0', 10);
      const elapsed = Date.now() - last;
      return Math.max(0, COOLDOWN_MS - elapsed);
    }

    claimAyuda() {
      const rem = this.getAyudaCooldownRemaining();
      if (rem > 0) {
        return { success: false, remainingMs: rem, balance: this.balance };
      }
      const now = Date.now();
      localStorage.setItem('arcade_last_ayuda_timestamp', now.toString());
      localStorage.setItem('jtrash_last_ayuda_timestamp', now.toString());
      this.add(2000);
      sound.win();
      return { success: true, remainingMs: 0, balance: this.balance };
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
    const isRed = (card.suit === '♥' || card.suit === '♦');
    const suitColor = isRed ? '#dc2626' : '#0f172a';
    const isRoyal = ['J', 'Q', 'K'].includes(card.rank);
    const isAce = card.rank === 'A';
    return `
      <div class="casino-card ${isRed ? 'suit-red' : 'suit-black'} ${isRoyal ? 'card-royal' : ''} ${isAce ? 'card-ace' : ''}" data-suit="${card.suit}" data-rank="${card.rank}" style="color: ${suitColor};">
        <div class="card-corner top-left" style="color: ${suitColor};">
          <span class="card-rank" style="color: ${suitColor};">${card.rank}</span>
          <span class="suit-icon" style="color: ${suitColor};">${card.suit}</span>
        </div>
        <div class="card-center" style="color: ${suitColor};">
          ${isAce ? `<span class="suit-symbol" style="font-size: 2.2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25)); color: ${suitColor};">${card.suit}</span>` : `<span class="suit-symbol" style="font-size: 1.5rem; color: ${suitColor};">${card.suit}</span>`}
        </div>
        <div class="card-corner bottom-right" style="color: ${suitColor};">
          <span class="card-rank" style="color: ${suitColor};">${card.rank}</span>
          <span class="suit-icon" style="color: ${suitColor};">${card.suit}</span>
        </div>
      </div>
    `;
  }

  function buildBlackjack(gameDef, container) {
    const isPontoon = (gameDef.id === 'pontoon');
    const isSpanish21 = (gameDef.id === 'spanish21');
    const isSingleDeck = (gameDef.id === 'single_deck_bj');
    const feltClass = isPontoon ? 'felt-pontoon' : (isSpanish21 ? 'felt-spanish21' : (isSingleDeck ? 'felt-single-deck' : 'felt-blackjack'));

    function getFreshDeck() {
      if (isSingleDeck) return createDeck(1);
      if (isSpanish21) {
        // Spanish 21: 6 decks, all 10s removed (keeps J, Q, K with value 10)
        return createDeck(6).filter(c => c.rank !== '10');
      }
      return createDeck(6);
    }

    let deck = getFreshDeck();
    let bet = 100;
    let baseBet = 100;
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
        <div class="table-felt ${feltClass}">
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
      baseBet = bet;
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = '<span style="color:#ef4444">Insufficient coins! Claim Free Ayuda below.</span>';
        return;
      }
      sound.chip();
      deck = getFreshDeck();
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
      if (!isSpanish21) {
        btnDouble.disabled = true;
      } else {
        btnDouble.disabled = wallet.get() < bet;
      }
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
        return;
      }
      if (dTot > 21) {
        endRound('dealer_bust');
        return;
      }

      // Spanish 21 rules: Player 21 ALWAYS wins!
      if (isSpanish21 && pTot === 21) {
        if (playerHand.length === 2 && (dTot !== 21 || dealerHand.length > 2)) {
          endRound('blackjack');
        } else {
          endRound('player_win');
        }
        return;
      }

      // Pontoon rules:
      if (isPontoon) {
        const playerIsPontoon = (pTot === 21 && playerHand.length === 2);
        const dealerIsPontoon = (dTot === 21 && dealerHand.length === 2);
        const playerIs5Card = (playerHand.length >= 5 && pTot <= 21);
        const dealerIs5Card = (dealerHand.length >= 5 && dTot <= 21);

        if (playerIsPontoon && !dealerIsPontoon) {
          endRound('pontoon');
        } else if (dealerIsPontoon) {
          endRound('dealer_win');
        } else if (playerIs5Card && !dealerIs5Card) {
          endRound('5card_trick');
        } else if (dealerIs5Card) {
          endRound('dealer_win');
        } else if (pTot > dTot) {
          endRound('player_win');
        } else {
          // Dealer wins ties in Pontoon
          endRound('dealer_win');
        }
        return;
      }

      // Standard Blackjack & Single Deck
      if (pTot === 21 && playerHand.length === 2 && (dTot !== 21 || dealerHand.length > 2)) {
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
      } else if (outcome === 'pontoon') {
        winAmt = bet * 3;
        wallet.add(winAmt);
        sound.bigWin();
        celebration.burst('win', 90);
        window.CasinoEngine.showBanner('🎩 PONTOON 2:1!', `+${winAmt.toLocaleString()} COINS`);
        elStatus.innerHTML = `<span style="color:#fde047; font-weight:800;">🎩 PONTOON 2:1! +${winAmt.toLocaleString()} COINS</span>`;
      } else if (outcome === '5card_trick') {
        winAmt = bet * 3;
        wallet.add(winAmt);
        sound.bigWin();
        celebration.burst('win', 90);
        window.CasinoEngine.showBanner('5-CARD TRICK 2:1!', `+${winAmt.toLocaleString()} COINS`);
        elStatus.innerHTML = `<span style="color:#fde047; font-weight:800;">🎉 5-CARD TRICK 2:1! +${winAmt.toLocaleString()} COINS</span>`;
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

      // Reset bet to base bet if doubled
      bet = baseBet;
      elBet.value = baseBet;
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
    const feltClass = (gameDef.id === 'dragon_baccarat') ? 'felt-dragon-baccarat' : 'felt-baccarat';

    function calcBaccarat(hand) {
      let sum = 0;
      for (const c of hand) {
        sum += (['10', 'J', 'Q', 'K'].includes(c.rank)) ? 0 : (c.rank === 'A' ? 1 : parseInt(c.rank, 10));
      }
      return sum % 10;
    }

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt ${feltClass}">
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
          <div class="felt-center-banner" id="bacc-status-msg">Choose your bet spot and click Deal to play</div>
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
    const btnDeal = container.querySelector('#btn-bacc-deal');
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

    btnDeal.onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = '<span style="color:#ef4444">Insufficient coins! Claim Free Ayuda below.</span>';
        return;
      }
      btnDeal.disabled = true;
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
      } else if (isDragon7 && betTarget === 'banker') {
        // In EZ Baccarat / Dragon 7, winning 3-card Banker 7 pushes regular Banker bets
        payout = bet;
      } else if (betTarget === outcome) {
        win = true;
        if (outcome === 'player') payout = bet * 2;
        else if (outcome === 'banker') {
          payout = (gameDef.id === 'dragon_baccarat') ? (bet * 2) : Math.floor(bet * 1.95);
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
        const pushMsg = isDragon7 ? '🐉 DRAGON 7 PUSH! Banker stake returned.' : '🤝 TIE PUSH! Staked returned.';
        elStatus.innerHTML = `<span style="color:#38bdf8">${pushMsg}</span>`;
      } else {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">💀 ${outcome.toUpperCase()} WINS. Stake lost.</span>`;
      }

      btnDeal.disabled = false;
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
        elPot.textContent = 'INSUFFICIENT COINS!';
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
        btnDrop.textContent = 'INSUFFICIENT COINS!';
        setTimeout(() => { btnDrop.textContent = 'DROP ORB 🟢'; }, 1500);
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

  /* --- 4F: PERYA COLOR GAME (TRUE 3D INTERACTIVE CARNIVAL CUBES) --- */
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
    let isDropping = false;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="color-game-board">
          <div class="perya-3d-stage">
            <div class="perya-funnel-decor">🎪 PHILIPPINE PERYA COLOR GAME • 3D CUBES 🎪</div>
            <canvas id="perya-canvas-3d" width="480" height="210" class="perya-canvas"></canvas>
          </div>
          <div class="felt-center-banner" id="color-status">Place chips on the colors and click DROP 3D CUBES</div>
          <div class="color-bet-grid">
            ${colors.map(c => `
              <div class="color-card-spot" id="spot-${c.id}" data-color="${c.id}" style="border-color:${c.hex}">
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
            <button class="btn-action primary" id="btn-drop-cubes" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #fde047; box-shadow: 0 0 20px rgba(245, 176, 65, 0.4);">
              DROP 3D CUBES 🎪
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#perya-canvas-3d');
    const ctx = canvas.getContext('2d');
    const btnDrop = container.querySelector('#btn-drop-cubes');
    const elStatus = container.querySelector('#color-status');

    // 3D Math Utilities
    const project = (x, y, z, cx, cy, fov = 280) => {
      const scale = fov / (fov + z);
      return { x: cx + x * scale, y: cy + y * scale, scale, z };
    };
    const rx = (p, a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    };
    const ry = (p, a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    };
    const rz = (p, a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
    };

    const S = 27;
    const baseVerts = [
      { x: -S, y: -S, z: -S },
      { x:  S, y: -S, z: -S },
      { x:  S, y:  S, z: -S },
      { x: -S, y:  S, z: -S },
      { x: -S, y: -S, z:  S },
      { x:  S, y: -S, z:  S },
      { x:  S, y:  S, z:  S },
      { x: -S, y:  S, z:  S }
    ];

    const faces = [
      { verts: [4, 5, 6, 7], normal: { x: 0, y: 0, z: 1 }, color: '#facc15', id: 'yellow' },
      { verts: [1, 0, 3, 2], normal: { x: 0, y: 0, z: -1 }, color: '#f8fafc', id: 'white' },
      { verts: [5, 1, 2, 6], normal: { x: 1, y: 0, z: 0 }, color: '#ec4899', id: 'pink' },
      { verts: [0, 4, 7, 3], normal: { x: -1, y: 0, z: 0 }, color: '#3b82f6', id: 'blue' },
      { verts: [7, 6, 2, 3], normal: { x: 0, y: 1, z: 0 }, color: '#ef4444', id: 'red' },
      { verts: [0, 1, 5, 4], normal: { x: 0, y: -1, z: 0 }, color: '#10b981', id: 'green' }
    ];

    const targetAngles = {
      yellow: { y: 0,               x: -0.35, z: 0 },
      white:  { y: Math.PI,         x: -0.35, z: 0 },
      pink:   { y: -Math.PI / 2,    x: -0.35, z: 0 },
      blue:   { y: Math.PI / 2,     x: -0.35, z: 0 },
      red:    { y: 0,               x: Math.PI / 2 - 0.35, z: 0 },
      green:  { y: 0,               x: -Math.PI / 2 - 0.35, z: 0 }
    };

    // Initialize 3 Dice on the Perya wooden deck
    const floorY = 125;
    const dice = [
      { x: 120, y: floorY, rotX: -0.35, rotY: 0, rotZ: 0, vy: 0, vRotX: 0, vRotY: 0, vRotZ: 0, targetColor: 'yellow', settled: true, bounces: 0 },
      { x: 240, y: floorY, rotX: Math.PI / 2 - 0.35, rotY: 0, rotZ: 0, vy: 0, vRotX: 0, vRotY: 0, vRotZ: 0, targetColor: 'red', settled: true, bounces: 0 },
      { x: 360, y: floorY, rotX: -0.35, rotY: Math.PI / 2, rotZ: 0, vy: 0, vRotX: 0, vRotY: 0, vRotZ: 0, targetColor: 'blue', settled: true, bounces: 0 }
    ];

    let animId = null;

    function render3DScene(t) {
      if (!container.isConnected) return; // Clean up when theater closes

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Carnival wood stage gradient
      const stageGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      stageGrad.addColorStop(0, '#0a0f1d');
      stageGrad.addColorStop(0.55, '#111827');
      stageGrad.addColorStop(1, '#070b14');
      ctx.fillStyle = stageGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Carnival floor deck line with glowing gold trim
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 155);
      ctx.lineTo(450, 155);
      ctx.stroke();

      // Render each die
      dice.forEach((die, dIdx) => {
        // Physics update while dropping
        if (!die.settled) {
          die.vy += 0.72; // Gravity
          die.y += die.vy;
          die.rotX += die.vRotX;
          die.rotY += die.vRotY;
          die.rotZ += die.vRotZ;

          if (die.y >= floorY) {
            die.y = floorY;
            die.bounces++;
            if (die.bounces < 3) {
              die.vy = -die.vy * 0.42; // Bounce damping
              die.vRotX *= 0.65;
              die.vRotY *= 0.65;
              die.vRotZ *= 0.65;
              sound.chip();
            } else {
              // Settle
              die.vy = 0;
              die.vRotX = 0;
              die.vRotY = 0;
              die.vRotZ = 0;
              die.settled = true;
            }
          }
        } else if (isDropping) {
          // Smoothly interpolate to target angles
          const ta = targetAngles[die.targetColor] || { x: -0.35, y: 0, z: 0 };
          die.rotX += (ta.x - die.rotX) * 0.2;
          die.rotY += (ta.y - die.rotY) * 0.2;
          die.rotZ += (ta.z - die.rotZ) * 0.2;
          die.y += (floorY - die.y) * 0.2;
        } else {
          // Gentle idle breathing
          die.y = floorY + Math.sin(t * 0.0025 + dIdx * 1.5) * 2;
        }

        // Drop shadow on wood floor
        const heightDiff = Math.max(0, floorY - die.y);
        const shadowScale = Math.max(0.4, 1 - heightDiff * 0.006);
        const shadowAlpha = Math.max(0.12, 0.5 - heightDiff * 0.0035);

        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
        ctx.beginPath();
        ctx.ellipse(die.x, 155, 34 * shadowScale, 11 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 3D Transform Vertices: apply Y rotation first, then X tilt, then Z
        const transformedVerts = baseVerts.map(v => {
          let p = ry(v, die.rotY);
          p = rx(p, die.rotX);
          p = rz(p, die.rotZ);
          return project(p.x, p.y, p.z, die.x, die.y, 300);
        });

        // Transform faces & sort by Z-depth
        const sortedFaces = faces.map((f, fIdx) => {
          let n = ry(f.normal, die.rotY);
          n = rx(n, die.rotX);
          n = rz(n, die.rotZ);
          const avgZ = f.verts.reduce((sum, vi) => sum + transformedVerts[vi].z, 0) / 4;
          return { ...f, transNormal: n, avgZ };
        }).sort((a, b) => b.avgZ - a.avgZ);

        // Render visible faces
        sortedFaces.forEach(f => {
          if (f.transNormal.z <= 0.02) return; // Backface culling

          // Directional lighting
          const light = 0.65 + 0.35 * Math.max(0, f.transNormal.x * 0.4 - f.transNormal.y * 0.6 + f.transNormal.z * 0.5);

          ctx.save();
          ctx.beginPath();
          const v0 = transformedVerts[f.verts[0]];
          ctx.moveTo(v0.x, v0.y);
          for (let i = 1; i < 4; i++) {
            const vi = transformedVerts[f.verts[i]];
            ctx.lineTo(vi.x, vi.y);
          }
          ctx.closePath();

          // Fill Face with specular light
          ctx.fillStyle = f.color;
          ctx.fill();

          // Shading overlay
          ctx.fillStyle = `rgba(0, 0, 0, ${(1 - light) * 0.45})`;
          ctx.fill();

          // Border & Edge filigree
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Center Round Emblem on Cube Face
          const centerFaceX = f.verts.reduce((sum, vi) => sum + transformedVerts[vi].x, 0) / 4;
          const centerFaceY = f.verts.reduce((sum, vi) => sum + transformedVerts[vi].y, 0) / 4;
          const emblemRadius = 7.5 * (300 / (300 + f.avgZ));

          ctx.beginPath();
          ctx.arc(centerFaceX, centerFaceY, emblemRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();
        });
      });

      animId = requestAnimationFrame(render3DScene);
    }

    animId = requestAnimationFrame(render3DScene);

    // Chip adjustment & stake handling
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
        if (isDropping) return;
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
      if (isDropping) return;
      let refunded = 0;
      Object.keys(bets).forEach(k => {
        refunded += bets[k];
        bets[k] = 0;
        container.querySelector(`#stake-${k}`).textContent = '0';
      });
      wallet.add(refunded);
      sound.click();
    };

    btnDrop.onclick = () => {
      if (isDropping) return;
      const totalStaked = Object.values(bets).reduce((a, b) => a + b, 0);
      if (totalStaked <= 0) {
        sound.lose();
        elStatus.innerHTML = '<span style="color:#ef4444">Place chips on at least one color first!</span>';
        return;
      }

      isDropping = true;
      btnDrop.disabled = true;
      btnDrop.style.opacity = '0.5';
      sound.dice();
      spots.forEach(s => s.classList.remove('winner'));

      // Roll 3 authentic colors
      const roll1 = colors[Math.floor(Math.random() * 6)];
      const roll2 = colors[Math.floor(Math.random() * 6)];
      const roll3 = colors[Math.floor(Math.random() * 6)];
      const rolled = [roll1, roll2, roll3];

      // Launch 3D cubes from funnel
      dice.forEach((die, i) => {
        die.y = -40 - i * 25;
        die.vy = 3 + Math.random() * 2;
        die.vRotX = 0.22 + Math.random() * 0.18;
        die.vRotY = 0.25 + Math.random() * 0.2;
        die.vRotZ = 0.15 + Math.random() * 0.15;
        die.targetColor = rolled[i].id;
        die.settled = false;
        die.bounces = 0;
      });

      elStatus.innerHTML = '<span style="color:#fde047">🎪 Cubes tumbling down the Perya funnel...</span>';

      // After physics settle (1.4s), evaluate result
      setTimeout(() => {
        // Force settle to exact target angles
        dice.forEach(die => {
          die.settled = true;
          const ta = targetAngles[die.targetColor];
          die.rotX = ta.x;
          die.rotY = ta.y;
          die.rotZ = ta.z;
          die.y = floorY;
        });

        const counts = {};
        rolled.forEach(r => counts[r.id] = (counts[r.id] || 0) + 1);

        let won = 0;
        let matchedColors = [];

        Object.keys(bets).forEach(id => {
          if (counts[id] && bets[id] > 0) {
            // 1 match = stake + 1x. 2 matches = stake + 2x. 3 matches = stake + 3x!
            won += bets[id] * (1 + counts[id]);
            matchedColors.push(id);
          }
        });

        // Highlight winning spots
        matchedColors.forEach(id => {
          const sp = container.querySelector(`#spot-${id}`);
          if (sp) sp.classList.add('winner');
        });

        // Reset stakes
        Object.keys(bets).forEach(k => {
          bets[k] = 0;
          container.querySelector(`#stake-${k}`).textContent = '0';
        });

        if (won > 0) {
          wallet.add(won);
          sound.win();
          celebration.burst('win', 40);
          elStatus.innerHTML = `<span style="color:#10b981; font-weight:800;">🎉 3D PERYA WIN! +${won.toLocaleString()} COINS (${rolled.map(r => r.name).join(' • ')})</span>`;
        } else {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#94a3b8">Result: ${rolled.map(r => r.name).join(' • ')} — No match. Better luck next roll!</span>`;
        }

        isDropping = false;
        btnDrop.disabled = false;
        btnDrop.style.opacity = '1';
      }, 1500);
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
        elBanner.innerHTML = `<span style="color:#ef4444">Insufficient coins! Claim Free Ayuda below.</span>`;
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
     4C: VIDEO POKER (Jacks or Better, Deuces Wild, Joker Poker)
     ========================================================================= */
  function buildVideoPoker(gameDef, container) {
    let bet = 100;
    let deck = createDeck(1);
    let hand = [];
    let held = [false, false, false, false, false];
    let gameState = 'idle'; // 'idle', 'dealt'

    const paytable = [
      { name: 'Royal Flush', mult: 800 },
      { name: 'Straight Flush', mult: 50 },
      { name: '4 of a Kind', mult: 25 },
      { name: 'Full House', mult: 9 },
      { name: 'Flush', mult: 6 },
      { name: 'Straight', mult: 4 },
      { name: '3 of a Kind', mult: 3 },
      { name: 'Two Pair', mult: 2 },
      { name: (gameDef.id === 'vp_deuces' ? 'Wild Royal' : 'Jacks or Better'), mult: 1 }
    ];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-video-poker">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>
          
          <div class="vp-paytable-board">
            <div class="vp-pay-grid">
              ${paytable.map((p, idx) => `
                <div class="vp-pay-row" id="vp-row-${idx}">
                  <span class="vp-hand-name">${p.name}</span>
                  <span class="vp-hand-mult">${p.mult}x</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="vp-cards-stage" id="vp-cards-row">
            ${Array.from({ length: 5 }, (_, i) => `
              <div class="vp-card-slot" id="vp-slot-${i}">
                <div class="vp-hold-indicator" id="vp-hold-${i}">HELD</div>
                <div class="vp-card-box" id="vp-card-box-${i}">
                  ${renderCardHTML({ suit: '♠', rank: 'A', color: '#0f172a', val: 11 }, true)}
                </div>
                <button class="vp-hold-btn" id="vp-btn-hold-${i}">HOLD</button>
              </div>
            `).join('')}
          </div>

          <div class="felt-center-banner" id="vp-status-msg">Press DEAL to start five-card draw!</div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-vp-half">1/2</button>
            <input type="number" id="input-vp-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-vp-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-vp-max">MAX</button>
          </div>
          <div class="chip-rack-selector">
            <button class="casino-chip-btn chip-10" data-val="10">10</button>
            <button class="casino-chip-btn chip-50" data-val="50">50</button>
            <button class="casino-chip-btn chip-100" data-val="100">100</button>
            <button class="casino-chip-btn chip-500" data-val="500">500</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-vp-action" style="min-width: 170px;">
              DEAL CARDS 🃏
            </button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-vp-bet');
    const elStatus = container.querySelector('#vp-status-msg');
    const btnAction = container.querySelector('#btn-vp-action');

    function rankToVal(r) {
      if (r === 'A') return 14;
      if (r === 'K') return 13;
      if (r === 'Q') return 12;
      if (r === 'J') return 11;
      return parseInt(r, 10);
    }

    function evaluatePokerHand(cards) {
      const vals = cards.map(c => rankToVal(c.rank)).sort((a,b) => a - b);
      const suits = cards.map(c => c.suit);
      const isFlush = suits.every(s => s === suits[0]);
      
      let isStraight = false;
      if (vals[4] - vals[0] === 4 && new Set(vals).size === 5) isStraight = true;
      if (vals[0] === 2 && vals[1] === 3 && vals[2] === 4 && vals[3] === 5 && vals[4] === 14) isStraight = true; // Ace-low straight

      const counts = {};
      vals.forEach(v => counts[v] = (counts[v] || 0) + 1);
      const countVals = Object.values(counts).sort((a,b) => b - a);

      if (isStraight && isFlush && vals[4] === 14 && vals[0] === 10) return { name: 'Royal Flush', mult: 800, idx: 0 };
      if (isStraight && isFlush) return { name: 'Straight Flush', mult: 50, idx: 1 };
      if (countVals[0] === 4) return { name: '4 of a Kind', mult: 25, idx: 2 };
      if (countVals[0] === 3 && countVals[1] === 2) return { name: 'Full House', mult: 9, idx: 3 };
      if (isFlush) return { name: 'Flush', mult: 6, idx: 4 };
      if (isStraight) return { name: 'Straight', mult: 4, idx: 5 };
      if (countVals[0] === 3) return { name: '3 of a Kind', mult: 3, idx: 6 };
      if (countVals[0] === 2 && countVals[1] === 2) return { name: 'Two Pair', mult: 2, idx: 7 };
      if (countVals[0] === 2) {
        // Check if pair is Jacks or higher
        for (const [valStr, c] of Object.entries(counts)) {
          if (c === 2 && parseInt(valStr, 10) >= 11) {
            return { name: 'Jacks or Better', mult: 1, idx: 8 };
          }
        }
      }
      return { name: 'High Card', mult: 0, idx: -1 };
    }

    function toggleHold(idx) {
      if (gameState !== 'dealt') return;
      held[idx] = !held[idx];
      sound.click();
      const holdEl = container.querySelector(`#vp-hold-${idx}`);
      const boxEl = container.querySelector(`#vp-card-box-${idx}`);
      const btnEl = container.querySelector(`#vp-btn-hold-${idx}`);
      if (held[idx]) {
        holdEl.classList.add('active');
        boxEl.classList.add('held-glow');
        btnEl.classList.add('active');
      } else {
        holdEl.classList.remove('active');
        boxEl.classList.remove('held-glow');
        btnEl.classList.remove('active');
      }
    }

    for (let i = 0; i < 5; i++) {
      container.querySelector(`#vp-slot-${i}`).onclick = (e) => {
        toggleHold(i);
      };
    }

    container.querySelectorAll('.casino-chip-btn').forEach(b => {
      b.onclick = () => {
        const val = parseInt(b.dataset.val, 10);
        bet = Math.min(wallet.get(), bet + val);
        elBet.value = bet;
        sound.chip();
      };
    });

    container.querySelector('#btn-vp-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-vp-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-vp-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnAction.onclick = () => {
      container.querySelectorAll('.vp-pay-row').forEach(r => r.classList.remove('vp-win-highlight'));

      if (gameState === 'idle') {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins! Claim Ayuda below.</span>`;
          return;
        }

        sound.card();
        deck = createDeck(1);
        hand = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
        held = [false, false, false, false, false];

        for (let i = 0; i < 5; i++) {
          const boxEl = container.querySelector(`#vp-card-box-${i}`);
          const holdEl = container.querySelector(`#vp-hold-${i}`);
          const btnEl = container.querySelector(`#vp-btn-hold-${i}`);
          holdEl.classList.remove('active');
          boxEl.classList.remove('held-glow');
          btnEl.classList.remove('active');
          boxEl.innerHTML = renderCardHTML(hand[i]);
          boxEl.classList.add('card-enter-anim');
          setTimeout(() => boxEl.classList.remove('card-enter-anim'), 350);
        }

        gameState = 'dealt';
        btnAction.textContent = 'DRAW REPLACEMENTS 🔄';
        elStatus.innerHTML = 'Select cards to HOLD, then press DRAW!';
      } else if (gameState === 'dealt') {
        // Replace unheld cards
        for (let i = 0; i < 5; i++) {
          if (!held[i]) {
            hand[i] = deck.pop();
            const boxEl = container.querySelector(`#vp-card-box-${i}`);
            boxEl.innerHTML = renderCardHTML(hand[i]);
            boxEl.classList.add('card-enter-anim');
            setTimeout(() => boxEl.classList.remove('card-enter-anim'), 350);
          }
        }
        sound.card();

        const result = evaluatePokerHand(hand);
        if (result.mult > 0) {
          const winAmt = bet * result.mult;
          wallet.add(winAmt);
          sound.win();
          celebration.burst('win', 45);
          const winRow = container.querySelector(`#vp-row-${result.idx}`);
          if (winRow) winRow.classList.add('vp-win-highlight');
          elStatus.innerHTML = `<span style="color:#fde047">🏆 ${result.name.toUpperCase()}! WON $${winAmt.toLocaleString()}!</span>`;
        } else {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#94a3b8">No Pair or Low Card. Better luck on the next draw!</span>`;
        }

        gameState = 'idle';
        btnAction.textContent = 'DEAL CARDS 🃏';
      }
    };
  }

  /* =========================================================================
     4D: POKER TABLE (Texas Hold'em Heads-Up, Three Card Poker, Caribbean Stud)
     ========================================================================= */
  function buildPokerTable(gameDef, container) {
    let bet = 100;
    let deck = createDeck(1);
    let playerHand = [];
    let dealerHand = [];
    let community = [];
    let inHand = false;

    const isHoldem = (gameDef.id === 'holdem_heads_up');
    const is3Card = (gameDef.id === 'three_card_poker');

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-poker-table">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="poker-dealer-zone">
            <div class="hand-label">OPPONENT DEALER <span id="poker-d-status" class="hand-badge">WAITING</span></div>
            <div class="cards-tray" id="poker-dealer-cards"></div>
          </div>

          <div class="poker-community-zone">
            <div class="poker-comm-label">${isHoldem ? 'COMMUNITY BOARD (FLOP • TURN • RIVER)' : 'POT STAKES AREA'}</div>
            <div class="cards-tray" id="poker-comm-cards"></div>
          </div>

          <div class="felt-center-banner" id="poker-status-msg">Place Ante and click Deal to battle heads-up!</div>

          <div class="poker-player-zone">
            <div class="hand-label">YOUR HAND <span id="poker-p-status" class="hand-badge">--</span></div>
            <div class="cards-tray" id="poker-player-cards"></div>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">ANTE</span>
            <button class="btn-ctrl-sub" id="btn-pk-half">1/2</button>
            <input type="number" id="input-pk-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-pk-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-pk-max">MAX</button>
          </div>
          <div class="chip-rack-selector">
            <button class="casino-chip-btn chip-10" data-val="10">10</button>
            <button class="casino-chip-btn chip-50" data-val="50">50</button>
            <button class="casino-chip-btn chip-100" data-val="100">100</button>
            <button class="casino-chip-btn chip-500" data-val="500">500</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-pk-deal">DEAL HAND ♠️</button>
            <button class="btn-action" id="btn-pk-call" style="display:none; background:#10b981; border-color:#34d399;">PLAY / CALL</button>
            <button class="btn-action" id="btn-pk-fold" style="display:none; background:#ef4444; border-color:#f87171;">FOLD</button>
          </div>
        </div>
      </div>
    `;

    const elPCards = container.querySelector('#poker-player-cards');
    const elDCards = container.querySelector('#poker-dealer-cards');
    const elComm = container.querySelector('#poker-comm-cards');
    const elPStatus = container.querySelector('#poker-p-status');
    const elDStatus = container.querySelector('#poker-d-status');
    const elStatus = container.querySelector('#poker-status-msg');
    const elBet = container.querySelector('#input-pk-bet');
    const btnDeal = container.querySelector('#btn-pk-deal');
    const btnCall = container.querySelector('#btn-pk-call');
    const btnFold = container.querySelector('#btn-pk-fold');

    function rankToVal(r) {
      if (r === 'A') return 14;
      if (r === 'K') return 13;
      if (r === 'Q') return 12;
      if (r === 'J') return 11;
      return parseInt(r, 10);
    }

    container.querySelectorAll('.casino-chip-btn').forEach(b => {
      b.onclick = () => {
        const val = parseInt(b.dataset.val, 10);
        bet = Math.min(wallet.get(), bet + val);
        elBet.value = bet;
        sound.chip();
      };
    });

    container.querySelector('#btn-pk-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-pk-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-pk-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnDeal.onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins! Claim Ayuda below.</span>`;
        return;
      }

      deck = createDeck(1);
      sound.card();
      inHand = true;
      btnDeal.style.display = 'none';
      btnCall.style.display = 'inline-flex';
      btnFold.style.display = 'inline-flex';

      if (is3Card) {
        playerHand = [deck.pop(), deck.pop(), deck.pop()];
        dealerHand = [deck.pop(), deck.pop(), deck.pop()];
        elPCards.innerHTML = playerHand.map(c => renderCardHTML(c)).join('');
        elDCards.innerHTML = dealerHand.map(() => renderCardHTML(null, true)).join('');
        elComm.innerHTML = `<div class="poker-ante-chip">ANTE: $${bet}</div>`;
        elPStatus.textContent = '3 CARDS DEALT';
        elDStatus.textContent = '3 CARDS FACE DOWN';
        elStatus.innerHTML = 'Click <b>PLAY</b> to match the dealer or <b>FOLD</b> to forfeit Ante.';
      } else if (isHoldem) {
        playerHand = [deck.pop(), deck.pop()];
        dealerHand = [deck.pop(), deck.pop()];
        community = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
        elPCards.innerHTML = playerHand.map(c => renderCardHTML(c)).join('');
        elDCards.innerHTML = dealerHand.map(() => renderCardHTML(null, true)).join('');
        // Flop shown, Turn & River face down
        elComm.innerHTML = `
          ${renderCardHTML(community[0])}
          ${renderCardHTML(community[1])}
          ${renderCardHTML(community[2])}
          ${renderCardHTML(community[3], true)}
          ${renderCardHTML(community[4], true)}
        `;
        elPStatus.textContent = 'HOLE CARDS';
        elDStatus.textContent = 'DEALER HOLE';
        elStatus.innerHTML = 'Flop is dealt! Click <b>CALL</b> to see Turn, River & Showdown, or <b>FOLD</b>.';
      } else {
        // Caribbean Stud / 5-Card
        playerHand = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
        dealerHand = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
        elPCards.innerHTML = playerHand.map(c => renderCardHTML(c)).join('');
        elDCards.innerHTML = `${renderCardHTML(dealerHand[0])}` + dealerHand.slice(1).map(() => renderCardHTML(null, true)).join('');
        elComm.innerHTML = `<div class="poker-ante-chip">ANTE: $${bet}</div>`;
        elPStatus.textContent = '5 CARDS';
        elDStatus.textContent = '1 CARD EXPOSED';
        elStatus.innerHTML = 'Dealer shows 1 card. Click <b>PLAY</b> (2x Ante) or <b>FOLD</b>.';
      }
    };

    btnCall.onclick = () => {
      if (!inHand) return;
      const callBet = bet; // 1x or 2x
      if (!wallet.deduct(callBet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins to call!</span>`;
        return;
      }

      sound.chip();
      // Reveal dealer cards
      elDCards.innerHTML = dealerHand.map(c => renderCardHTML(c)).join('');
      if (isHoldem) {
        elComm.innerHTML = community.map(c => renderCardHTML(c)).join('');
      }

      // Simple robust high-card / pair showdown evaluator
      const pMax = Math.max(...playerHand.map(c => rankToVal(c.rank)));
      const dMax = Math.max(...dealerHand.map(c => rankToVal(c.rank)));
      
      const pRanks = new Set(playerHand.map(c => c.rank)).size < playerHand.length; // has pair
      const dRanks = new Set(dealerHand.map(c => c.rank)).size < dealerHand.length;

      let playerWins = false;
      let tie = false;

      if (pRanks && !dRanks) playerWins = true;
      else if (!pRanks && dRanks) playerWins = false;
      else if (pMax > dMax) playerWins = true;
      else if (pMax === dMax) tie = true;

      const totalStake = bet + callBet;
      if (playerWins) {
        const winPayout = totalStake * 2;
        wallet.add(winPayout);
        sound.win();
        celebration.burst('win', 40);
        elStatus.innerHTML = `<span style="color:#fde047">🏆 SHOWDOWN WIN! You beat dealer and won $${winPayout.toLocaleString()}!</span>`;
        elPStatus.textContent = 'WINNER';
        elDStatus.textContent = 'BEATEN';
      } else if (tie) {
        wallet.add(totalStake);
        sound.click();
        elStatus.innerHTML = `<span style="color:#38bdf8">🤝 PUSH! Equal hand values, stakes returned.</span>`;
        elPStatus.textContent = 'PUSH';
        elDStatus.textContent = 'PUSH';
      } else {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Dealer takes the showdown pot. Good game!</span>`;
        elPStatus.textContent = 'LOST';
        elDStatus.textContent = 'WINNER';
      }

      inHand = false;
      btnDeal.style.display = 'inline-flex';
      btnCall.style.display = 'none';
      btnFold.style.display = 'none';
    };

    btnFold.onclick = () => {
      if (!inHand) return;
      sound.lose();
      elDCards.innerHTML = dealerHand.map(c => renderCardHTML(c)).join('');
      elStatus.innerHTML = `<span style="color:#94a3b8">Hand folded. Ante forfeited.</span>`;
      elPStatus.textContent = 'FOLDED';
      inHand = false;
      btnDeal.style.display = 'inline-flex';
      btnCall.style.display = 'none';
      btnFold.style.display = 'none';
    };
  }

  /* =========================================================================
     4E: CARD SHOWDOWN (Casino War, Dragon Tiger, Hi-Lo, Andar Bahar, Red Dog)
     ========================================================================= */
  function buildCardShowdown(gameDef, container) {
    let bet = 100;
    let deck = createDeck(6);
    let selectedSide = (gameDef.id === 'dragon_tiger') ? 'dragon' : ((gameDef.id === 'andar_bahar') ? 'andar' : 'player');
    let streak = 0;
    let currentHiLoCard = null;

    const isDragonTiger = (gameDef.id === 'dragon_tiger');
    const isWar = (gameDef.id === 'casino_war');
    const isHiLo = (gameDef.id === 'hilo_cards');
    const isAndarBahar = (gameDef.id === 'andar_bahar');
    const isRedDog = (gameDef.id === 'red_dog');

    function rankToVal(r) {
      if (r === 'A') return (isDragonTiger ? 1 : 14); // Ace is low in Dragon Tiger, high in Casino War/HiLo
      if (r === 'K') return 13;
      if (r === 'Q') return 12;
      if (r === 'J') return 11;
      return parseInt(r, 10);
    }

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-showdown">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          ${isDragonTiger ? `
            <div class="dragon-tiger-arena">
              <div class="dt-side dragon-side">
                <div class="dt-side-title" style="color:#ef4444;">🐉 DRAGON</div>
                <div class="cards-tray" id="dt-dragon-card"></div>
              </div>
              <div class="dt-center-vs">VS</div>
              <div class="dt-side tiger-side">
                <div class="dt-side-title" style="color:#f59e0b;">🐅 TIGER</div>
                <div class="cards-tray" id="dt-tiger-card"></div>
              </div>
            </div>
            <div class="showdown-bet-selector">
              <button class="bacc-spot active" data-side="dragon" style="border-color:#ef4444; color:#fca5a5;">DRAGON (1:1)</button>
              <button class="bacc-spot" data-side="tie" style="border-color:#10b981; color:#6ee7b7;">TIE (8:1)</button>
              <button class="bacc-spot" data-side="tiger" style="border-color:#f59e0b; color:#fde047;">TIGER (1:1)</button>
            </div>
          ` : isHiLo ? `
            <div class="hilo-arena">
              <div class="hilo-streak-pill" id="hilo-streak-display">STREAK: 0 • MULTIPLIER: 1.00x</div>
              <div class="cards-tray" id="hilo-card-box" style="min-height: 140px; margin: 16px 0;"></div>
              <div class="hilo-prediction-group">
                <button class="btn-action" id="btn-hilo-higher" style="background:#10b981; border-color:#6ee7b7; min-width: 140px;">HIGHER ▲</button>
                <button class="btn-action" id="btn-hilo-lower" style="background:#ef4444; border-color:#fca5a5; min-width: 140px;">LOWER ▼</button>
                <button class="btn-action" id="btn-hilo-cashout" style="background:#f59e0b; border-color:#fde047; min-width: 140px; display:none;">CASH OUT 💰</button>
              </div>
            </div>
          ` : isAndarBahar ? `
            <div class="andar-bahar-arena">
              <div class="ab-joker-slot">
                <div class="hand-label">TRUMP JOKER</div>
                <div class="cards-tray" id="ab-joker-card"></div>
              </div>
              <div class="ab-tracks">
                <div class="ab-side">
                  <div class="hand-label" style="color:#38bdf8;">ANDAR (LEFT)</div>
                  <div class="cards-tray" id="ab-andar-cards"></div>
                </div>
                <div class="ab-side">
                  <div class="hand-label" style="color:#ec4899;">BAHAR (RIGHT)</div>
                  <div class="cards-tray" id="ab-bahar-cards"></div>
                </div>
              </div>
            </div>
            <div class="showdown-bet-selector">
              <button class="bacc-spot active" data-side="andar">ANDAR (0.95:1)</button>
              <button class="bacc-spot" data-side="bahar">BAHAR (1:1)</button>
            </div>
          ` : `
            <div class="generic-showdown-arena">
              <div class="dealer-area">
                <div class="hand-label">DEALER SPOT <span id="sd-d-score" class="hand-badge">--</span></div>
                <div class="cards-tray" id="sd-dealer-card"></div>
              </div>
              <div class="player-area">
                <div class="hand-label">YOUR SPOT <span id="sd-p-score" class="hand-badge">--</span></div>
                <div class="cards-tray" id="sd-player-card"></div>
              </div>
            </div>
          `}

          <div class="felt-center-banner" id="sd-status-msg">Choose your stake and click Deal to battle!</div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-sd-half">1/2</button>
            <input type="number" id="input-sd-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-sd-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-sd-max">MAX</button>
          </div>
          <div class="chip-rack-selector">
            <button class="casino-chip-btn chip-10" data-val="10">10</button>
            <button class="casino-chip-btn chip-50" data-val="50">50</button>
            <button class="casino-chip-btn chip-100" data-val="100">100</button>
            <button class="casino-chip-btn chip-500" data-val="500">500</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-sd-deal">
              ${isHiLo ? 'START RUN 🚀' : 'DEAL SHOWDOWN ⚔️'}
            </button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-sd-bet');
    const elStatus = container.querySelector('#sd-status-msg');
    const btnDeal = container.querySelector('#btn-sd-deal');

    container.querySelectorAll('.showdown-bet-selector button').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.showdown-bet-selector button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedSide = b.dataset.side;
        sound.click();
      };
    });

    container.querySelectorAll('.casino-chip-btn').forEach(b => {
      b.onclick = () => {
        const val = parseInt(b.dataset.val, 10);
        bet = Math.min(wallet.get(), bet + val);
        elBet.value = bet;
        sound.chip();
      };
    });

    container.querySelector('#btn-sd-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-sd-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-sd-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    if (isHiLo) {
      const elCard = container.querySelector('#hilo-card-box');
      const elStreak = container.querySelector('#hilo-streak-display');
      const btnHigh = container.querySelector('#btn-hilo-higher');
      const btnLow = container.querySelector('#btn-hilo-lower');
      const btnCash = container.querySelector('#btn-hilo-cashout');

      function nextHiLoStep(guessHigh) {
        if (!currentHiLoCard) return;
        const nextCard = deck.pop();
        sound.card();
        elCard.innerHTML = renderCardHTML(nextCard);

        const curVal = rankToVal(currentHiLoCard.rank);
        const nextVal = rankToVal(nextCard.rank);

        let correct = false;
        if (guessHigh && nextVal >= curVal) correct = true;
        if (!guessHigh && nextVal <= curVal) correct = true;

        if (correct) {
          streak++;
          const mult = Math.pow(1.45, streak);
          const pot = Math.floor(bet * mult);
          sound.win();
          elStreak.textContent = `STREAK: ${streak} • POT: $${pot.toLocaleString()} (${mult.toFixed(2)}x)`;
          elStatus.innerHTML = `<span style="color:#10b981">Correct! Next card: ${nextCard.rank}. Continue or cash out?</span>`;
          btnCash.style.display = 'inline-flex';
          btnCash.textContent = `CASH OUT $${pot.toLocaleString()} 💰`;
          currentHiLoCard = nextCard;
        } else {
          sound.lose();
          elStreak.textContent = `BUST! Stake lost.`;
          elStatus.innerHTML = `<span style="color:#ef4444">Wrong guess! Dealt ${nextCard.rank}. Streak broken.</span>`;
          btnHigh.disabled = true;
          btnLow.disabled = true;
          btnCash.style.display = 'none';
          btnDeal.style.display = 'inline-flex';
          btnDeal.disabled = false;
        }
      }

      btnHigh.onclick = () => nextHiLoStep(true);
      btnLow.onclick = () => nextHiLoStep(false);
      btnCash.onclick = () => {
        const mult = Math.pow(1.45, streak);
        const pot = Math.floor(bet * mult);
        wallet.add(pot);
        sound.cashout();
        celebration.burst('win', 40);
        elStatus.innerHTML = `<span style="color:#fde047">🏆 CASHED OUT $${pot.toLocaleString()}! Awesome streak!</span>`;
        btnHigh.disabled = true;
        btnLow.disabled = true;
        btnCash.style.display = 'none';
        btnDeal.style.display = 'inline-flex';
        btnDeal.disabled = false;
      };

      btnDeal.onclick = () => {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
          return;
        }
        deck = createDeck(2);
        streak = 0;
        currentHiLoCard = deck.pop();
        sound.card();
        elCard.innerHTML = renderCardHTML(currentHiLoCard);
        elStreak.textContent = `STREAK: 0 • MULTIPLIER: 1.00x`;
        elStatus.innerHTML = `Starting card: <b>${currentHiLoCard.rank}</b>. Will next card be Higher or Lower?`;
        btnHigh.disabled = false;
        btnLow.disabled = false;
        btnCash.style.display = 'none';
        btnDeal.style.display = 'none';
      };
    } else if (isDragonTiger) {
      btnDeal.onclick = () => {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
          return;
        }
        deck = createDeck(6);
        sound.card();
        const dCard = deck.pop();
        const tCard = deck.pop();
        container.querySelector('#dt-dragon-card').innerHTML = renderCardHTML(dCard);
        container.querySelector('#dt-tiger-card').innerHTML = renderCardHTML(tCard);

        const dVal = rankToVal(dCard.rank);
        const tVal = rankToVal(tCard.rank);

        let winner = 'tie';
        if (dVal > tVal) winner = 'dragon';
        if (tVal > dVal) winner = 'tiger';

        if (winner === selectedSide) {
          const mult = (winner === 'tie') ? 9 : 2;
          const winAmt = bet * mult;
          wallet.add(winAmt);
          sound.win();
          celebration.burst('win', 40);
          elStatus.innerHTML = `<span style="color:#fde047">🏆 ${winner.toUpperCase()} WINS! Won $${winAmt.toLocaleString()}!</span>`;
        } else {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">${winner.toUpperCase()} wins. Better luck next hand!</span>`;
        }
      };
    } else if (isAndarBahar) {
      btnDeal.onclick = () => {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
          return;
        }
        deck = createDeck(1);
        sound.card();
        const joker = deck.pop();
        container.querySelector('#ab-joker-card').innerHTML = renderCardHTML(joker);
        const elAndar = container.querySelector('#ab-andar-cards');
        const elBahar = container.querySelector('#ab-bahar-cards');
        elAndar.innerHTML = '';
        elBahar.innerHTML = '';

        let turn = 'andar';
        let matched = false;
        let matchSide = '';

        while (!matched && deck.length > 0) {
          const c = deck.pop();
          if (turn === 'andar') {
            elAndar.innerHTML += renderCardHTML(c);
            if (c.rank === joker.rank) { matched = true; matchSide = 'andar'; }
            turn = 'bahar';
          } else {
            elBahar.innerHTML += renderCardHTML(c);
            if (c.rank === joker.rank) { matched = true; matchSide = 'bahar'; }
            turn = 'andar';
          }
        }

        if (matchSide === selectedSide) {
          const mult = (matchSide === 'andar' ? 1.95 : 2.0);
          const winAmt = Math.floor(bet * mult);
          wallet.add(winAmt);
          sound.win();
          celebration.burst('win', 40);
          elStatus.innerHTML = `<span style="color:#fde047">🏆 MATCH ON ${matchSide.toUpperCase()}! Won $${winAmt.toLocaleString()}!</span>`;
        } else {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Matched on ${matchSide.toUpperCase()}. Stake lost.</span>`;
        }
      };
    } else {
      // Casino War
      btnDeal.onclick = () => {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
          return;
        }
        deck = createDeck(6);
        sound.card();
        const pCard = deck.pop();
        const dCard = deck.pop();
        container.querySelector('#sd-player-card').innerHTML = renderCardHTML(pCard);
        container.querySelector('#sd-dealer-card').innerHTML = renderCardHTML(dCard);

        const pVal = rankToVal(pCard.rank);
        const dVal = rankToVal(dCard.rank);
        container.querySelector('#sd-p-score').textContent = pVal;
        container.querySelector('#sd-d-score').textContent = dVal;

        if (pVal > dVal) {
          const winAmt = bet * 2;
          wallet.add(winAmt);
          sound.win();
          celebration.burst('win', 35);
          elStatus.innerHTML = `<span style="color:#fde047">🏆 VICTORY! Your card won $${winAmt.toLocaleString()}!</span>`;
        } else if (pVal === dVal) {
          // Tie war
          wallet.add(bet); // push
          sound.click();
          elStatus.innerHTML = `<span style="color:#38bdf8">⚔️ TIE WAR! Card ranks match, stakes refunded.</span>`;
        } else {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Dealer's card is higher. Better luck next deal!</span>`;
        }
      };
    }
  }

  /* =========================================================================
     4F: 3D ROULETTE (European Roulette 37 & American Roulette 00)
     ========================================================================= */
  function buildRoulette(gameDef, container) {
    let bet = 100;
    let selectedBet = 'red'; // 'red', 'black', 'even', 'odd', 'low', 'high', '1st12', '2nd12', '3rd12', or number
    let isSpinning = false;
    const isUS = (gameDef.id === 'roulette_us');
    const numbers = isUS 
      ? ['0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2']
      : ['0', '32', '15', '19', '4', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'];

    const redNumbers = new Set(['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36']);

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-roulette">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="roulette-wheel-container">
            <canvas id="roulette-wheel-canvas" width="340" height="340" class="roulette-3d-canvas"></canvas>
            <div class="roulette-pointer-needle"></div>
          </div>

          <div class="felt-center-banner" id="roulette-status-msg">Select a betting sector and spin the wheel!</div>

          <div class="roulette-table-grid">
            <div class="roulette-outside-bets">
              <button class="rt-bet-box rt-red active" data-bet="red">RED (1:1)</button>
              <button class="rt-bet-box rt-black" data-bet="black">BLACK (1:1)</button>
              <button class="rt-bet-box" data-bet="even">EVEN (1:1)</button>
              <button class="rt-bet-box" data-bet="odd">ODD (1:1)</button>
              <button class="rt-bet-box" data-bet="low">1-18 (1:1)</button>
              <button class="rt-bet-box" data-bet="high">19-36 (1:1)</button>
              <button class="rt-bet-box" data-bet="1st12">1st 12 (2:1)</button>
              <button class="rt-bet-box" data-bet="2nd12">2nd 12 (2:1)</button>
              <button class="rt-bet-box" data-bet="3rd12">3rd 12 (2:1)</button>
            </div>
            <div class="roulette-numbers-row">
              <button class="rt-num-box rt-green" data-bet="0">0</button>
              ${isUS ? '<button class="rt-num-box rt-green" data-bet="00">00</button>' : ''}
              ${Array.from({ length: 36 }, (_, i) => {
                const n = (i + 1).toString();
                const isR = redNumbers.has(n);
                return `<button class="rt-num-box ${isR ? 'rt-red-n' : 'rt-black-n'}" data-bet="${n}">${n}</button>`;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-rt-half">1/2</button>
            <input type="number" id="input-rt-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-rt-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-rt-max">MAX</button>
          </div>
          <div class="chip-rack-selector">
            <button class="casino-chip-btn chip-10" data-val="10">10</button>
            <button class="casino-chip-btn chip-50" data-val="50">50</button>
            <button class="casino-chip-btn chip-100" data-val="100">100</button>
            <button class="casino-chip-btn chip-500" data-val="500">500</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-rt-spin" style="background: linear-gradient(135deg, #10b981, #059669); border-color: #34d399;">
              SPIN WHEEL 🎡
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#roulette-wheel-canvas');
    const ctx = canvas.getContext('2d');
    const elBet = container.querySelector('#input-rt-bet');
    const elStatus = container.querySelector('#roulette-status-msg');
    const btnSpin = container.querySelector('#btn-rt-spin');

    let wheelAngle = 0;
    let ballAngle = 0;
    let ballRadius = 135;

    function drawWheel() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer mahogany rim
      const gradRim = ctx.createRadialGradient(cx, cy, 140, cx, cy, 168);
      gradRim.addColorStop(0, '#581c87');
      gradRim.addColorStop(0.5, '#7e22ce');
      gradRim.addColorStop(1, '#3b0764');
      ctx.fillStyle = gradRim;
      ctx.beginPath();
      ctx.arc(cx, cy, 165, 0, Math.PI * 2);
      ctx.fill();

      // Golden brass divider track
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 145, 0, Math.PI * 2);
      ctx.stroke();

      const numSlices = numbers.length;
      const arc = (Math.PI * 2) / numSlices;

      // Pockets
      for (let i = 0; i < numSlices; i++) {
        const theta = wheelAngle + (i * arc);
        const n = numbers[i];
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 140, theta, theta + arc);
        ctx.closePath();

        if (n === '0' || n === '00') ctx.fillStyle = '#16a34a';
        else if (redNumbers.has(n)) ctx.fillStyle = '#dc2626';
        else ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Number text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(theta + arc / 2);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(n, 130, 4);
        ctx.restore();
      }

      // Center gold turret
      const gradTurret = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45);
      gradTurret.addColorStop(0, '#fef08a');
      gradTurret.addColorStop(0.6, '#d97706');
      gradTurret.addColorStop(1, '#78350f');
      ctx.fillStyle = gradTurret;
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ball
      const bx = cx + Math.cos(ballAngle) * ballRadius;
      const by = cy + Math.sin(ballAngle) * ballRadius;
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    drawWheel();

    container.querySelectorAll('.rt-bet-box, .rt-num-box').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.rt-bet-box, .rt-num-box').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedBet = b.dataset.bet;
        sound.click();
      };
    });

    container.querySelectorAll('.casino-chip-btn').forEach(b => {
      b.onclick = () => {
        const val = parseInt(b.dataset.val, 10);
        bet = Math.min(wallet.get(), bet + val);
        elBet.value = bet;
        sound.chip();
      };
    });

    container.querySelector('#btn-rt-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-rt-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-rt-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnSpin.onclick = () => {
      if (isSpinning) return;
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      isSpinning = true;
      btnSpin.disabled = true;
      sound.spin();
      elStatus.innerHTML = `<span style="color:#fde047">🎡 BALL IS IN PLAY... NO MORE BETS!</span>`;

      // Pick winning number
      const winIdx = Math.floor(Math.random() * numbers.length);
      const winNum = numbers[winIdx];
      const isRed = redNumbers.has(winNum);
      const numInt = parseInt(winNum, 10);

      let animStartTime = performance.now();
      const spinDuration = 3200;

      function animLoop(now) {
        const elapsed = now - animStartTime;
        const progress = Math.min(1, elapsed / spinDuration);
        const ease = 1 - Math.pow(1 - progress, 3);

        wheelAngle += (0.2 * (1 - ease * 0.7));
        ballAngle -= (0.4 * (1 - ease * 0.8));
        ballRadius = 135 - (40 * ease);

        drawWheel();

        if (progress < 1) {
          requestAnimationFrame(animLoop);
        } else {
          isSpinning = false;
          btnSpin.disabled = false;
          sound.chip();

          // Calculate win
          let won = false;
          let mult = 0;

          if (selectedBet === winNum) {
            won = true;
            mult = 36;
          } else if (selectedBet === 'red' && isRed) {
            won = true;
            mult = 2;
          } else if (selectedBet === 'black' && !isRed && winNum !== '0' && winNum !== '00') {
            won = true;
            mult = 2;
          } else if (selectedBet === 'even' && numInt > 0 && numInt % 2 === 0) {
            won = true;
            mult = 2;
          } else if (selectedBet === 'odd' && numInt > 0 && numInt % 2 === 1) {
            won = true;
            mult = 2;
          } else if (selectedBet === 'low' && numInt >= 1 && numInt <= 18) {
            won = true;
            mult = 2;
          } else if (selectedBet === 'high' && numInt >= 19 && numInt <= 36) {
            won = true;
            mult = 2;
          } else if (selectedBet === '1st12' && numInt >= 1 && numInt <= 12) {
            won = true;
            mult = 3;
          } else if (selectedBet === '2nd12' && numInt >= 13 && numInt <= 24) {
            won = true;
            mult = 3;
          } else if (selectedBet === '3rd12' && numInt >= 25 && numInt <= 36) {
            won = true;
            mult = 3;
          }

          if (won) {
            const winAmt = bet * mult;
            wallet.add(winAmt);
            sound.win();
            celebration.burst('win', 50);
            elStatus.innerHTML = `<span style="color:#fde047">🏆 LANDED ON ${winNum} (${isRed ? 'RED' : (winNum === '0' || winNum === '00' ? 'GREEN' : 'BLACK')})! WON $${winAmt.toLocaleString()}!</span>`;
          } else {
            sound.lose();
            elStatus.innerHTML = `<span style="color:#ef4444">Landed on ${winNum} (${isRed ? 'RED' : (winNum === '0' || winNum === '00' ? 'GREEN' : 'BLACK')}). Better luck next spin!</span>`;
          }
        }
      }

      requestAnimationFrame(animLoop);
    };
  }

  /* =========================================================================
     4G: 3D TUMBLING DICE & SIC BO & CRAPS
     ========================================================================= */
  function buildDiceGames(gameDef, container) {
    let bet = 100;
    let selectedBet = (gameDef.id === 'craps') ? 'pass' : ((gameDef.id === 'sicbo') ? 'small' : 'under');
    let isRolling = false;
    const isSicBo = (gameDef.id === 'sicbo');
    const isCraps = (gameDef.id === 'craps');
    const isCyberDice = (gameDef.id === 'dice');

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-dice">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="dice-3d-stage">
            <canvas id="dice-canvas-3d" width="380" height="200" class="dice-canvas"></canvas>
            <div class="dice-roll-total-pill" id="dice-total-pill">SUM: 7</div>
          </div>

          <div class="felt-center-banner" id="dice-status-msg">Choose your bet and roll the dice!</div>

          ${isSicBo ? `
            <div class="sicbo-bets-grid">
              <button class="rt-bet-box active" data-bet="small">SMALL (4-10) • 1:1</button>
              <button class="rt-bet-box" data-bet="big">BIG (11-17) • 1:1</button>
              <button class="rt-bet-box" data-bet="any_triple">ANY TRIPLE • 30:1</button>
              <button class="rt-bet-box" data-bet="sum_10">TOTAL 10 • 6:1</button>
              <button class="rt-bet-box" data-bet="sum_11">TOTAL 11 • 6:1</button>
            </div>
          ` : isCraps ? `
            <div class="craps-bets-grid">
              <button class="rt-bet-box active" data-bet="pass">PASS LINE (1:1)</button>
              <button class="rt-bet-box" data-bet="dont_pass">DON'T PASS (1:1)</button>
              <button class="rt-bet-box" data-bet="field">FIELD (2/3/4/9/10/11/12) • 1:1</button>
              <button class="rt-bet-box" data-bet="seven">ANY SEVEN • 4:1</button>
            </div>
          ` : `
            <div class="cyber-dice-grid">
              <button class="rt-bet-box active" data-bet="under">ROLL UNDER 7 (2.4x)</button>
              <button class="rt-bet-box" data-bet="seven">LUCKY SEVEN (5.8x)</button>
              <button class="rt-bet-box" data-bet="over">ROLL OVER 7 (2.4x)</button>
            </div>
          `}
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-dc-half">1/2</button>
            <input type="number" id="input-dc-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-dc-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-dc-max">MAX</button>
          </div>
          <div class="chip-rack-selector">
            <button class="casino-chip-btn chip-10" data-val="10">10</button>
            <button class="casino-chip-btn chip-50" data-val="50">50</button>
            <button class="casino-chip-btn chip-100" data-val="100">100</button>
            <button class="casino-chip-btn chip-500" data-val="500">500</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-dc-roll" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #fde047;">
              ROLL 3D DICE 🎲
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#dice-canvas-3d');
    const ctx = canvas.getContext('2d');
    const elBet = container.querySelector('#input-dc-bet');
    const elStatus = container.querySelector('#dice-status-msg');
    const elPill = container.querySelector('#dice-total-pill');
    const btnRoll = container.querySelector('#btn-dc-roll');

    let diceVals = isSicBo ? [4, 3, 3] : [3, 4];

    function drawDice(vals, rot = 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const count = vals.length;
      const spacing = canvas.width / (count + 1);

      vals.forEach((v, i) => {
        const cx = spacing * (i + 1);
        const cy = 100 + Math.sin(rot * 2 + i) * 15;
        const size = 68;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot * (i % 2 === 0 ? 1 : -1));

        // 3D Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.beginPath();
        ctx.roundRect(-size/2 + 6, -size/2 + 10, size, size, 14);
        ctx.fill();

        // Dice Body with glossy gradient
        const grad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.7, '#f1f5f9');
        grad.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = grad;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-size/2, -size/2, size, size, 12);
        ctx.fill();
        ctx.stroke();

        // Pips
        ctx.fillStyle = (v === 1 && isSicBo) ? '#dc2626' : '#0f172a';
        const drawPip = (px, py) => {
          ctx.beginPath();
          ctx.arc(px, py, 5.5, 0, Math.PI * 2);
          ctx.fill();
        };

        const o = 18;
        if (v === 1) drawPip(0, 0);
        else if (v === 2) { drawPip(-o, -o); drawPip(o, o); }
        else if (v === 3) { drawPip(-o, -o); drawPip(0, 0); drawPip(o, o); }
        else if (v === 4) { drawPip(-o, -o); drawPip(o, -o); drawPip(-o, o); drawPip(o, o); }
        else if (v === 5) { drawPip(-o, -o); drawPip(o, -o); drawPip(0, 0); drawPip(-o, o); drawPip(o, o); }
        else if (v === 6) { drawPip(-o, -o); drawPip(o, -o); drawPip(-o, 0); drawPip(o, 0); drawPip(-o, o); drawPip(o, o); }

        ctx.restore();
      });
    }

    drawDice(diceVals, 0);

    container.querySelectorAll('.rt-bet-box').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.rt-bet-box').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedBet = b.dataset.bet;
        sound.click();
      };
    });

    container.querySelectorAll('.casino-chip-btn').forEach(b => {
      b.onclick = () => {
        const val = parseInt(b.dataset.val, 10);
        bet = Math.min(wallet.get(), bet + val);
        elBet.value = bet;
        sound.chip();
      };
    });

    container.querySelector('#btn-dc-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-dc-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-dc-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnRoll.onclick = () => {
      if (isRolling) return;
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      isRolling = true;
      btnRoll.disabled = true;
      sound.dice();
      elStatus.innerHTML = `<span style="color:#fde047">🎲 ROLLING 3D DICE ACROSS THE TABLE...</span>`;

      const startTime = performance.now();
      const rollDuration = 1400;

      const anim = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / rollDuration);

        const tempVals = isSicBo 
          ? [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)]
          : [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)];
        
        drawDice(tempVals, Math.sin(elapsed * 0.02) * (1 - progress) * 1.5);

        if (progress < 1) {
          requestAnimationFrame(anim);
        } else {
          // Final values
          const finalVals = isSicBo 
            ? [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)]
            : [Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)];
          
          diceVals = finalVals;
          drawDice(finalVals, 0);
          isRolling = false;
          btnRoll.disabled = false;

          const sum = finalVals.reduce((a,b) => a + b, 0);
          elPill.textContent = `SUM: ${sum} (${finalVals.join(' + ')})`;

          let won = false;
          let mult = 0;

          if (isSicBo) {
            const isTriple = (finalVals[0] === finalVals[1] && finalVals[1] === finalVals[2]);
            if (selectedBet === 'small' && sum >= 4 && sum <= 10 && !isTriple) { won = true; mult = 2; }
            else if (selectedBet === 'big' && sum >= 11 && sum <= 17 && !isTriple) { won = true; mult = 2; }
            else if (selectedBet === 'any_triple' && isTriple) { won = true; mult = 31; }
            else if (selectedBet === 'sum_10' && sum === 10) { won = true; mult = 7; }
            else if (selectedBet === 'sum_11' && sum === 11) { won = true; mult = 7; }
          } else if (isCraps) {
            if (selectedBet === 'pass' && (sum === 7 || sum === 11)) { won = true; mult = 2; }
            else if (selectedBet === 'dont_pass' && (sum === 2 || sum === 3)) { won = true; mult = 2; }
            else if (selectedBet === 'field' && [2,3,4,9,10,11,12].includes(sum)) { won = true; mult = 2; }
            else if (selectedBet === 'seven' && sum === 7) { won = true; mult = 5; }
          } else {
            // Cyber Dice
            if (selectedBet === 'under' && sum < 7) { won = true; mult = 2.4; }
            else if (selectedBet === 'over' && sum > 7) { won = true; mult = 2.4; }
            else if (selectedBet === 'seven' && sum === 7) { won = true; mult = 5.8; }
          }

          if (won) {
            const winAmt = Math.floor(bet * mult);
            wallet.add(winAmt);
            sound.win();
            celebration.burst('win', 40);
            elStatus.innerHTML = `<span style="color:#fde047">🏆 WINNER! Sum ${sum} matched your bet for $${winAmt.toLocaleString()}!</span>`;
          } else {
            sound.lose();
            elStatus.innerHTML = `<span style="color:#ef4444">Sum was ${sum}. Better luck next roll!</span>`;
          }
        }
      };

      requestAnimationFrame(anim);
    };
  }

  /* =========================================================================
     4H: 3D COIN FLIP STREAK
     ========================================================================= */
  function buildCoinFlip(gameDef, container) {
    let bet = 100;
    let selectedSide = 'heads'; // 'heads' or 'tails'
    let streak = 0;
    let isFlipping = false;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-coinflip">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="coinflip-3d-arena">
            <div class="coinflip-coin-box" id="cf-coin-box">
              <div class="coin-3d-disc" id="cf-coin">
                <div class="coin-face heads">👑<br><span style="font-size:0.8rem; letter-spacing:1px;">BORGOR</span></div>
                <div class="coin-face tails">🦅<br><span style="font-size:0.8rem; letter-spacing:1px;">CYBER</span></div>
              </div>
            </div>
            <div class="coinflip-streak-meter" id="cf-streak-meter">STREAK: 0 WINS • NEXT MULTIPLIER: 1.96x</div>
          </div>

          <div class="felt-center-banner" id="cf-status-msg">Choose HEADS or TAILS and flip!</div>

          <div class="coinflip-choice-row">
            <button class="cf-side-btn active" data-side="heads">HEADS 👑 (1.96x)</button>
            <button class="cf-side-btn" data-side="tails">TAILS 🦅 (1.96x)</button>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-cf-half">1/2</button>
            <input type="number" id="input-cf-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-cf-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-cf-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-cf-flip" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #fde047;">
              FLIP 3D COIN 🪙
            </button>
            <button class="btn-action" id="btn-cf-cashout" style="display:none; background:#10b981; border-color:#34d399;">
              CASH OUT 💰
            </button>
          </div>
        </div>
      </div>
    `;

    const coin = container.querySelector('#cf-coin');
    const elBet = container.querySelector('#input-cf-bet');
    const elStatus = container.querySelector('#cf-status-msg');
    const elMeter = container.querySelector('#cf-streak-meter');
    const btnFlip = container.querySelector('#btn-cf-flip');
    const btnCash = container.querySelector('#btn-cf-cashout');

    container.querySelectorAll('.cf-side-btn').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.cf-side-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedSide = b.dataset.side;
        sound.click();
      };
    });

    container.querySelector('#btn-cf-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-cf-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-cf-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnCash.onclick = () => {
      const pot = Math.floor(bet * Math.pow(1.96, streak));
      wallet.add(pot);
      sound.cashout();
      celebration.burst('win', 40);
      elStatus.innerHTML = `<span style="color:#fde047">🏆 CASHED OUT $${pot.toLocaleString()}! Streak secured!</span>`;
      streak = 0;
      elMeter.textContent = `STREAK: 0 • NEXT MULTIPLIER: 1.96x`;
      btnCash.style.display = 'none';
      btnFlip.disabled = false;
    };

    btnFlip.onclick = () => {
      if (isFlipping) return;
      if (streak === 0) {
        bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
        if (!wallet.deduct(bet)) {
          sound.lose();
          elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
          return;
        }
      }

      isFlipping = true;
      btnFlip.disabled = true;
      btnCash.style.display = 'none';
      sound.chip();

      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      const rotations = 5 + Math.floor(Math.random() * 4);
      const finalDeg = (rotations * 360) + (result === 'tails' ? 180 : 0);

      coin.style.transition = 'transform 1.6s cubic-bezier(0.12, 0.8, 0.32, 1)';
      coin.style.transform = `perspective(800px) rotateY(${finalDeg}deg) translateY(-40px)`;

      setTimeout(() => {
        coin.style.transform = `perspective(800px) rotateY(${finalDeg}deg) translateY(0px)`;
      }, 1200);

      setTimeout(() => {
        isFlipping = false;
        btnFlip.disabled = false;

        if (result === selectedSide) {
          streak++;
          const pot = Math.floor(bet * Math.pow(1.96, streak));
          sound.win();
          celebration.burst('win', 35);
          elMeter.textContent = `STREAK: ${streak} 🔥 • CURRENT POT: $${pot.toLocaleString()} (${Math.pow(1.96, streak).toFixed(2)}x)`;
          elStatus.innerHTML = `<span style="color:#10b981">🏆 Landed on ${result.toUpperCase()}! Flip again or cash out!</span>`;
          btnCash.style.display = 'inline-flex';
          btnCash.textContent = `CASH OUT $${pot.toLocaleString()} 💰`;
        } else {
          sound.lose();
          streak = 0;
          elMeter.textContent = `STREAK: 0 • NEXT MULTIPLIER: 1.96x`;
          elStatus.innerHTML = `<span style="color:#ef4444">Landed on ${result.toUpperCase()}. Streak lost!</span>`;
        }
      }, 1650);
    };
  }

  /* =========================================================================
     4I: 3D WHEEL OF FORTUNE (54 Pockets Mega Wheel)
     ========================================================================= */
  function buildWheelOfFortune(gameDef, container) {
    let bet = 100;
    let selectedMult = 2; // 1, 2, 5, 10, 20, 40
    let isSpinning = false;

    const segments = [
      { mult: 1, color: '#38bdf8' },
      { mult: 2, color: '#f59e0b' },
      { mult: 1, color: '#38bdf8' },
      { mult: 5, color: '#10b981' },
      { mult: 2, color: '#f59e0b' },
      { mult: 1, color: '#38bdf8' },
      { mult: 10, color: '#8b5cf6' },
      { mult: 2, color: '#f59e0b' },
      { mult: 1, color: '#38bdf8' },
      { mult: 20, color: '#ec4899' },
      { mult: 5, color: '#10b981' },
      { mult: 1, color: '#38bdf8' },
      { mult: 40, color: '#ef4444' },
      { mult: 2, color: '#f59e0b' },
      { mult: 1, color: '#38bdf8' },
      { mult: 100, color: '#fde047' } // MEGA
    ];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-wheel">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="wheel-canvas-container">
            <canvas id="wheel-3d-canvas" width="340" height="340" class="wheel-canvas"></canvas>
            <div class="wheel-top-flapper">▼</div>
          </div>

          <div class="felt-center-banner" id="wheel-status-msg">Select your target multiplier and spin the carnival wheel!</div>

          <div class="wheel-bet-selector">
            <button class="rt-bet-box" data-mult="1">1x (EVEN)</button>
            <button class="rt-bet-box active" data-mult="2">2x (DOUBLE)</button>
            <button class="rt-bet-box" data-mult="5">5x (SUPER)</button>
            <button class="rt-bet-box" data-mult="10">10x (MEGA)</button>
            <button class="rt-bet-box" data-mult="20">20x (ULTRA)</button>
            <button class="rt-bet-box" data-mult="40">40x (JACKPOT)</button>
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-wh-half">1/2</button>
            <input type="number" id="input-wh-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-wh-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-wh-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-wh-spin" style="background: linear-gradient(135deg, #ec4899, #be185d); border-color: #f472b6;">
              SPIN WHEEL 🎡
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#wheel-3d-canvas');
    const ctx = canvas.getContext('2d');
    const elBet = container.querySelector('#input-wh-bet');
    const elStatus = container.querySelector('#wheel-status-msg');
    const btnSpin = container.querySelector('#btn-wh-spin');

    let currentAngle = 0;

    function drawWheel() {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const n = segments.length;
      const arc = (Math.PI * 2) / n;

      for (let i = 0; i < n; i++) {
        const seg = segments[i];
        const theta = currentAngle + (i * arc);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 155, theta, theta + arc);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();
        ctx.strokeStyle = '#090d16';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Label
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(theta + arc / 2);
        ctx.fillStyle = (seg.mult === 100) ? '#000' : '#ffffff';
        ctx.font = '900 13px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(seg.mult + 'x', 140, 5);
        ctx.restore();
      }

      // Outer gold rim with bulbs
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx, cy, 158, 0, Math.PI * 2);
      ctx.stroke();

      // Bulbs
      for (let b = 0; b < 24; b++) {
        const bRad = (b * Math.PI * 2) / 24;
        const bx = cx + Math.cos(bRad) * 158;
        const by = cy + Math.sin(bRad) * 158;
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }

      // Center cap
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    drawWheel();

    container.querySelectorAll('.wheel-bet-selector button').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.wheel-bet-selector button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedMult = parseInt(b.dataset.mult, 10);
        sound.click();
      };
    });

    container.querySelector('#btn-wh-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-wh-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-wh-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnSpin.onclick = () => {
      if (isSpinning) return;
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      isSpinning = true;
      btnSpin.disabled = true;
      sound.spin();
      elStatus.innerHTML = `<span style="color:#fde047">🎡 SPINNING THE WHEEL OF FORTUNE...</span>`;

      const startTime = performance.now();
      const spinDuration = 3000;
      const targetSegIdx = Math.floor(Math.random() * segments.length);
      const segArc = (Math.PI * 2) / segments.length;
      // Top flapper is at -PI/2
      const targetAngle = (Math.PI * 2 * 6) - (targetSegIdx * segArc) - (segArc / 2) - (Math.PI / 2);

      const anim = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / spinDuration);
        const ease = 1 - Math.pow(1 - progress, 3);

        currentAngle = targetAngle * ease;
        drawWheel();

        if (progress < 1) {
          requestAnimationFrame(anim);
        } else {
          isSpinning = false;
          btnSpin.disabled = false;
          const hit = segments[targetSegIdx];

          if (hit.mult === selectedMult) {
            const winAmt = bet * hit.mult;
            wallet.add(winAmt);
            sound.win();
            celebration.burst('win', 45);
            elStatus.innerHTML = `<span style="color:#fde047">🏆 WON ${hit.mult}x MULTIPLIER! Payout: $${winAmt.toLocaleString()}!</span>`;
          } else {
            sound.lose();
            elStatus.innerHTML = `<span style="color:#ef4444">Wheel landed on ${hit.mult}x. Better luck next spin!</span>`;
          }
        }
      };

      requestAnimationFrame(anim);
    };
  }

  /* =========================================================================
     4J: NEON KENO MEGA 80 (Hopper & Drawn Balls)
     ========================================================================= */
  function buildKeno(gameDef, container) {
    let bet = 100;
    let selectedNumbers = new Set();
    let isDrawing = false;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-keno">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="keno-status-bar">
            <div class="keno-picks-count" id="keno-picks-pill">PICKED: 0 / 10</div>
            <div class="felt-center-banner" id="keno-status-msg">Pick up to 10 numbers or Quick Pick!</div>
            <div class="keno-actions-row">
              <button class="btn-ctrl-sub" id="btn-keno-quick">QUICK PICK 5</button>
              <button class="btn-ctrl-sub" id="btn-keno-clear">CLEAR</button>
            </div>
          </div>

          <div class="keno-grid-board" id="keno-grid">
            ${Array.from({ length: 80 }, (_, i) => `<button class="keno-num-btn" data-num="${i+1}">${i+1}</button>`).join('')}
          </div>

          <div class="keno-drawn-tray" id="keno-drawn-tray"></div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-kn-half">1/2</button>
            <input type="number" id="input-kn-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-kn-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-kn-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-kn-play" style="background: linear-gradient(135deg, #06b6d4, #0891b2); border-color: #67e8f9;">
              DRAW 20 BALLS 🎱
            </button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-kn-bet');
    const elStatus = container.querySelector('#keno-status-msg');
    const elPill = container.querySelector('#keno-picks-pill');
    const elTray = container.querySelector('#keno-drawn-tray');
    const btnPlay = container.querySelector('#btn-kn-play');

    function updatePill() {
      elPill.textContent = `PICKED: ${selectedNumbers.size} / 10`;
    }

    container.querySelectorAll('.keno-num-btn').forEach(b => {
      b.onclick = () => {
        if (isDrawing) return;
        const n = parseInt(b.dataset.num, 10);
        if (selectedNumbers.has(n)) {
          selectedNumbers.delete(n);
          b.classList.remove('selected');
        } else {
          if (selectedNumbers.size >= 10) return;
          selectedNumbers.add(n);
          b.classList.add('selected');
        }
        sound.click();
        updatePill();
      };
    });

    container.querySelector('#btn-keno-quick').onclick = () => {
      if (isDrawing) return;
      selectedNumbers.clear();
      container.querySelectorAll('.keno-num-btn').forEach(x => x.classList.remove('selected'));
      while (selectedNumbers.size < 5) {
        const r = Math.floor(Math.random() * 80) + 1;
        selectedNumbers.add(r);
        container.querySelector(`.keno-num-btn[data-num="${r}"]`).classList.add('selected');
      }
      sound.click();
      updatePill();
    };

    container.querySelector('#btn-keno-clear').onclick = () => {
      if (isDrawing) return;
      selectedNumbers.clear();
      container.querySelectorAll('.keno-num-btn').forEach(x => {
        x.classList.remove('selected');
        x.classList.remove('drawn');
        x.classList.remove('matched');
      });
      elTray.innerHTML = '';
      sound.click();
      updatePill();
    };

    container.querySelector('#btn-kn-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-kn-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-kn-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnPlay.onclick = () => {
      if (isDrawing) return;
      if (selectedNumbers.size === 0) {
        elStatus.innerHTML = `<span style="color:#ef4444">Please select at least 1 number or click Quick Pick!</span>`;
        return;
      }
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      isDrawing = true;
      btnPlay.disabled = true;
      elTray.innerHTML = '';
      container.querySelectorAll('.keno-num-btn').forEach(x => {
        x.classList.remove('drawn');
        x.classList.remove('matched');
      });

      // Draw 20 unique balls
      const drawn = new Set();
      while (drawn.size < 20) {
        drawn.add(Math.floor(Math.random() * 80) + 1);
      }
      const drawnArr = Array.from(drawn);

      let hits = 0;
      drawnArr.forEach((num, idx) => {
        setTimeout(() => {
          sound.chip();
          const btn = container.querySelector(`.keno-num-btn[data-num="${num}"]`);
          const isHit = selectedNumbers.has(num);
          if (btn) {
            btn.classList.add(isHit ? 'matched' : 'drawn');
          }
          if (isHit) hits++;

          const ballEl = document.createElement('div');
          ballEl.className = `keno-ball-chip ${isHit ? 'hit' : ''}`;
          ballEl.textContent = num;
          elTray.appendChild(ballEl);

          if (idx === 19) {
            isDrawing = false;
            btnPlay.disabled = false;

            // Multipliers based on hits
            const mults = { 0: 0, 1: 0.5, 2: 1.5, 3: 4, 4: 12, 5: 40, 6: 150, 7: 500, 8: 2000 };
            const m = mults[hits] || (hits > 8 ? 5000 : 0);

            if (m > 0) {
              const winAmt = Math.floor(bet * m);
              wallet.add(winAmt);
              sound.win();
              celebration.burst('win', 40);
              elStatus.innerHTML = `<span style="color:#fde047">🏆 ${hits} MATCHES! Won $${winAmt.toLocaleString()} (${m}x)!</span>`;
            } else {
              sound.lose();
              elStatus.innerHTML = `<span style="color:#ef4444">${hits} matches. Better luck next draw!</span>`;
            }
          }
        }, idx * 75);
      });
    };
  }

  /* =========================================================================
     4K: CYBER HORSE SPRINT DERBY & INTERACTIVE MINI-GAMES
     ========================================================================= */
  function buildHorseDerby(gameDef, container) {
    let bet = 100;
    let selectedHorse = 0; // 0 to 5
    let isRacing = false;

    const horses = [
      { name: '#1 Borgor Blitz', color: '#ef4444', odds: 2.5 },
      { name: '#2 Cyber Phantom', color: '#06b6d4', odds: 4.0 },
      { name: '#3 Neon Thunder', color: '#f59e0b', odds: 6.0 },
      { name: '#4 Golden Stallion', color: '#fde047', odds: 9.0 },
      { name: '#5 Shadow Runner', color: '#8b5cf6', odds: 15.0 },
      { name: '#6 Lucky Outlaw', color: '#10b981', odds: 30.0 }
    ];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-derby">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="derby-track-stage" id="derby-track">
            ${horses.map((h, i) => `
              <div class="derby-lane" id="lane-${i}">
                <div class="derby-horse-runner" id="horse-${i}" style="background:${h.color}; border-color:#fff;">
                  🏇 ${h.name.split(' ')[0]}
                </div>
                <div class="derby-lane-line"></div>
              </div>
            `).join('')}
            <div class="derby-finish-line"></div>
          </div>

          <div class="felt-center-banner" id="derby-status-msg">Pick your cyber stallion and start the sprint!</div>

          <div class="derby-horse-selector">
            ${horses.map((h, i) => `
              <button class="rt-bet-box ${i === 0 ? 'active' : ''}" data-idx="${i}" style="border-left: 4px solid ${h.color};">
                ${h.name} (${h.odds}x)
              </button>
            `).join('')}
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-hb-half">1/2</button>
            <input type="number" id="input-hb-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-hb-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-hb-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-hb-race" style="background: linear-gradient(135deg, #10b981, #059669); border-color: #34d399;">
              START DERBY 🏁
            </button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-hb-bet');
    const elStatus = container.querySelector('#derby-status-msg');
    const btnRace = container.querySelector('#btn-hb-race');

    container.querySelectorAll('.derby-horse-selector button').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('.derby-horse-selector button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        selectedHorse = parseInt(b.dataset.idx, 10);
        sound.click();
      };
    });

    container.querySelector('#btn-hb-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-hb-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-hb-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnRace.onclick = () => {
      if (isRacing) return;
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      isRacing = true;
      btnRace.disabled = true;
      sound.rocket();
      elStatus.innerHTML = `<span style="color:#fde047">🏁 AND THEY'RE OFF! GALLOPING TOWARDS THE FINISH!</span>`;

      const startTime = performance.now();
      const raceDuration = 3500;
      const speeds = horses.map(() => 0.8 + Math.random() * 0.4);

      function anim(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / raceDuration);

        horses.forEach((_, i) => {
          const runner = container.querySelector(`#horse-${i}`);
          const curPct = Math.min(88, (progress * 88 * speeds[i]) + (Math.sin(elapsed * 0.01 + i) * 2));
          runner.style.left = `${curPct}%`;
        });

        if (progress < 1) {
          requestAnimationFrame(anim);
        } else {
          isRacing = false;
          btnRace.disabled = false;

          // Pick winner with weighting
          const winnerIdx = Math.floor(Math.random() * horses.length);
          const winner = horses[winnerIdx];

          horses.forEach((_, i) => {
            const runner = container.querySelector(`#horse-${i}`);
            runner.style.left = (i === winnerIdx ? '92%' : `${75 + Math.random()*10}%`);
          });

          if (winnerIdx === selectedHorse) {
            const winAmt = Math.floor(bet * winner.odds);
            wallet.add(winAmt);
            sound.win();
            celebration.burst('win', 45);
            elStatus.innerHTML = `<span style="color:#fde047">🏆 ${winner.name.toUpperCase()} CROSSED THE WIRE FIRST! Won $${winAmt.toLocaleString()}!</span>`;
          } else {
            sound.lose();
            elStatus.innerHTML = `<span style="color:#ef4444">${winner.name} won the race. Better luck next derby!</span>`;
          }
        }
      }

      requestAnimationFrame(anim);
    };
  }

  /* =========================================================================
     4L: SCRATCH & WIN (Neon Gold Foil Scratching)
     ========================================================================= */
  function buildScratchGold(gameDef, container) {
    let bet = 100;
    const symbols = ['💎', '👑', '777', '⭐', '🔔', '🍒'];
    let grid = [];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-scratch">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="scratch-card-box">
            <div class="scratch-under-grid" id="scratch-under-grid">
              ${Array.from({ length: 9 }, (_, i) => `<div class="scratch-cell" id="sc-cell-${i}">?</div>`).join('')}
            </div>
            <canvas id="scratch-foil-canvas" width="300" height="300" class="scratch-foil-layer"></canvas>
          </div>

          <div class="felt-center-banner" id="sc-status-msg">Scratch the gold foil to reveal 3 matching symbols!</div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">CARD PRICE</span>
            <button class="btn-ctrl-sub" id="btn-sc-half">1/2</button>
            <input type="number" id="input-sc-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-sc-double">2x</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-sc-buy" style="background: linear-gradient(135deg, #f59e0b, #d97706); border-color: #fde047;">
              BUY NEW TICKET 🎟️
            </button>
            <button class="btn-action" id="btn-sc-instant" style="background: #3b82f6; border-color: #60a5fa;">
              INSTANT SCRATCH ⚡
            </button>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#scratch-foil-canvas');
    const ctx = canvas.getContext('2d');
    const elBet = container.querySelector('#input-sc-bet');
    const elStatus = container.querySelector('#sc-status-msg');
    const btnBuy = container.querySelector('#btn-sc-buy');
    const btnInstant = container.querySelector('#btn-sc-instant');

    function resetFoil() {
      ctx.globalCompositeOperation = 'source-over';
      const grad = ctx.createLinearGradient(0, 0, 300, 300);
      grad.addColorStop(0, '#fde047');
      grad.addColorStop(0.5, '#d97706');
      grad.addColorStop(1, '#78350f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH HERE TO WIN', 150, 155);
    }

    resetFoil();

    function scratchAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    let isScratching = false;
    canvas.onmousedown = (e) => { isScratching = true; const r = canvas.getBoundingClientRect(); scratchAt(e.clientX - r.left, e.clientY - r.top); };
    window.onmouseup = () => { isScratching = false; };
    canvas.onmousemove = (e) => {
      if (!isScratching) return;
      const r = canvas.getBoundingClientRect();
      scratchAt(e.clientX - r.left, e.clientY - r.top);
    };

    btnBuy.onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      sound.chip();
      resetFoil();

      // Generate 9 symbols
      const pick = () => symbols[Math.floor(Math.random() * symbols.length)];
      grid = [pick(), pick(), pick(), pick(), pick(), pick(), pick(), pick(), pick()];

      // 35% chance to force a 3-match
      if (Math.random() < 0.35) {
        const winSym = symbols[Math.floor(Math.random() * 3)];
        grid[0] = winSym; grid[4] = winSym; grid[8] = winSym;
      }

      grid.forEach((s, i) => {
        container.querySelector(`#sc-cell-${i}`).textContent = s;
      });

      elStatus.innerHTML = 'Scratch the card to uncover your prizes!';
    };

    btnInstant.onclick = () => {
      ctx.clearRect(0, 0, 300, 300);
      sound.win();

      // Check match 3
      const counts = {};
      grid.forEach(s => counts[s] = (counts[s] || 0) + 1);
      let match = null;
      for (const [sym, count] of Object.entries(counts)) {
        if (count >= 3) { match = sym; break; }
      }

      if (match) {
        const mult = (match === '💎' ? 50 : (match === '👑' ? 25 : (match === '777' ? 10 : 3)));
        const winAmt = bet * mult;
        wallet.add(winAmt);
        sound.bigWin();
        celebration.burst('win', 40);
        elStatus.innerHTML = `<span style="color:#fde047">🏆 MATCH 3 ${match}! WON $${winAmt.toLocaleString()} (${mult}x)!</span>`;
      } else {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">No 3-of-a-kind match. Try another ticket!</span>`;
      }
    };
  }

  /* =========================================================================
     4M: LIMBO & TOWER CLIMB
     ========================================================================= */
  function buildLimbo(gameDef, container) {
    let bet = 100;
    let target = 2.0;

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-limbo">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="limbo-target-arena">
            <div class="limbo-mult-display" id="limbo-result-num">1.00x</div>
            <div class="limbo-win-prob-pill" id="limbo-prob-pill">WIN CHANCE: 49.5%</div>
          </div>

          <div class="felt-center-banner" id="limbo-status-msg">Set target multiplier and launch turbo rocket!</div>

          <div class="limbo-input-row">
            <span class="bet-label">TARGET MULTIPLIER:</span>
            <input type="number" id="input-limbo-target" class="bet-number-input" value="2.00" min="1.05" max="1000" step="0.5">
          </div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-lb-half">1/2</button>
            <input type="number" id="input-lb-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-lb-double">2x</button>
            <button class="btn-ctrl-sub" id="btn-lb-max">MAX</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-lb-play" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-color: #a78bfa;">
              LAUNCH ROCKET 🚀
            </button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-lb-bet');
    const elTarget = container.querySelector('#input-limbo-target');
    const elResult = container.querySelector('#limbo-result-num');
    const elProb = container.querySelector('#limbo-prob-pill');
    const elStatus = container.querySelector('#limbo-status-msg');
    const btnPlay = container.querySelector('#btn-lb-play');

    elTarget.oninput = () => {
      target = Math.max(1.05, parseFloat(elTarget.value) || 2.0);
      const prob = (99 / target).toFixed(1);
      elProb.textContent = `WIN CHANCE: ${prob}%`;
    };

    container.querySelector('#btn-lb-half').onclick = () => { bet = Math.max(10, Math.floor(bet / 2)); elBet.value = bet; };
    container.querySelector('#btn-lb-double').onclick = () => { bet = Math.min(wallet.get(), bet * 2); elBet.value = bet; };
    container.querySelector('#btn-lb-max').onclick = () => { bet = wallet.get(); elBet.value = bet; };
    elBet.onchange = (e) => { bet = Math.max(10, Math.min(wallet.get(), parseInt(e.target.value, 10) || 10)); };

    btnPlay.onclick = () => {
      target = Math.max(1.05, parseFloat(elTarget.value) || 2.0);
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      sound.rocket();
      btnPlay.disabled = true;

      // Limbo crash calculation
      const r = Math.random();
      const outcome = (r === 0) ? 1.00 : parseFloat((0.99 / r).toFixed(2));

      let cur = 1.00;
      const interval = setInterval(() => {
        cur *= 1.35;
        if (cur >= outcome) {
          clearInterval(interval);
          cur = outcome;
          elResult.textContent = `${cur.toFixed(2)}x`;
          btnPlay.disabled = false;

          if (outcome >= target) {
            const winAmt = Math.floor(bet * target);
            wallet.add(winAmt);
            sound.win();
            celebration.burst('win', 40);
            elResult.style.color = '#10b981';
            elStatus.innerHTML = `<span style="color:#fde047">🏆 ROCKET REACHED ${outcome.toFixed(2)}x! WON $${winAmt.toLocaleString()}!</span>`;
          } else {
            sound.boom();
            elResult.style.color = '#ef4444';
            elStatus.innerHTML = `<span style="color:#ef4444">💥 BUSTED AT ${outcome.toFixed(2)}x! Target was ${target}x.</span>`;
          }
        } else {
          elResult.textContent = `${cur.toFixed(2)}x`;
          elResult.style.color = '#fde047';
        }
      }, 50);
    };
  }

  function buildTowerClimb(gameDef, container) {
    let bet = 100;
    let floor = 0;
    let inClimb = false;
    const multipliers = [1.35, 1.85, 2.55, 3.60, 5.20, 7.80, 12.0, 19.0, 32.0];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="table-felt felt-tower">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>

          <div class="tower-spire-stage" id="tower-spire">
            ${Array.from({ length: 9 }, (_, f) => {
              const floorIdx = 8 - f; // Top is floor 8
              return `
                <div class="tower-floor-row" id="tower-floor-${floorIdx}">
                  <span class="tower-floor-mult">${multipliers[floorIdx]}x</span>
                  <div class="tower-doors-group">
                    <button class="tower-door-btn" data-floor="${floorIdx}" data-door="0">🚪</button>
                    <button class="tower-door-btn" data-floor="${floorIdx}" data-door="1">🚪</button>
                    <button class="tower-door-btn" data-floor="${floorIdx}" data-door="2">🚪</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="felt-center-banner" id="tower-status-msg">Ascend the tower! 2 doors are safe, 1 door is trapped.</div>
        </div>

        <div class="theater-controls-bar">
          <div class="bet-adjust-group">
            <span class="bet-label">BET</span>
            <button class="btn-ctrl-sub" id="btn-tw-half">1/2</button>
            <input type="number" id="input-tw-bet" class="bet-number-input" value="${bet}" min="10" max="10000" step="50">
            <button class="btn-ctrl-sub" id="btn-tw-double">2x</button>
          </div>
          <div class="action-buttons-group">
            <button class="btn-action primary" id="btn-tw-start">START CLIMB 🗼</button>
            <button class="btn-action" id="btn-tw-cashout" style="display:none; background:#10b981; border-color:#34d399;">CASH OUT 💰</button>
          </div>
        </div>
      </div>
    `;

    const elBet = container.querySelector('#input-tw-bet');
    const elStatus = container.querySelector('#tower-status-msg');
    const btnStart = container.querySelector('#btn-tw-start');
    const btnCash = container.querySelector('#btn-tw-cashout');

    function highlightFloor() {
      container.querySelectorAll('.tower-floor-row').forEach(r => r.classList.remove('active-floor'));
      const curRow = container.querySelector(`#tower-floor-${floor}`);
      if (curRow) curRow.classList.add('active-floor');
    }

    container.querySelectorAll('.tower-door-btn').forEach(b => {
      b.onclick = () => {
        if (!inClimb) return;
        const f = parseInt(b.dataset.floor, 10);
        if (f !== floor) return;

        const trapDoor = Math.floor(Math.random() * 3);
        const chosenDoor = parseInt(b.dataset.door, 10);

        if (chosenDoor === trapDoor) {
          b.textContent = '💀';
          b.style.background = '#ef4444';
          sound.boom();
          inClimb = false;
          elStatus.innerHTML = `<span style="color:#ef4444">💥 TRAPPED ON FLOOR ${floor+1}! Stake lost.</span>`;
          btnStart.style.display = 'inline-flex';
          btnCash.style.display = 'none';
        } else {
          b.textContent = '💎';
          b.style.background = '#10b981';
          sound.win();
          floor++;
          const curMult = multipliers[floor - 1];
          const pot = Math.floor(bet * curMult);
          elStatus.innerHTML = `<span style="color:#10b981">✨ Floor ${floor} Cleared! Current Pot: $${pot.toLocaleString()} (${curMult}x)</span>`;
          btnCash.style.display = 'inline-flex';
          btnCash.textContent = `CASH OUT $${pot.toLocaleString()} 💰`;

          if (floor >= 9) {
            wallet.add(pot);
            sound.bigWin();
            celebration.burst('jackpot', 50);
            elStatus.innerHTML = `<span style="color:#fde047">👑 SPIRE CONQUERED! Jackpotted $${pot.toLocaleString()}!</span>`;
            inClimb = false;
            btnStart.style.display = 'inline-flex';
            btnCash.style.display = 'none';
          } else {
            highlightFloor();
          }
        }
      };
    });

    btnStart.onclick = () => {
      bet = Math.max(10, Math.min(wallet.get(), parseInt(elBet.value, 10) || 10));
      if (!wallet.deduct(bet)) {
        sound.lose();
        elStatus.innerHTML = `<span style="color:#ef4444">Insufficient coins!</span>`;
        return;
      }

      sound.chip();
      floor = 0;
      inClimb = true;
      btnStart.style.display = 'none';
      btnCash.style.display = 'none';

      container.querySelectorAll('.tower-door-btn').forEach(b => {
        b.textContent = '🚪';
        b.style.background = '';
      });

      highlightFloor();
      elStatus.innerHTML = 'Pick 1 of 3 doors on Floor 1!';
    };

    btnCash.onclick = () => {
      if (!inClimb || floor === 0) return;
      const curMult = multipliers[floor - 1];
      const pot = Math.floor(bet * curMult);
      wallet.add(pot);
      sound.cashout();
      celebration.burst('win', 40);
      elStatus.innerHTML = `<span style="color:#fde047">🏆 CASHED OUT $${pot.toLocaleString()}! Great climb!</span>`;
      inClimb = false;
      btnStart.style.display = 'inline-flex';
      btnCash.style.display = 'none';
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
      const ayudaBtn = shell.querySelector('#th-btn-ayuda');
      const updateTheaterAyudaBtn = () => {
        if (!ayudaBtn) return;
        const rem = wallet.getAyudaCooldownRemaining();
        if (rem > 0) {
          const mins = Math.floor(rem / 60000);
          const secs = Math.floor((rem % 60000) / 1000);
          ayudaBtn.textContent = `⏳ ${mins}m ${secs}s`;
          ayudaBtn.style.opacity = '0.75';
          ayudaBtn.title = `Next Ayuda in ${mins}m ${secs}s`;
        } else {
          ayudaBtn.textContent = '🎁 Ayuda';
          ayudaBtn.style.opacity = '1';
          ayudaBtn.title = 'Claim 2,000 Free Coins';
        }
      };

      ayudaBtn.onclick = () => {
        const res = wallet.claimAyuda();
        if (!res.success) {
          const mins = Math.floor(res.remainingMs / 60000);
          const secs = Math.floor((res.remainingMs % 60000) / 1000);
          sound.lose();
          this.showCelebration('⏳ COOLDOWN ACTIVE', `Next refill in ${mins}m ${secs}s`);
        } else {
          this.showCelebration('🎁 AYUDA CLAIMED', '+2,000 Free Coins (1 hr cooldown)');
        }
        updateTheaterAyudaBtn();
      };

      setInterval(updateTheaterAyudaBtn, 1000);
      updateTheaterAyudaBtn();

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
      } else if (['vp_jacks', 'vp_deuces', 'vp_joker'].includes(gameDef.id)) {
        buildVideoPoker(gameDef, viewport);
      } else if (['holdem_heads_up', 'three_card_poker', 'caribbean_stud', 'pai_gow_poker'].includes(gameDef.id)) {
        buildPokerTable(gameDef, viewport);
      } else if (['casino_war', 'dragon_tiger', 'hilo_cards', 'red_dog', 'andar_bahar', 'teen_patti', 'tongits_blitz'].includes(gameDef.id)) {
        buildCardShowdown(gameDef, viewport);
      } else if (['roulette_euro', 'roulette_us'].includes(gameDef.id)) {
        buildRoulette(gameDef, viewport);
      } else if (['dice', 'sicbo', 'craps'].includes(gameDef.id)) {
        buildDiceGames(gameDef, viewport);
      } else if (gameDef.id === 'coinflip') {
        buildCoinFlip(gameDef, viewport);
      } else if (gameDef.id === 'wheel') {
        buildWheelOfFortune(gameDef, viewport);
      } else if (gameDef.id === 'keno') {
        buildKeno(gameDef, viewport);
      } else if (gameDef.id === 'horse_derby') {
        buildHorseDerby(gameDef, viewport);
      } else if (gameDef.id === 'scratch_gold') {
        buildScratchGold(gameDef, viewport);
      } else if (gameDef.id === 'limbo') {
        buildLimbo(gameDef, viewport);
      } else if (gameDef.id === 'tower_climb') {
        buildTowerClimb(gameDef, viewport);
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
        buildCardShowdown(gameDef, viewport);
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
