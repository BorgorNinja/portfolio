/**
 * BORGOR ARCADIA & GRAND CASINO — UNIVERSAL ENGINE
 * High-performance, 60 FPS, Web Audio powered gaming engine for all 52+ games.
 */
(function() {
  'use strict';

  /* =========================================================================
     1. WEB AUDIO PROCEDURAL SYNTHESIZER
     ========================================================================= */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('borgor_arcade_muted') === '1';
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
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
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    chip() {
      this.playTone(1800, 'sine', 0.04, 0.12);
      setTimeout(() => this.playTone(2400, 'triangle', 0.05, 0.08), 25);
    }

    card() {
      this.playTone(400, 'triangle', 0.06, 0.1);
      setTimeout(() => this.playTone(800, 'sine', 0.05, 0.08), 35);
    }

    win() {
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.22, 0.15), idx * 70);
      });
    }

    bigWin() {
      const chords = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      chords.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sawtooth', 0.35, 0.12), idx * 80);
      });
    }

    lose() {
      this.playTone(320, 'sawtooth', 0.15, 0.12);
      setTimeout(() => this.playTone(220, 'sawtooth', 0.25, 0.14), 110);
    }

    click() {
      this.playTone(880, 'sine', 0.03, 0.08);
    }

    spin() {
      this.playTone(600 + Math.random() * 400, 'square', 0.04, 0.06);
    }

    dice() {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.playTone(900 + Math.random() * 300, 'triangle', 0.05, 0.09), i * 40);
      }
    }

    rocket() {
      this.playTone(120, 'sawtooth', 0.2, 0.15);
    }

    boom() {
      this.playTone(80, 'sawtooth', 0.4, 0.25);
    }

    cashout() {
      this.playTone(1046.50, 'sine', 0.15, 0.18);
      setTimeout(() => this.playTone(1318.51, 'sine', 0.25, 0.2), 90);
    }
  }

  const sound = new SoundEngine();

  /* =========================================================================
     2. WALLET & BALANCE CONTROLLER
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
      // Update DOM HUD if present
      const slotHud = document.getElementById('hud-slot-bal');
      if (slotHud) slotHud.textContent = this.balance.toLocaleString();
      const walletHud = document.getElementById('hud-wallet-bal');
      if (walletHud) walletHud.textContent = this.balance.toLocaleString();
      this.listeners.forEach(cb => cb(this.balance));
    }

    subscribe(cb) {
      this.listeners.push(cb);
    }

    get() {
      return this.balance;
    }

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
     3. DECK OF CARDS UTILITIES
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
            color: (s === '♥' || s === '♦') ? '#ef4444' : '#f8fafc',
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
          <div class="card-back-pattern">🛡️</div>
        </div>
      `;
    }
    return `
      <div class="casino-card" style="color: ${card.color};">
        <div class="card-corner top-left">
          <span>${card.rank}</span>
          <span class="suit-icon">${card.suit}</span>
        </div>
        <div class="card-center">${card.suit}</div>
        <div class="card-corner bottom-right">
          <span>${card.rank}</span>
          <span class="suit-icon">${card.suit}</span>
        </div>
      </div>
    `;
  }

  /* =========================================================================
     4. GAME TEMPLATES & ENGINES
     ========================================================================= */

  /* --- 4A: BLACKJACK FAMILY (Classic, Single Deck, Pontoon, Spanish 21) --- */
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
        elStatus.innerHTML = `<span style="color:#fde047">💥 NATURAL BLACKJACK! +${winAmt.toLocaleString()} COINS</span>`;
      } else if (outcome === 'player_win' || outcome === 'dealer_bust') {
        winAmt = bet * 2;
        wallet.add(winAmt);
        sound.win();
        elStatus.innerHTML = `<span style="color:#10b981">🎉 YOU WIN! +${winAmt.toLocaleString()} COINS</span>`;
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
        elStatus.innerHTML = `<span style="color:#10b981">🎉 ${outcome.toUpperCase()} WINS! +${payout.toLocaleString()} COINS</span>`;
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

  /* --- 4G: UNIVERSAL SLOT ENGINE (Vegas 777, Fruit Fiesta, Dragon Hold, etc.) --- */
  function buildGenericSlot(gameDef, container) {
    let bet = 100;
    const is3Reel = gameDef.id === 'slot_vegas777';
    const numReels = is3Reel ? 3 : 5;
    const numRows = 3;

    const symbolsMap = {
      slot_vegas777: ['🍒', '🍋', '🔔', 'BAR', '7️⃣'],
      slot_fruit_fiesta: ['🍉', '🍇', '🍊', '🍓', '⭐', '7️⃣'],
      slot_dragon_hold: ['🪙', '🏮', '🐲', '🪭', '👑', '💎'],
      slot_buffalo: ['🦬', '🦅', '🐺', '🦌', '🌵', '🌅'],
      slot_book_dead: ['📖', '⚱️', '🪲', '👁️', '🗿', '👑'],
      slot_money_cart: ['🚂', '💣', '🔫', '💰', '🤠', '⚡'],
      slot_mahjong: ['🀄', '🀅', '🀆', '🪙', '🏮', '✨'],
      slot_perya_fruit: ['🍎', '🍊', '🥭', '🔔', '🍉', '⭐', '7️⃣', 'BAR'],
      slot_neon_reels: ['🕶️', '📼', '🕹️', '🌴', '⚡', '💎'],
      slot_aztec_gold: ['🗿', '🐍', '🐆', '🪙', '💎', '👑']
    };

    const symbols = symbolsMap[gameDef.id] || ['🍒', '🍋', '🍇', '🔔', '💎', '7️⃣'];

    container.innerHTML = `
      <div class="theater-game-shell">
        <div class="slot-cabinet-frame">
          <div class="table-badge">${gameDef.title.toUpperCase()} • ${gameDef.badge}</div>
          <div class="slot-reels-stage" id="slot-stage" style="grid-template-columns: repeat(${numReels}, 1fr)">
            ${Array.from({ length: numReels }, (_, r) => `
              <div class="slot-reel-strip" id="reel-${r}">
                ${Array.from({ length: numRows }, () => `<div class="slot-symbol-box">${symbols[0]}</div>`).join('')}
              </div>
            `).join('')}
          </div>
          <div class="felt-center-banner" id="slot-banner">Spin the reels to win up to ${gameDef.maxWin}!</div>
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
            <button class="btn-action primary" id="btn-slot-spin">SPIN REELS 🎰</button>
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
      sound.chip();
      spinning = true;
      btnSpin.disabled = true;
      elBanner.textContent = 'SPINNING...';

      // Spinning animation
      let spins = 0;
      const spinInterval = setInterval(() => {
        spins++;
        sound.spin();
        for (let r = 0; r < numReels; r++) {
          const reel = container.querySelector(`#reel-${r}`);
          reel.innerHTML = Array.from({ length: numRows }, () => {
            const sym = symbols[Math.floor(Math.random() * symbols.length)];
            return `<div class="slot-symbol-box">${sym}</div>`;
          }).join('');
        }

        if (spins > 14) {
          clearInterval(spinInterval);
          finalizeSpin();
        }
      }, 70);

      function finalizeSpin() {
        spinning = false;
        btnSpin.disabled = false;

        // Generate final grid
        const finalGrid = [];
        for (let r = 0; r < numReels; r++) {
          const col = [];
          for (let row = 0; row < numRows; row++) {
            col.push(symbols[Math.floor(Math.random() * symbols.length)]);
          }
          finalGrid.push(col);
          const reel = container.querySelector(`#reel-${r}`);
          reel.innerHTML = col.map(s => `<div class="slot-symbol-box">${s}</div>`).join('');
        }

        // Check horizontal paylines (Middle line row 1)
        const midRow = finalGrid.map(col => col[1]);
        const first = midRow[0];
        let matches = 1;
        for (let i = 1; i < midRow.length; i++) {
          if (midRow[i] === first) matches++;
          else break;
        }

        let won = 0;
        if (is3Reel && matches === 3) {
          const mult = first === '7️⃣' ? 100 : (first === 'BAR' ? 40 : 15);
          won = bet * mult;
        } else if (!is3Reel && matches >= 3) {
          const mult = matches === 5 ? 50 : (matches === 4 ? 10 : 3);
          won = bet * mult;
        }

        if (won > 0) {
          wallet.add(won);
          sound.win();
          elBanner.innerHTML = `<span style="color:#fde047">🎉 BIG WIN! +${won.toLocaleString()} COINS (${matches}x ${first})</span>`;
        } else {
          sound.lose();
          elBanner.innerHTML = `<span style="color:#94a3b8">No match. Spin again!</span>`;
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

    open(gameId) {
      if (typeof ARCADE_GAMES === 'undefined') return;
      const gameDef = ARCADE_GAMES.find(g => g.id === gameId);
      if (!gameDef) return;

      // If game has a dedicated external URL, redirect directly
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

      // Route to engine builder
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
        // Fallback card or table game
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
    closeGame() { this.theater.close(); }
  };

})();
