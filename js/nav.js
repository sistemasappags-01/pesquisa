// ═══════════════════════════════════════════════════════════
//  nav.js — Barra de navegação compartilhada
//  Inclua no final do <body>: <script src="js/nav.js"></script>
//  Defina window.NAV_ATIVO = 'dashboard' | 'respostas' | 'usuarios'
//  antes de incluir este script
// ═══════════════════════════════════════════════════════════

(function () {

  // ── CSS da nav ───────────────────────────────────────────
  const CSS = `
  <style id="nav-style">

    /* ── BASE ── */
    .nav-top {
      position: sticky; top: 0; z-index: 200;
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      height: 64px;
      display: flex; align-items: center;
      padding: 0 20px;
      box-shadow: 0 1px 4px rgba(26,58,110,0.08);
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      .nav-top { background: #111827; border-color: #374151; }
    }

    /* ── LOGO ── */
    .nav-logo {
      display: flex; align-items: center;
      flex-shrink: 0;
      padding-right: 16px;
      border-right: 1px solid #e2e8f0;
      margin-right: 16px;
    }
    .nav-logo img {
      width: 40px; height: 40px;
      border-radius: 50%;
      display: block;
      object-fit: cover;
    }
    @media (prefers-color-scheme: dark) {
      .nav-logo { border-color: #374151; }
    }

    /* ── USUÁRIO ── */
    .nav-usuario {
      display: flex; align-items: center; gap: 6px;
      flex-shrink: 0;
      padding-right: 16px;
      border-right: 1px solid #e2e8f0;
      margin-right: 16px;
    }
    .nav-usuario-info { display: flex; flex-direction: column; gap: 1px; }
    .nav-user-name {
      font-family: 'Sora', 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 700;
      color: #0f172a; white-space: nowrap; line-height: 1.2;
    }
    .nav-user-unidade {
      font-size: 10px; color: #94a3b8;
      white-space: nowrap; line-height: 1;
    }
    .nav-badge {
      font-size: 9px; font-weight: 700;
      padding: 2px 8px; border-radius: 99px;
      background: rgba(26,58,110,0.08);
      color: #1a3a6e;
      border: 1px solid rgba(26,58,110,0.18);
      text-transform: uppercase; letter-spacing: 0.5px;
      white-space: nowrap; flex-shrink: 0;
    }
    @media (prefers-color-scheme: dark) {
      .nav-usuario { border-color: #374151; }
      .nav-user-name { color: #f9fafb; }
    }

    /* ── LINKS DESKTOP ── */
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
    .nav-link.ativo { background: #1a3a6e; color: #fff; font-weight: 600; }
    .nav-link.admin-lnk { display: none; }
    @media (prefers-color-scheme: dark) {
      .nav-link       { color: #9ca3af; }
      .nav-link:hover { background: #1f2937; color: #f9fafb; }
    }

    /* ── DIREITA ── */
    .nav-right {
      margin-left: auto; display: flex;
      align-items: center; gap: 12px;
    }

    /* ── BOTÃO SAIR DESKTOP ── */
    .nav-btn-sair {
      padding: 6px 14px; border-radius: 8px;
      border: 1px solid #e2e8f0; background: transparent;
      font-size: 12px; font-weight: 600; color: #475569;
      cursor: pointer; font-family: inherit; transition: all 0.15s;
    }
    .nav-btn-sair:hover { border-color: #e11d48; color: #e11d48; }
    @media (prefers-color-scheme: dark) {
      .nav-btn-sair { border-color: #374151; color: #9ca3af; }
    }

    /* ── BOTÃO HAMBURGUER ── */
    .nav-hamburger {
      display: none;
      flex-direction: column; justify-content: center;
      align-items: center; gap: 5px;
      width: 40px; height: 40px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      background: transparent;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-hamburger:hover { background: #f1f5f9; }
    .nav-hamburger span {
      display: block;
      width: 18px; height: 2px;
      background: #475569;
      border-radius: 99px;
      transition: transform 0.25s, opacity 0.25s;
    }
    .nav-hamburger.aberto span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-hamburger.aberto span:nth-child(2) { opacity: 0; }
    .nav-hamburger.aberto span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    @media (prefers-color-scheme: dark) {
      .nav-hamburger { border-color: #374151; }
      .nav-hamburger span { background: #9ca3af; }
    }

    /* ── MENU MOBILE (dropdown vertical) ── */
    .nav-mobile-menu {
      display: none;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(0,0,0,0.10);
      z-index: 199;
      padding: 8px 16px 16px;
      flex-direction: column;
      gap: 2px;
      animation: navSlideDown 0.2s ease;
    }
    .nav-mobile-menu.visivel { display: flex; }
    .nav-mobile-link {
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 15px; font-weight: 500;
      color: #475569; text-decoration: none;
      display: flex; align-items: center; gap: 10px;
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-mobile-link:hover,
    .nav-mobile-link:active { background: #f1f5f9; color: #0f172a; }
    .nav-mobile-link.ativo  { background: #1a3a6e; color: #fff; font-weight: 600; }
    .nav-mobile-link.admin-lnk { display: none; }
    .nav-mobile-divisor {
      height: 1px; background: #e2e8f0;
      margin: 8px 0;
    }
    .nav-mobile-sair {
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 15px; font-weight: 600;
      color: #e11d48; text-align: left;
      background: transparent; border: none;
      cursor: pointer; font-family: inherit;
      display: flex; align-items: center; gap: 10px;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-mobile-sair:hover { background: #fff1f2; }

    @keyframes navSlideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-color-scheme: dark) {
      .nav-mobile-menu  { background: #111827; border-color: #374151; }
      .nav-mobile-link  { color: #9ca3af; }
      .nav-mobile-link:hover { background: #1f2937; color: #f9fafb; }
    }

    /* ── RESPONSIVO ── */
    @media (max-width: 768px) {
      .nav-links,
      .nav-btn-sair   { display: none; }
      .nav-hamburger  { display: flex; }
      .nav-logo       { display: none; }
      .nav-usuario    { border-right: none; padding-right: 0; margin-right: 0; }
      .nav-user-unidade { display: none; }
    }

    @media (max-width: 480px) {
      .nav-top { padding: 0 14px; height: 56px; }
      .nav-mobile-menu { top: 56px; }
    }

  </style>`;

  // ── HTML da nav ──────────────────────────────────────────
  const ativo = window.NAV_ATIVO || 'dashboard';

  const HTML = `
  ${CSS}

  <nav class="nav-top" id="navTop" style="display:none">

    <!-- Logo GDF -->
    <div class="nav-logo">
      <img src="img/logo_gdf.jpg" alt="GDF"
           onerror="this.style.display='none'">
    </div>

    <!-- Usuário: nome + unidade + badge -->
    <div class="nav-usuario">
      <div class="nav-usuario-info">
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="nav-user-name"  id="nav-user-name">…</span>
          <span class="nav-badge"      id="nav-badge"></span>
        </div>
        <span class="nav-user-unidade" id="nav-user-unidade"></span>
      </div>
    </div>

    <!-- Links desktop -->
    <div class="nav-links">
      <a class="nav-link ${ativo==='dashboard' ?'ativo':''}" href="dashboard.html">📊 Dashboard</a>
      <a class="nav-link ${ativo==='respostas' ?'ativo':''}" href="respostas.html">📋 Respostas</a>
      <a class="nav-link admin-lnk ${ativo==='usuarios'?'ativo':''}" id="nav-admin-lnk" href="admin.html">👥 Usuários</a>
    </div>

    <!-- Direita desktop -->
    <div class="nav-right">
      <button class="nav-btn-sair" onclick="sair()">Sair</button>
      <!-- Hamburguer mobile -->
      <button class="nav-hamburger" id="nav-hamburger"
              aria-label="Abrir menu" onclick="toggleNavMobile()">
        <span></span><span></span><span></span>
      </button>
    </div>

  </nav>

  <!-- Menu mobile -->
  <div class="nav-mobile-menu" id="nav-mobile-menu">
    <a class="nav-mobile-link ${ativo==='dashboard' ?'ativo':''}" href="dashboard.html"  onclick="fecharNavMobile()">📊 Dashboard</a>
    <a class="nav-mobile-link ${ativo==='respostas' ?'ativo':''}" href="respostas.html" onclick="fecharNavMobile()">📋 Respostas</a>
    <a class="nav-mobile-link admin-lnk ${ativo==='usuarios'?'ativo':''}" id="nav-admin-lnk-mobile" href="admin.html" onclick="fecharNavMobile()">👥 Usuários</a>
    <div class="nav-mobile-divisor"></div>
    <button class="nav-mobile-sair" onclick="sair()">↩ Sair</button>
  </div>`;

  // Injeta no topo do body
  document.body.insertAdjacentHTML('afterbegin', HTML);

  // ── Funções do menu mobile ───────────────────────────────
  window.toggleNavMobile = function () {
    const btn  = document.getElementById('nav-hamburger');
    const menu = document.getElementById('nav-mobile-menu');
    const aberto = menu.classList.toggle('visivel');
    btn.classList.toggle('aberto', aberto);
    btn.setAttribute('aria-expanded', aberto);
  };

  window.fecharNavMobile = function () {
    document.getElementById('nav-mobile-menu').classList.remove('visivel');
    document.getElementById('nav-hamburger').classList.remove('aberto');
  };

  // Fechar menu ao clicar fora
  document.addEventListener('click', function (e) {
    const menu = document.getElementById('nav-mobile-menu');
    const btn  = document.getElementById('nav-hamburger');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      fecharNavMobile();
    }
  });

})();
