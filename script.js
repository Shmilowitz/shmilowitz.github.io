/* =========================================
   CYBERSECURITY PORTFOLIO — script.js
   ========================================= */

/* ---------- Scroll Progress Bar ---------- */
const progressBar = document.getElementById('scroll-progress');
let pctTimeout;

function updateProgress() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
  progressBar.style.width = pct + '%';
  progressBar.setAttribute('data-pct', pct + '%');
  progressBar.classList.add('show-pct');
  clearTimeout(pctTimeout);
  pctTimeout = setTimeout(() => progressBar.classList.remove('show-pct'), 1200);
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}

applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ---------- Interactive Terminal ---------- */
(function () {
  const ttyBody  = document.getElementById('ttyBody');
  const ttyInput = document.getElementById('ttyInput');
  if (!ttyBody || !ttyInput) return;

  let histLog  = [];
  let histIdx  = 0;

  /* ---- helpers ---- */
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function tl(html, cls) {
    const s = document.createElement('span');
    s.className = 'tl ' + (cls || 'tl-out');
    s.innerHTML = html;
    ttyBody.appendChild(s);
    ttyBody.scrollTop = ttyBody.scrollHeight;
  }
  function blank() {
    const s = document.createElement('span');
    s.className = 'tl tl-blank';
    ttyBody.appendChild(s);
    ttyBody.scrollTop = ttyBody.scrollHeight;
  }
  function echoCmd(raw) { tl(esc(raw), 'tl-cmd'); }
  function later(fn, ms) { setTimeout(fn, ms); }
  function hlcmd(c) { return `<span style="color:#e53935">${esc(c)}</span>`; }

  /* ---- boot ---- */
  tl('Portfolio OS v1.3.37 (GNU/Linux 6.6.0-pwn3d x86_64)', 'tl-ok');
  tl('Last login: ' + new Date().toDateString() + ' from 192.168.1.337', 'tl-dim');
  blank();
  tl('Type ' + hlcmd('help') + ' to see available commands.', 'tl-out');
  blank();

  /* ---- commands ---- */
  const cmds = {

    help() {
      tl('Available commands:', 'tl-hl');
      blank();
      [
        ['whoami',          'Display user profile'],
        ['ls',              'List directory'],
        ['cat about.txt',   'Read about file'],
        ['cat skills.txt',  'Read skills file'],
        ['cat projects.txt','Read CTF writeups'],
        ['cat contact.txt', 'Read contact info'],
        ['cat secret.enc',  '???'],
        ['man david',       'Read the manual'],
        ['matrix',          'Wake up, Neo...'],
        ['hire david',      '👀'],
        ['history',         'Show command history'],
        ['clear',           'Clear terminal'],
      ].forEach(([c, d]) => {
        tl(`&nbsp;&nbsp;<span style="color:#e53935;display:inline-block;min-width:200px">${c}</span><span style="color:#444">— ${d}</span>`);
      });
      blank();
    },

    whoami() {
      blank();
      const rows = [
        '┌──────────────────────────────────────────────┐',
        '│  david — David Shmilowitz                    │',
        '│  ──────────────────────────────────────────  │',
        '│  Role     : Cyber Security Specialist         │',
        '│  Location : Denmark  (remote-friendly)        │',
        '│  Focus    : OffSec · GRC · Pre-Sales · AI      │',
        '│  Status   : chmod 777 /the/internet           │',
        '│  Clearance: AUTHORIZED                        │',
        '│  Coffee   : CRITICAL — refill required        │',
        '└──────────────────────────────────────────────┘',
      ];
      rows.forEach(r => tl(r, 'tl-hl'));
      blank();
    },

    ls() {
      tl('about.txt&nbsp;&nbsp; skills.txt&nbsp;&nbsp; writeups/&nbsp;&nbsp; contact.txt&nbsp;&nbsp; <span style="color:#444">secret.enc</span>');
    },

    'cat about.txt'() {
      blank();
      tl('Security professional working across offensive research,');
      tl('governance, and technical sales.');
      blank();
      tl('&nbsp;&nbsp;• Offensive security &amp; penetration testing');
      tl('&nbsp;&nbsp;• GRC — NIS2, ISO 27001, DORA, D-m&aelig;rket');
      tl('&nbsp;&nbsp;• Detection engineering (NDR / SIEM / Logpoint)');
      tl('&nbsp;&nbsp;• Pre-sales &amp; technical sales for security solutions');
      tl('&nbsp;&nbsp;• AI governance, agentic workflows &amp; advisory');
      blank();
    },

    'cat skills.txt'() {
      blank();
      tl('[ Cyber Security ]', 'tl-hl');
      tl('&nbsp;&nbsp;Penetration Testing · Red Teaming · Vulnerability Assessment');
      tl('&nbsp;&nbsp;Kali · Metasploit · Burp Suite · Nmap · Wireshark · OSINT');
      blank();
      tl('[ Governance &amp; Compliance ]', 'tl-hl');
      tl('&nbsp;&nbsp;NIS2 · ISO 27001 · DORA · D-m&aelig;rket · Risk Management');
      tl('&nbsp;&nbsp;Regulatory Auditing · Policy Frameworks · Gap Analysis');
      blank();
      tl('[ Technical Sales ]', 'tl-hl');
      tl('&nbsp;&nbsp;NDR / SIEM Pre-sales · Solution Architecture · PoC Delivery');
      tl('&nbsp;&nbsp;Stakeholder Presentations · RFP Responses · Customer Success');
      blank();
      tl('[ Coding &amp; Development ]', 'tl-hl');
      tl('&nbsp;&nbsp;Python · Bash · JavaScript · SQL · PowerShell');
      tl('&nbsp;&nbsp;SIEM Query Languages · Git · Automation Scripting');
      blank();
      tl('[ AI &amp; Advisory ]', 'tl-hl');
      tl('&nbsp;&nbsp;AI Governance &amp; Risk · Agentic Workflow Design');
      tl('&nbsp;&nbsp;AI Ethics &amp; Accountability · LLM Evaluation &amp; Testing');
      tl('&nbsp;&nbsp;Copilot / AI Tool Integration · Change Management for AI');
      blank();
    },

    'cat projects.txt'() {
      blank();
      tl('writeups/', 'tl-hl');
      tl('&nbsp;&nbsp;├── &Oslash;velsesoperation  — FE-CTF 2024 · 11-step web/crypto challenge');
      tl('&nbsp;&nbsp;├── Ringaling-Dding  — NFCCTF · Firmware reverse engineering');
      tl('&nbsp;&nbsp;└── Writeup Template — Jekyll-based CTF writeup framework');
      blank();
      tl('↑ Scroll to the Writeups section for links &amp; full details.', 'tl-dim');
      blank();
    },

    'cat contact.txt'() {
      blank();
      tl('📍 Denmark (remote-friendly worldwide)');
      tl('🔗 linkedin.com/in/david-shmilowitz');
      tl('⏱  Response time: &lt; 24 hours');
      blank();
      tl('Or just scroll to the Contact section below ↓', 'tl-dim');
      blank();
    },

    'cat secret.enc'() {
      tl('Zm9yYmlkZGVuIGtub3dsZWRnZQ==', 'tl-dim');
      later(() => tl('...good luck with that.', 'tl-hl'), 400);
    },

    clear() {
      ttyBody.innerHTML = '';
    },

    history() {
      if (!histLog.length) { tl('No commands in history yet.', 'tl-dim'); return; }
      histLog.forEach((c, i) => tl(`&nbsp;&nbsp;${String(i + 1).padStart(3, ' ')}  ${esc(c)}`));
    },

    matrix() {
      const chars = '01アイウエオカキサシスタチツテ日月火水木金土';
      blank();
      for (let i = 0; i < 14; i++) {
        later(() => {
          let row = '';
          for (let j = 0; j < 55; j++) {
            const bright = Math.random() > 0.85;
            const ch = chars[Math.floor(Math.random() * chars.length)];
            row += `<span style="color:hsl(120,100%,${bright ? 70 : 30 + Math.random()*20}%)">${ch}</span>`;
          }
          tl(row);
        }, i * 70);
      }
      later(() => {
        blank();
        tl('Wake up, Neo...', 'tl-hl');
        tl('The Matrix has you.', 'tl-dim');
        blank();
      }, 14 * 70 + 150);
    },

    'hire david'() {
      blank();
      tl('Processing hire request...', 'tl-out');
      later(() => tl('[███░░░░░░░]  30% — evaluating qualifications...', 'tl-ok'), 400);
      later(() => tl('[██████░░░░]  60% — checking certifications...', 'tl-ok'), 900);
      later(() => tl('[█████████░]  90% — verifying coffee supply...', 'tl-ok'), 1400);
      later(() => {
        tl('[██████████] 100% — Excellent choice! 🎉', 'tl-ok');
        blank();
        tl('Please proceed to the Contact section to finalise. ↓', 'tl-hl');
        blank();
      }, 1900);
    },

  }; // end cmds

  /* ---- command dispatcher ---- */
  function run(raw) {
    const input = raw.trim();
    if (!input) return;

    histLog.push(input);
    histIdx = histLog.length;
    echoCmd(input);

    const low = input.toLowerCase();

    // exact match
    if (cmds[low]) { cmds[low](); return; }

    // prefix / pattern matches
    if (/^curl/.test(low)) {
      tl('Your IP? I\'m not telling you that. Don\'t be creepy.', 'tl-hl');
      return;
    }

    if (/^man\s+david/.test(low)) {
      blank();
      tl('DAVID(1)                User Commands                DAVID(1)', 'tl-hl');
      blank();
      tl('NAME', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;david — cybersecurity professional &amp; occasional menace');
      blank();
      tl('SYNOPSIS', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;david [--pen-test] [--audit] [--pre-sales] [--ai] [--coffee] [--hire]');
      blank();
      tl('DESCRIPTION', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;Multi-threaded security professional spanning offensive research,');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;governance &amp; compliance, technical sales, and AI advisory.');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;Understands threats well enough to build defences that hold,');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;communicate risk to leadership, and turn security into a capability.');
      blank();
      tl('OPTIONS', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--pen-test    Execute authorized penetration test');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--audit       Conduct NIS2 / ISO 27001 / DORA compliance audit');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--pre-sales   Deliver NDR/SIEM solution demo &amp; PoC');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--ai          Engage AI governance &amp; agentic workflow advisory');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--coffee      +300% performance (side effects: jitter, genius)');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;--hire        Unlock full potential <span style="color:#444">— highly recommended</span>');
      blank();
      tl('BUGS', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;No known bugs. Only undocumented features.');
      blank();
      tl('SEE ALSO', 'tl-hl');
      tl('&nbsp;&nbsp;&nbsp;&nbsp;linkedin(1), github(1), contact-form(8)');
      blank();
      tl('DAVID(1)                         2025                         DAVID(1)', 'tl-dim');
      blank();
      return;
    }

    if (/^man/.test(low)) {
      tl(`No manual entry for ${esc(low.replace(/^man\s*/, ''))}`, 'tl-err');
      tl('Try: ' + hlcmd('man david'), 'tl-dim');
      return;
    }

    // Easter eggs
    if (low === 'ls -r' || low === 'ls -rf') {
      tl('The whole filesystem? Sure, one sec...', 'tl-dim');
      later(() => tl('/dev/null is empty, much like this request.', 'tl-err'), 700);
      return;
    }

    if (low === ':(){ :|:& };:') {
      tl('Fork bomb detected. Nice try.', 'tl-err');
      later(() => tl('System integrity: 100%. Your dignity: uncertain.', 'tl-ok'), 600);
      return;
    }

    if (low === 'cd ..' || low === 'cd /') {
      tl('You cannot escape the portfolio.', 'tl-hl');
      return;
    }

    if (low === 'rm -rf /' || low === 'rm -rf /*') {
      tl('rm: it is dangerous to operate recursively on \'/\'', 'tl-err');
      tl('rm: use --no-preserve-root to override this protection', 'tl-err');
      later(() => tl('...or just, you know, don\'t.', 'tl-hl'), 500);
      return;
    }

    if (low === 'exit' || low === 'logout') {
      tl('logout', 'tl-dim');
      later(() => {
        tl('Connection to david@portfolio closed.', 'tl-dim');
        later(() => {
          blank();
          tl('...', 'tl-dim');
          later(() => {
            tl('You can\'t leave. The portfolio is forever.', 'tl-hl');
            blank();
          }, 1200);
        }, 600);
      }, 500);
      return;
    }

    if (low === 'help me') {
      blank();
      tl('You rang? 👋  Try ' + hlcmd('help') + ' for a list of commands.');
      blank();
      return;
    }

    if (low === 'xss' || low.startsWith('<script')) {
      tl('Nice try. CSP says no. 😇', 'tl-err');
      return;
    }

    if (low === 'ls skills' || low === 'ls skills/') { cmds['cat skills.txt'](); return; }
    if (low === 'ls projects' || low === 'ls projects/' || low === 'ls writeups' || low === 'ls writeups/') { cmds['cat projects.txt'](); return; }

    // unknown
    tl(`bash: ${esc(input)}: command not found`, 'tl-err');
    tl('Type ' + hlcmd('help') + ' to see available commands.', 'tl-dim');
  }

  /* ---- input handling ---- */
  ttyInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = ttyInput.value;
      ttyInput.value = '';
      run(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) ttyInput.value = histLog[--histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < histLog.length - 1) {
        ttyInput.value = histLog[++histIdx];
      } else {
        histIdx = histLog.length;
        ttyInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = ttyInput.value.toLowerCase();
      if (!val) return;
      const all = Object.keys(cmds).concat(['curl ', 'man ', 'hire david', 'rm -rf /']);
      const match = all.find(c => c.startsWith(val) && c !== val);
      if (match) ttyInput.value = match;
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      cmds.clear();
    }
  });

  document.querySelector('.terminal-float-panel .terminal-window')?.addEventListener('click', () => ttyInput.focus());
})();

/* ---------- Floating Terminal Widget ---------- */
(function () {
  const fab   = document.getElementById('terminalFab');
  const panel = document.getElementById('terminalPanel');
  if (!fab || !panel) return;

  const iconOpen  = fab.querySelector('.fab-icon-open');
  const iconClose = fab.querySelector('.fab-icon-close');

  function openTerminal() {
    panel.classList.add('open');
    if (iconOpen)  iconOpen.style.display  = 'none';
    if (iconClose) iconClose.style.display = '';
    const input = document.getElementById('ttyInput');
    if (input) input.focus();
  }

  function closeTerminal() {
    panel.classList.remove('open');
    if (iconOpen)  iconOpen.style.display  = '';
    if (iconClose) iconClose.style.display = 'none';
  }

  fab.addEventListener('click', () => {
    panel.classList.contains('open') ? closeTerminal() : openTerminal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeTerminal();
  });
})();

/* ---------- Mobile Nav ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Typewriter Effect ---------- */
const roles = [
  'Ethical Hacker',
  'Penetration Tester',
  'Security Solutions Consultant',
  'GRC & Compliance Specialist',
  'AI Enthusiast',
  'Programmer at Heart',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    el.textContent = current.slice(0, --charIndex);
  } else {
    el.textContent = current.slice(0, ++charIndex);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

/* ---------- Active Nav Link ---------- */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));

/* ---------- Contact Form ---------- */
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // --- Replace this block with EmailJS or your own backend ---
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate send (replace with real API call)
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    showStatus('Message sent! I\'ll get back to you within 24 hours.', 'success');
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => { formStatus.className = 'form-status'; }, 5000);
}