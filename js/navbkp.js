// ═══════════════════════════════════════════════════════════
//  nav.js — Barra de navegação compartilhada
//  Inclua em cada página: <script src="nav.js"></script>
//  Defina window.NAV_ATIVO = 'dashboard' | 'respostas' | 'usuarios'
//  antes de incluir este script
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── Logo SVG inline ──────────────────────────────────────
  const LOGO_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="36" height="36" style="display:block;border-radius:8px;">
    <defs>
      <linearGradient id="nbg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f2650"/>
        <stop offset="100%" stop-color="#1e4080"/>
      </linearGradient>
      <linearGradient id="nb1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#b88000"/><stop offset="100%" stop-color="#fde68a"/>
      </linearGradient>
      <linearGradient id="nb2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#c49600"/><stop offset="100%" stop-color="#fcd34d"/>
      </linearGradient>
      <linearGradient id="nb3" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#d4a500"/><stop offset="100%" stop-color="#f5c842"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="40" fill="url(#nbg)"/>
    <ellipse cx="100" cy="38" rx="90" ry="36" fill="rgba(255,255,255,0.06)"/>
    <rect x="26" y="26" width="148" height="130" rx="18"
      fill="rgba(245,200,66,0.07)" stroke="#f5c842" stroke-width="5.5"/>
    <circle cx="64"  cy="98"  r="12" fill="url(#nb1)" opacity="0.78"/>
    <rect   x="52"  y="113"  width="24" height="30" rx="7" fill="url(#nb1)" opacity="0.78"/>
    <circle cx="100" cy="82"  r="13" fill="url(#nb2)"/>
    <rect   x="87"  y="98"   width="26" height="45" rx="7" fill="url(#nb2)"/>
    <circle cx="137" cy="65"  r="15" fill="url(#nb3)"/>
    <rect   x="122" y="83"   width="30" height="60" rx="8" fill="url(#nb3)"/>
    <line x1="32" y1="168" x2="168" y2="168"
      stroke="#f5c842" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
  </svg>`;

  // ── CSS da nav ───────────────────────────────────────────
  const CSS = `
  <style id="nav-style">
    .nav-top {
      position: sticky; top: 0; z-index: 200;
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      height: 64px;
      display: flex; align-items: center;
      padding: 0 20px; gap: 0;
      box-shadow: 0 1px 4px rgba(26,58,110,0.08);
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      .nav-top { background:#111827; border-color:#374151; }
    }
    .nav-logo {
      display: flex; align-items: center;
      flex-shrink: 0;
      padding-right: 16px;
      border-right: 1px solid #e2e8f0;
      margin-right: 16px;
    }
    @media (prefers-color-scheme: dark) {
      .nav-logo { border-color:#374151; }
    }
    .nav-usuario {
      display: flex; align-items: center; gap: 6px;
      flex-shrink: 0;
      padding-right: 16px;
      border-right: 1px solid #e2e8f0;
      margin-right: 16px;
    }
    @media (prefers-color-scheme: dark) {
      .nav-usuario { border-color:#374151; }
    }
    .nav-user-name {
      font-family: 'Sora', 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 700;
      color: #0f172a; white-space: nowrap;
    }
    @media (prefers-color-scheme: dark) { .nav-user-name { color:#f9fafb; } }
    .nav-badge {
      font-size: 9px; font-weight: 700;
      padding: 2px 8px; border-radius: 99px;
      background: rgba(26,58,110,0.08);
      color: #1a3a6e;
      border: 1px solid rgba(26,58,110,0.18);
      text-transform: uppercase; letter-spacing: 0.5px;
      white-space: nowrap; flex-shrink: 0;
    }
    .nav-unidade {
      font-size: 10.5px; color: #94a3b8;
      white-space: nowrap; display: none;
    }
    .nav-links {
      display: flex; gap: 2px; align-items: center;
    }
    .nav-link {
      padding: 7px 14px; border-radius: 8px;
      font-size: 13px; font-weight: 500;
      color: #475569; text-decoration: none;
      transition: all 0.15s; white-space: nowrap;
      display: flex; align-items: center; gap: 6px;
    }
    .nav-link:hover { background: #f1f5f9; color: #0f172a; }
    .nav-link.ativo {
      background: #1a3a6e; color: #fff; font-weight: 600;
    }
    @media (prefers-color-scheme: dark) {
      .nav-link       { color:#9ca3af; }
      .nav-link:hover { background:#1f2937; color:#f9fafb; }
    }
    .nav-link.admin-lnk { display: none; }
    .nav-right { margin-left: auto; display: flex; align-items: center; }
    .nav-btn-sair {
      padding: 6px 14px; border-radius: 8px;
      border: 1px solid #e2e8f0; background: transparent;
      font-size: 12px; font-weight: 600; color: #475569;
      cursor: pointer; font-family: inherit; transition: all 0.15s;
    }
    .nav-btn-sair:hover { border-color: #e11d48; color: #e11d48; }
    @media (prefers-color-scheme: dark) {
      .nav-btn-sair { border-color:#374151; color:#9ca3af; }
    }
    @media (max-width: 600px) {
      .nav-logo  { display: none; }
      .nav-link  { padding: 6px 9px; font-size: 12px; }
    }
  </style>`;

  // ── HTML da nav ──────────────────────────────────────────
  const ativo = window.NAV_ATIVO || 'dashboard';

  const HTML = `
  ${CSS}
  <nav class="nav-top" id="navTop" style="display:none">

    <div class="nav-logo">${LOGO_SVG}</div>

    <div class="nav-usuario">
      <span class="nav-user-name" id="nav-user-name">…</span>
      <span class="nav-badge"     id="nav-badge"></span>
    </div>

    <div class="nav-links">
      <a class="nav-link ${ativo==='dashboard' ?'ativo':''}" href="dashboard.html">📊 Dashboard</a>
      <a class="nav-link ${ativo==='respostas' ?'ativo':''}" href="respostas.html">📋 Respostas</a>
      <a class="nav-link admin-lnk ${ativo==='usuarios'?'ativo':''}" id="nav-admin-lnk" href="admin.html">👥 Usuários</a>
    </div>

    <div class="nav-right">
      <button class="nav-btn-sair" onclick="sair()">Sair</button>
    </div>

  </nav>`;

  // Injeta no topo do body — DOM garantidamente pronto
  document.body.insertAdjacentHTML('afterbegin', HTML);

});
