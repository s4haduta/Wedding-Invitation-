(function () {
  'use strict';
  var C = window.INVITATION;
  var d = document, root = d.documentElement;
  root.classList.add('js');

  /* ---------- util ---------- */
  function $(s, p) { return (p || d).querySelector(s); }
  function $$(s, p) { return Array.prototype.slice.call((p || d).querySelectorAll(s)); }
  function el(tag, cls, text) {
    var n = d.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  var store = {
    get: function (k, fb) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* tanpa penyimpanan pun tetap jalan */ } }
  };
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(opts) {
    opts.timeZone = C.timeZone;
    return new Intl.DateTimeFormat('id-ID', opts);
  }
  var fmtLong = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  var fmtTime = fmt({ hour: '2-digit', minute: '2-digit', hour12: false });
  function time(dt) { return fmtTime.format(dt).replace(':', '.'); }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }

  /* ---------- isi teks dari config ---------- */
  $$('[data-t]').forEach(function (n) {
    var v = get(n.dataset.t);
    if (v != null) n.textContent = v;
  });
  $$('[data-initial]').forEach(function (n) {
    n.textContent = C.couple[n.dataset.initial].nick.charAt(0).toUpperCase();
  });
  var eventDate = new Date(C.date);
  $$('[data-date="long"]').forEach(function (n) { n.textContent = fmtLong.format(eventDate); });
  d.title = 'Undangan ' + C.couple.first.nick + ' & ' + C.couple.second.nick;

  /* ---------- nama tamu dari ?to= ---------- */
  var guest = '';
  try { guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0, 60); } catch (e) { /* abaikan */ }
  if (guest) $('#guestName').textContent = guest;

  /* ---------- foto pembuka ---------- */
  if (C.photos && C.photos.cover) {
    var hp = $('#heroPhoto');
    hp.style.backgroundImage = 'url("' + encodeURI(C.photos.cover) + '")';
    hp.classList.add('has-img');
    $('.hero').classList.add('has-photo');
  }

  /* ---------- mempelai ---------- */
  (function () {
    var wrap = $('#couple');
    ['first', 'second'].forEach(function (key, i) {
      var p = C.couple[key];
      if (i) wrap.appendChild(el('div', 'couple__amp reveal', '&'));
      var card = el('article', 'person reveal');
      var frame = el('div', 'person__frame'), pic = el('div', 'person__pic');
      if (p.photo) {
        var img = el('img'); img.src = p.photo; img.alt = 'Foto ' + p.nick; img.loading = 'lazy';
        pic.appendChild(img);
      } else {
        pic.textContent = p.nick.charAt(0).toUpperCase();
        pic.setAttribute('aria-hidden', 'true');
      }
      frame.appendChild(pic); card.appendChild(frame);
      card.appendChild(el('h3', 'person__name', p.full));
      card.appendChild(el('p', 'person__of', p.childOf));
      var par = el('p', 'person__parents');
      par.appendChild(d.createTextNode(p.father)); par.appendChild(el('br'));
      par.appendChild(d.createTextNode('& ' + p.mother));
      card.appendChild(par);
      if (p.instagram) {
        var a = el('a', 'person__ig', '@' + p.instagram);
        a.href = 'https://www.instagram.com/' + encodeURIComponent(p.instagram) + '/';
        a.target = '_blank'; a.rel = 'noopener';
        card.appendChild(a);
      }
      wrap.appendChild(card);
    });
  })();

  /* ---------- acara ---------- */
  (function () {
    var wrap = $('#events');
    function gcal(s) { return s.toISOString().replace(/[-:]|\.\d{3}/g, ''); }
    C.events.forEach(function (ev) {
      var s = new Date(ev.start), e = new Date(ev.end);
      var card = el('article', 'event reveal');
      card.appendChild(el('h3', 'event__name', ev.name));
      card.appendChild(el('p', 'event__day', fmtLong.format(s)));
      var t = el('p', 'event__time', time(s) + ' – ' + time(e));
      t.appendChild(el('small', null, C.timeZoneLabel));
      card.appendChild(t);
      card.appendChild(el('p', 'event__venue', ev.venue));
      card.appendChild(el('p', 'event__addr', ev.address));
      var act = el('div', 'event__act');
      var map = el('a', 'btn btn--solid', 'Buka Peta');
      map.href = ev.mapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.venue + ', ' + ev.address);
      map.target = '_blank'; map.rel = 'noopener';
      var cal = el('a', 'btn', 'Simpan Tanggal');
      cal.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(ev.name + ' ' + C.couple.first.nick + ' & ' + C.couple.second.nick) +
        '&dates=' + gcal(s) + '/' + gcal(e) +
        '&location=' + encodeURIComponent(ev.venue + ', ' + ev.address);
      cal.target = '_blank'; cal.rel = 'noopener';
      act.appendChild(map); act.appendChild(cal); card.appendChild(act);
      wrap.appendChild(card);
    });
  })();

  /* ---------- kisah ---------- */
  (function () {
    var wrap = $('#story');
    if (!C.story || !C.story.length) { $('#kisah').hidden = true; return; }
    C.story.forEach(function (s) {
      var li = el('li', 'story__item reveal');
      li.appendChild(el('span', 'story__year', s.year));
      var b = el('div', 'story__body');
      b.appendChild(el('h3', 'story__title', s.title));
      b.appendChild(el('p', 'story__text', s.text));
      li.appendChild(b); wrap.appendChild(li);
    });
  })();

  /* ---------- galeri ---------- */
  (function () {
    var list = (C.photos && C.photos.gallery) || [];
    if (!list.length) return;
    $('#galeri').hidden = false;
    var wrap = $('#gallery'), box = $('#lightbox'), big = $('#lightboxImg');
    list.forEach(function (src, i) {
      var b = el('button', 'reveal'); b.type = 'button';
      b.setAttribute('aria-label', 'Perbesar foto ' + (i + 1));
      var img = el('img'); img.src = src; img.alt = 'Foto ' + (i + 1); img.loading = 'lazy';
      b.appendChild(img);
      b.addEventListener('click', function () {
        big.src = src;
        if (box.showModal) box.showModal();
      });
      wrap.appendChild(b);
    });
    $('#lightboxClose').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  })();

  /* ---------- hadiah ---------- */
  (function () {
    var wrap = $('#gifts'), g = C.gifts;
    function copy(text, btn) {
      function done() { btn.textContent = 'Tersalin'; toast('Tersalin'); setTimeout(function () { btn.textContent = 'Salin'; }, 2000); }
      function fallback() {
        var ta = el('textarea'); ta.value = text; ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        d.body.appendChild(ta); ta.select();
        try { if (d.execCommand('copy')) done(); else toast('Tekan lama pada teks untuk menyalin'); }
        catch (e) { toast('Tekan lama pada teks untuk menyalin'); }
        ta.remove();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    }
    function card(label, main, mainCls, sub, value) {
      var c = el('article', 'gift reveal');
      c.appendChild(el('p', 'gift__bank', label));
      c.appendChild(el('p', mainCls, main));
      c.appendChild(el('p', 'gift__holder', sub));
      var b = el('button', 'btn', 'Salin'); b.type = 'button';
      b.addEventListener('click', function () { copy(value, b); });
      c.appendChild(b); wrap.appendChild(c);
    }
    (g.accounts || []).forEach(function (a) {
      card(a.bank, a.number.replace(/(\d{4})(?=\d)/g, '$1 '), 'gift__num', 'a.n. ' + a.holder, a.number);
    });
    if (g.address && g.address.text) {
      card(g.address.label, g.address.text, 'gift__addr', 'Penerima: ' + g.address.recipient, g.address.recipient + ', ' + g.address.text);
    }
  })();

  /* ---------- hitung mundur ---------- */
  (function () {
    var cells = { D: $('#cdD'), H: $('#cdH'), M: $('#cdM'), S: $('#cdS') }, timer;
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = eventDate - Date.now();
      if (diff <= 0) {
        $('#countdown').hidden = true; $('#countDone').hidden = false;
        clearInterval(timer); return;
      }
      var s = Math.floor(diff / 1000);
      cells.D.textContent = Math.floor(s / 86400);
      cells.H.textContent = pad(Math.floor(s % 86400 / 3600));
      cells.M.textContent = pad(Math.floor(s % 3600 / 60));
      cells.S.textContent = pad(s % 60);
    }
    timer = setInterval(tick, 1000); tick();
  })();

  /* ---------- RSVP & ucapan ---------- */
  (function () {
    var R = C.rsvp || {}, KEY = 'undangan:' + C.date;
    var form = $('#rsvpForm'), thanks = $('#rsvpThanks'), err = $('#rsvpErr');
    var nameIn = $('#rsvpName'), guestsIn = $('#rsvpGuests'), msgIn = $('#rsvpMsg'), submit = $('#rsvpSubmit');
    var LABEL = { hadir: 'Hadir', tidak: 'Berhalangan', ragu: 'Masih ragu' };
    var wishes = [];

    for (var i = 1; i <= (R.maxGuests || 2); i++) {
      var o = el('option', null, i + ' orang'); o.value = i; guestsIn.appendChild(o);
    }
    if (guest) nameIn.value = guest;
    $$('input[name="attend"]', form).forEach(function (r) {
      r.addEventListener('change', function () { $('#guestsField').hidden = r.value === 'tidak' && r.checked; });
    });

    function ago(ts) {
      var m = Math.round((Date.now() - ts) / 60000);
      if (m < 1) return 'Baru saja';
      if (m < 60) return m + ' menit lalu';
      if (m < 1440) return Math.round(m / 60) + ' jam lalu';
      if (m < 43200) return Math.round(m / 1440) + ' hari lalu';
      return fmt({ day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(ts));
    }
    function render() {
      var ul = $('#wishes'); ul.textContent = '';
      var shown = wishes.filter(function (w) { return w && w.message; })
        .sort(function (a, b) { return (b.time || 0) - (a.time || 0); });
      $('#wishesEmpty').hidden = shown.length > 0;
      shown.forEach(function (w) {
        var li = el('li', 'wish'), top = el('div', 'wish__top');
        top.appendChild(el('span', 'wish__name', String(w.name || 'Tamu').slice(0, 60)));
        if (LABEL[w.attend]) top.appendChild(el('span', 'wish__tag', LABEL[w.attend]));
        li.appendChild(top);
        li.appendChild(el('p', 'wish__msg', String(w.message).slice(0, 400)));
        if (w.time) li.appendChild(el('span', 'wish__time', ago(+w.time)));
        ul.appendChild(li);
      });
    }
    function merge(list) {
      var seen = {};
      wishes = wishes.concat(list).filter(function (w) {
        if (!w) return false;
        var k = w.name + '|' + w.time;
        if (seen[k]) return false;
        seen[k] = 1; return true;
      });
    }
    function showThanks(mine) {
      form.hidden = true; thanks.hidden = false;
      $('#thanksName').textContent = mine.name;
      $('#thanksText').textContent = mine.attend === 'hadir'
        ? 'Kehadiran Anda untuk ' + mine.guests + ' orang sudah kami catat. Sampai jumpa di hari bahagia kami.'
        : mine.attend === 'tidak'
          ? 'Jawaban Anda sudah kami catat. Terima kasih atas doa yang Anda kirimkan.'
          : 'Jawaban Anda sudah kami catat. Kabari kami bila sudah ada kepastian.';
      var wa = $('#waBtn');
      if (R.whatsapp) {
        var text = 'Halo, saya ' + mine.name + '. Konfirmasi undangan ' + C.couple.first.nick + ' & ' + C.couple.second.nick +
          ': ' + LABEL[mine.attend] + (mine.attend === 'hadir' ? ' (' + mine.guests + ' orang)' : '') + '.' +
          (mine.message ? '\n\n' + mine.message : '');
        wa.href = 'https://wa.me/' + String(R.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(text);
        wa.hidden = false;
      }
    }

    var saved = store.get(KEY, null);
    if (saved && saved.mine) { merge([saved.mine]); showThanks(saved.mine); }
    render();

    if (R.endpoint) {
      fetch(R.endpoint).then(function (r) { return r.json(); }).then(function (list) {
        if (Array.isArray(list)) { merge(list); render(); }
      }).catch(function () { /* daftar ucapan bersama tidak terjangkau; ucapan sendiri tetap tampil */ });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameIn.value.trim();
      if (!name) {
        err.textContent = 'Nama belum diisi. Tulis nama Anda agar kami tahu siapa yang mengirim.';
        err.hidden = false; nameIn.focus(); return;
      }
      err.hidden = true;
      var attend = ($('input[name="attend"]:checked', form) || {}).value || 'hadir';
      var mine = {
        name: name, attend: attend,
        guests: attend === 'tidak' ? 0 : +guestsIn.value,
        message: msgIn.value.trim(), time: Date.now()
      };
      function finish() {
        var prev = store.get(KEY, null);
        if (prev && prev.mine) wishes = wishes.filter(function (w) { return !(w.name === prev.mine.name && w.time === prev.mine.time); });
        store.set(KEY, { mine: mine });
        merge([mine]); render(); showThanks(mine);
        submit.disabled = false; submit.textContent = 'Kirim Konfirmasi';
      }
      if (!R.endpoint) { finish(); return; }
      submit.disabled = true; submit.textContent = 'Mengirim…';
      // text/plain agar tidak memicu preflight CORS (cocok untuk Google Apps Script)
      fetch(R.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(mine) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); finish(); })
        .catch(function () {
          submit.disabled = false; submit.textContent = 'Kirim Konfirmasi';
          err.textContent = 'Konfirmasi belum terkirim. Periksa koneksi internet Anda, lalu kirim lagi.';
          err.hidden = false;
        });
    });
    $('#rsvpEdit').addEventListener('click', function () {
      var s = store.get(KEY, null);
      if (s && s.mine) {
        nameIn.value = s.mine.name; msgIn.value = s.mine.message || '';
        var r = $('input[name="attend"][value="' + s.mine.attend + '"]', form);
        if (r) { r.checked = true; $('#guestsField').hidden = s.mine.attend === 'tidak'; }
        if (s.mine.guests) guestsIn.value = s.mine.guests;
      }
      thanks.hidden = true; form.hidden = false; nameIn.focus();
    });
  })();

  /* ---------- musik ---------- */
  var Music = (function () {
    var btn = $('#musicBtn'), playing = false;
    var audio, ctx, master, timer, nextT = 0, beat = 0;
    // Canon in D (Johann Pachelbel, domain publik), diaransemen untuk kotak musik dan harpa.
    // Satu putaran = 8 akor x 8 not perenambelasan. Tiap variasi ditulis sebagai [nada MIDI, panjang].
    var BASS = [50, 45, 47, 42, 43, 38, 43, 45];
    var TRIAD = [[62, 66, 69], [57, 61, 64], [59, 62, 66], [54, 57, 61], [55, 59, 62], [62, 66, 69], [55, 59, 62], [57, 61, 64]];
    function line(notes) { // ubah daftar [nada, panjang] menjadi peta langkah -> not
      var map = {}, at = 0;
      notes.forEach(function (n) { map[at] = n; at += n[1]; });
      return map;
    }
    function each(list, len) { return list.map(function (m) { return [m, len]; }); }
    var V1 = line(each([78, 76, 74, 73, 71, 69, 71, 73], 8));
    var V2 = line(each([74, 73, 71, 69, 67, 66, 67, 64], 8));
    var V3 = line(each([74, 78, 81, 79, 78, 74, 78, 76, 74, 71, 74, 81, 79, 83, 81, 79], 4));
    var V4 = line([
      [81, 2], [78, 1], [79, 1], [81, 2], [78, 1], [79, 1], [81, 1], [69, 1], [71, 1], [73, 1], [74, 1], [76, 1], [78, 1], [79, 1],
      [78, 2], [74, 1], [76, 1], [78, 2], [66, 1], [67, 1], [69, 1], [71, 1], [69, 1], [67, 1], [69, 1], [66, 1], [67, 1], [69, 1],
      [67, 2], [71, 1], [69, 1], [67, 2], [66, 1], [64, 1], [66, 1], [64, 1], [62, 1], [64, 1], [66, 1], [67, 1], [69, 1], [71, 1],
      [67, 2], [71, 1], [69, 1], [71, 2], [73, 1], [74, 1], [69, 1], [71, 1], [73, 1], [74, 1], [76, 1], [78, 1], [79, 1], [81, 1]
    ]);
    // urutan putaran: iringan saja, tema, tema berdua, variasi seperempatan, variasi lincah, lalu kembali ke tema
    var ROUNDS = [[], [V1], [V1, V2], [V3, V2], [V4], [V4, V1], [V3]];
    function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }
    function note(type, f, t, vol, dur, partials) {
      (partials || [[1, 1]]).forEach(function (p) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.value = f * p[0];
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol * p[1], t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(master);
        o.start(t); o.stop(t + dur + 0.05);
      });
    }
    function schedule() {
      var STEP = 60 / 66 / 4;
      while (nextT < ctx.currentTime + 0.5) {
        var s = beat % 64, chord = Math.floor(s / 8), i = s % 8, round = Math.floor(beat / 64), t = nextT;
        var voices = ROUNDS[round < ROUNDS.length ? round : 1 + (round - 1) % (ROUNDS.length - 1)];
        if (i === 0) note('sine', hz(BASS[chord]), t, 0.34, STEP * 9);                              // bas
        if (i % 2 === 0) note('triangle', hz(TRIAD[chord][[0, 1, 2, 1][i / 2]]), t, 0.06, 0.7);      // harpa
        voices.forEach(function (v, k) {
          var n = v[s];
          if (n) note('sine', hz(n[0]), t, k ? 0.09 : 0.17, Math.max(0.9, n[1] * STEP * 1.25), [[1, 1], [2, .28], [4, .06]]);
        });
        beat++; nextT += STEP;
      }
    }
    function startSynth() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain(); master.gain.value = 0.0001;
        var delay = ctx.createDelay(1), fb = ctx.createGain(), lp = ctx.createBiquadFilter();
        delay.delayTime.value = 0.39; fb.gain.value = 0.22; lp.type = 'lowpass'; lp.frequency.value = 2200;
        master.connect(ctx.destination);
        master.connect(delay); delay.connect(lp); lp.connect(fb); fb.connect(delay); lp.connect(ctx.destination);
      }
      ctx.resume();
      nextT = ctx.currentTime + 0.15;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.8);
      clearInterval(timer); timer = setInterval(schedule, 120); schedule();
      return true;
    }
    function play() {
      var ok = true;
      if (C.music && C.music.src) {
        if (!audio) { audio = new Audio(C.music.src); audio.loop = true; audio.volume = 0.7; }
        var p = audio.play(); if (p && p.catch) p.catch(function () { set(false); });
      } else ok = startSynth();
      set(ok);
    }
    function pause() {
      if (audio) audio.pause();
      if (ctx) {
        clearInterval(timer);
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
      }
      set(false);
    }
    function set(on) {
      playing = on;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('aria-label', on ? 'Hentikan musik' : 'Putar musik');
    }
    var wasPlaying = false;
    btn.addEventListener('click', function () { playing ? pause() : play(); });
    d.addEventListener('visibilitychange', function () {
      if (d.hidden) { wasPlaying = playing; if (playing) pause(); }
      else if (wasPlaying) play();
    });
    return { play: play, show: function () { btn.hidden = false; } };
  })();

  /* ---------- sampul ---------- */
  (function () {
    var cover = $('#cover'), open = $('#openBtn');
    root.classList.add('locked');
    window.scrollTo(0, 0);
    open.addEventListener('click', function () {
      cover.classList.add('is-open');
      root.classList.remove('locked');
      root.classList.add('opened');
      Music.show(); Music.play();
      setTimeout(function () { cover.hidden = true; }, reduceMotion ? 0 : 2000);
    });
    open.focus({ preventScroll: true });
  })();

  /* ---------- muncul saat digulir ---------- */
  (function () {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { items.forEach(function (n) { n.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ---------- kelopak melati ---------- */
  (function () {
    var cv = $('#petals');
    if (reduceMotion || !cv.getContext) return;
    var g = cv.getContext('2d'), W, H, dpr, petals = [], raf;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(anyY) {
      return {
        x: Math.random() * W, y: anyY ? Math.random() * H : -20,
        r: 4 + Math.random() * 5, vy: 0.25 + Math.random() * 0.45,
        sway: 0.4 + Math.random() * 0.8, ph: Math.random() * 6.28,
        rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.012,
        a: 0.35 + Math.random() * 0.4
      };
    }
    function frame(t) {
      g.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.y += p.vy; p.x += Math.sin(t / 1400 * p.sway + p.ph) * 0.35; p.rot += p.vr;
        if (p.y > H + 20) petals[i] = p = spawn(false);
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
        g.globalAlpha = p.a; g.fillStyle = '#fbf7ec';
        g.beginPath();
        g.moveTo(0, -p.r);
        g.bezierCurveTo(p.r * 0.75, -p.r * 0.5, p.r * 0.6, p.r * 0.8, 0, p.r);
        g.bezierCurveTo(-p.r * 0.6, p.r * 0.8, -p.r * 0.75, -p.r * 0.5, 0, -p.r);
        g.fill(); g.restore();
      }
      raf = requestAnimationFrame(frame);
    }
    size();
    for (var i = 0; i < 16; i++) petals.push(spawn(true));
    window.addEventListener('resize', size);
    d.addEventListener('visibilitychange', function () {
      cancelAnimationFrame(raf);
      if (!d.hidden) raf = requestAnimationFrame(frame);
    });
    raf = requestAnimationFrame(frame);
  })();
})();
