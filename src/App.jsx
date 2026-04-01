import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');`;

const css = `
  ${FONTS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; }

  :root {
    --forest: #1C4A3A;
    --forest-mid: #2A6B55;
    --forest-light: #3D8B70;
    --sage: #8BB8A4;
    --sage-light: #C8DDD6;
    --cream: #F5F0E8;
    --cream-dark: #EDE7DA;
    --amber: #C07830;
    --amber-light: #F5E8D5;
    --red-soft: #B84040;
    --red-bg: #FDF0F0;
    --sky: #2A6080;
    --sky-light: #E0EEF5;
    --ink: #1A2820;
    --ink-mid: #2E4038;
    --gray: #556860;
    --gray-light: #A8B8B0;
    --border: #D5E0DA;
    --white: #FFFFFF;
    --sidebar-bg: #1C4A3A;
    --forest-overlay: #EEF5F2;
    --topbar-bg: #FFFFFF;
  }

  [data-theme="dark"] {
    --forest: #1E5040;
    --forest-mid: #3D9E7A;
    --forest-light: #4DB890;
    --sage: #5A8878;
    --sage-light: #1E3028;
    --cream: #0E1612;
    --cream-dark: #0B1210;
    --amber: #E0983A;
    --amber-light: #2C1E08;
    --red-soft: #D96060;
    --red-bg: #221010;
    --sky: #5A9FD0;
    --sky-light: #0C1E2A;
    --ink: #E8F2EC;
    --ink-mid: #C0D4C8;
    --gray: #8AAFA0;
    --gray-light: #2A3E32;
    --border: #2A3E34;
    --white: #162015;
    --sidebar-bg: #0A1810;
    --forest-overlay: #1A3028;
    --topbar-bg: #162015;
  }

  /* ── SKIP LINK ── */
  .skip-link {
    position: absolute; top: -100px; left: 16px;
    background: var(--forest); color: #FFFFFF;
    padding: 10px 18px; z-index: 9999; border-radius: 0 0 8px 8px;
    font-size: 14px; font-weight: 600; text-decoration: none;
    transition: top 0.15s;
  }
  .skip-link:focus { top: 0; }

  /* ── FOCUS — WCAG 2.1 AA ── */
  *:focus { outline: none; }
  *:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ── SCREEN READER ONLY ── */
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
  }

  .app {
    display: flex; height: 100vh; background: var(--cream);
    overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; position: relative;
  }

  /* ── SIDEBAR OVERLAY (mobile) ── */
  .sidebar-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.55); z-index: 99;
    border: none; cursor: pointer; padding: 0;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 220px; min-width: 220px; background: var(--sidebar-bg);
    display: flex; flex-direction: column;
    overflow: hidden; position: relative;
    transition: transform 0.25s ease; flex-shrink: 0;
  }
  .sidebar-brand {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .sidebar-brand-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 22px; color: var(--cream); letter-spacing: 0.5px; line-height: 1;
  }
  .sidebar-brand-sub {
    font-size: 9px; color: var(--sage); letter-spacing: 2px;
    text-transform: uppercase; margin-top: 4px;
  }
  .sidebar-role {
    margin: 14px 16px 0;
    background: rgba(255,255,255,0.08);
    border-radius: 8px; padding: 10px 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .sidebar-role-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--amber); display: flex; align-items: center;
    justify-content: center; font-size: 12px; font-weight: 700; color: white;
    flex-shrink: 0;
  }
  .sidebar-role-info { flex: 1; min-width: 0; }
  .sidebar-role-name { font-size: 12px; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-role-type { font-size: 10px; color: var(--sage); margin-top: 1px; }
  .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
  .sidebar-section-label {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--sage); margin: 16px 8px 8px; font-weight: 600;
  }
  .sidebar-section-label:first-child { margin-top: 0; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 8px; cursor: pointer;
    color: rgba(255,255,255,0.65); font-size: 13px; font-weight: 500;
    transition: all 0.15s; margin-bottom: 2px; border: none; background: none;
    width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .nav-item[aria-current="page"] { background: var(--forest-light); color: white; }
  .nav-item-icon { width: 16px; text-align: center; flex-shrink: 0; font-size: 14px; }
  .nav-badge {
    margin-left: auto; background: var(--amber);
    color: white; font-size: 10px; font-weight: 700;
    padding: 1px 6px; border-radius: 10px;
  }
  .sidebar-country {
    padding: 14px 16px;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; gap: 8px;
  }
  .country-flag { font-size: 18px; }
  .country-name-label { font-size: 12px; color: white; font-weight: 600; }
  .country-sub { font-size: 10px; color: var(--sage); }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .topbar {
    background: var(--topbar-bg); border-bottom: 1px solid var(--border);
    padding: 0 28px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0; gap: 10px;
  }
  .topbar-left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
  .topbar-title {
    font-family: 'DM Serif Display', serif; font-size: 19px; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .topbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .topbar-pill {
    background: var(--forest); color: white;
    font-size: 11px; font-weight: 600; padding: 5px 12px;
    border-radius: 20px; letter-spacing: 0.3px;
  }
  .topbar-pill.amber { background: var(--amber); }
  .topbar-notif {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1.5px solid var(--border); display: flex;
    align-items: center; justify-content: center;
    cursor: pointer; background: var(--topbar-bg); position: relative;
    font-size: 14px; flex-shrink: 0;
  }
  .notif-dot {
    width: 8px; height: 8px; background: var(--amber);
    border-radius: 50%; position: absolute; top: 5px; right: 5px;
    border: 2px solid var(--topbar-bg);
  }

  /* ── HAMBURGER ── */
  .hamburger {
    display: none; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 8px;
    border: 1.5px solid var(--border); background: var(--topbar-bg);
    cursor: pointer; color: var(--ink); font-size: 18px; flex-shrink: 0;
    line-height: 1; padding: 0;
  }

  /* ── THEME TOGGLE ── */
  .theme-toggle {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1.5px solid var(--border); background: var(--topbar-bg);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 15px; padding: 0; flex-shrink: 0;
  }

  .content { flex: 1; overflow-y: auto; padding: 28px; background: var(--cream); }

  /* ── CARDS ── */
  .card { background: var(--white); border-radius: 14px; border: 1px solid var(--border); overflow: hidden; }
  .card-pad { padding: 22px 24px; }
  .card-header {
    padding: 18px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--ink); }
  .card-sub { font-size: 12px; color: var(--gray); margin-top: 2px; }

  /* ── STAT CARDS ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: var(--white); border-radius: 14px; padding: 20px 22px; border: 1px solid var(--border); }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--gray); font-weight: 600; }
  .stat-value { font-family: 'DM Serif Display', serif; font-size: 30px; color: var(--ink); margin-top: 6px; line-height: 1; }
  .stat-delta { font-size: 11px; color: var(--forest-mid); margin-top: 6px; font-weight: 500; }
  .stat-delta.neg { color: var(--red-soft); }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 9px; font-size: 13px;
    font-weight: 600; cursor: pointer; border: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.15s; white-space: nowrap;
  }
  .btn-primary { background: var(--forest); color: white; }
  .btn-primary:hover:not(:disabled) { background: var(--forest-mid); }
  .btn-amber { background: var(--amber); color: white; }
  .btn-amber:hover:not(:disabled) { filter: brightness(0.9); }
  .btn-outline { background: var(--white); color: var(--forest); border: 1.5px solid var(--forest); }
  .btn-outline:hover:not(:disabled) { background: var(--cream); }
  .btn-ghost { background: transparent; color: var(--gray); border: 1.5px solid var(--border); }
  .btn-ghost:hover:not(:disabled) { background: var(--cream-dark); color: var(--ink); }
  .btn-sm { padding: 6px 13px; font-size: 12px; }
  .btn-danger { background: var(--red-bg); color: var(--red-soft); border: 1.5px solid rgba(184,64,64,0.3); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── BADGES ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .badge-green { background: #E8F5EE; color: #1A6B3A; }
  .badge-amber { background: var(--amber-light); color: #7A4800; }
  .badge-red { background: var(--red-bg); color: var(--red-soft); }
  .badge-blue { background: var(--sky-light); color: var(--sky); }
  .badge-gray { background: var(--cream-dark); color: var(--gray); }
  .badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

  [data-theme="dark"] .badge-green { background: #0F2E1A; color: #50C87A; }
  [data-theme="dark"] .badge-amber { background: #2C1E08; color: #E8A050; }
  [data-theme="dark"] .badge-red   { background: #221010; color: #E06060; }
  [data-theme="dark"] .badge-blue  { background: #0C1E2A; color: #7AB8E0; }
  [data-theme="dark"] .badge-gray  { background: #2A3A30; color: #8AAFA0; }

  /* ── FORMS ── */
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 12px; font-weight: 600; color: var(--ink); margin-bottom: 6px; display: block; }
  .form-label span[aria-hidden="true"] { color: var(--amber); margin-left: 2px; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 10px 14px; border-radius: 9px;
    border: 1.5px solid var(--border); font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif; color: var(--ink);
    background: var(--white); outline: none; transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--forest-mid);
    outline: 3px solid var(--amber); outline-offset: 1px;
  }
  .form-textarea { resize: vertical; min-height: 90px; }
  .form-hint { font-size: 11px; color: var(--gray); margin-top: 5px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-section-title {
    font-family: 'DM Serif Display', serif; font-size: 15px; color: var(--ink);
    margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
    flex-shrink: 0;
  }
  .step-dot.done { background: var(--forest); color: white; }
  .step-dot.active { background: var(--amber); color: white; }
  .step-dot.inactive { background: var(--border); color: var(--gray); }
  .step-line { flex: 1; height: 2px; background: var(--border); }
  .step-line.done { background: var(--forest); }
  .step-label { font-size: 11px; color: var(--gray); margin-top: 4px; text-align: center; white-space: nowrap; }

  /* ── TABLES ── */
  .table { width: 100%; border-collapse: collapse; }
  .table th {
    text-align: left; font-size: 11px; text-transform: uppercase;
    letter-spacing: 1px; color: var(--gray); font-weight: 600;
    padding: 10px 16px; border-bottom: 1px solid var(--border);
    background: var(--cream);
  }
  .table td {
    padding: 13px 16px; border-bottom: 1px solid var(--border);
    font-size: 13px; color: var(--ink); vertical-align: middle;
  }
  .table tbody tr:hover td { background: var(--cream); }
  .table tbody tr:focus-visible { outline: 3px solid var(--amber); outline-offset: -2px; }
  .table tr:last-child td { border-bottom: none; }

  /* ── DEVICE CARD ── */
  .device-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .device-card {
    background: var(--white); border-radius: 14px; border: 1.5px solid var(--border);
    overflow: hidden; cursor: pointer; transition: all 0.15s;
    text-align: left; width: 100%; padding: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .device-card:hover { border-color: var(--forest-mid); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(28,74,58,0.12); }
  .device-card[aria-pressed="true"] { border-color: var(--forest); box-shadow: 0 0 0 3px rgba(28,74,58,0.15); }
  .device-card-img { height: 100px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
  .device-card-body { padding: 14px 16px; }
  .device-card-name { font-size: 13px; font-weight: 700; color: var(--ink); }
  .device-card-cat { font-size: 11px; color: var(--gray); margin-top: 2px; }
  .device-card-footer {
    padding: 10px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }

  /* ── UPLOAD ZONE ── */
  .upload-zone {
    border: 2px dashed var(--border); border-radius: 10px;
    padding: 24px; text-align: center; cursor: pointer;
    transition: all 0.15s; background: var(--cream);
  }
  .upload-zone:hover { border-color: var(--forest-mid); background: var(--forest-overlay); }
  .upload-icon { font-size: 24px; margin-bottom: 8px; }
  .upload-text { font-size: 13px; color: var(--gray); }
  .upload-text strong { color: var(--forest-mid); cursor: pointer; }

  /* ── ALERTS ── */
  .alert {
    padding: 12px 16px; border-radius: 10px; font-size: 13px;
    display: flex; gap: 10px; align-items: flex-start; margin-bottom: 18px;
  }
  .alert-warning { background: var(--amber-light); border: 1px solid rgba(192,120,48,0.3); color: #7A4E18; }
  .alert-info    { background: var(--sky-light);   border: 1px solid rgba(42,96,128,0.25);  color: var(--sky); }
  .alert-danger  { background: var(--red-bg);       border: 1px solid rgba(184,64,64,0.3);   color: var(--red-soft); }
  .alert-success { background: #E8F5EE;             border: 1px solid rgba(26,107,58,0.25);  color: #1A6B3A; }
  .alert-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  [data-theme="dark"] .alert-warning { color: #E8B870; }
  [data-theme="dark"] .alert-info    { color: #7AB8E0; }
  [data-theme="dark"] .alert-success { background: #0F2E1A; border-color: rgba(80,200,122,0.2); color: #50C87A; }
  [data-theme="dark"] .alert-danger  { color: #E06060; }

  /* ── PROGRESS ── */
  .progress-bar { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--forest); border-radius: 3px; transition: width 0.3s; }
  .progress-fill.amber { background: var(--amber); }

  /* ── ANIMATION ── */
  .screen-fade { animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  /* ── SPLASH ── */
  .splash {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--sidebar-bg);
    position: relative; overflow: hidden; padding: 24px;
  }
  .splash-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 30% 20%, rgba(61,139,112,0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 80%, rgba(192,120,48,0.25) 0%, transparent 50%);
  }
  .splash-content { position: relative; z-index: 1; text-align: center; max-width: 400px; width: 100%; }
  .splash-logo { font-family: 'DM Serif Display', serif; font-size: 52px; color: var(--cream); letter-spacing: 1px; }
  .splash-tagline { font-size: 15px; color: var(--sage); margin-top: 10px; font-weight: 300; letter-spacing: 0.5px; }
  .splash-divider { width: 40px; height: 2px; background: var(--amber); margin: 24px auto; }
  .splash-sub { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6; }
  .country-picker { margin-top: 36px; width: 100%; }
  .country-picker-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--sage); margin-bottom: 12px; }
  .country-list { display: flex; flex-direction: column; gap: 8px; }
  .country-option {
    background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 12px; padding: 14px 18px; cursor: pointer;
    display: flex; align-items: center; gap: 14px; transition: all 0.15s;
    color: white; width: 100%; text-align: left; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .country-option:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); }
  .country-option-flag { font-size: 24px; }
  .country-option-name { font-size: 15px; font-weight: 600; }
  .country-option-sub { font-size: 11px; color: var(--sage); margin-top: 2px; }
  .country-option-arrow { margin-left: auto; color: var(--sage); font-size: 16px; }

  /* ── ROLE SELECT ── */
  .role-select-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
  .role-card {
    background: var(--white); border: 2px solid var(--border); border-radius: 14px;
    padding: 22px; cursor: pointer; transition: all 0.15s; text-align: left;
    width: 100%; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .role-card:hover { border-color: var(--forest-mid); }
  .role-card[aria-pressed="true"] { border-color: var(--forest); background: var(--forest-overlay); }
  .role-card-icon { font-size: 28px; margin-bottom: 12px; }
  .role-card-title { font-size: 15px; font-weight: 700; color: var(--ink); }
  .role-card-desc { font-size: 12px; color: var(--gray); margin-top: 5px; line-height: 1.5; }

  /* ── AUDIT LOG ── */
  .audit-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .audit-item:last-child { border-bottom: none; }
  .audit-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
  .audit-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--forest); flex-shrink: 0; }
  .audit-line { flex: 1; width: 1px; background: var(--border); margin-top: 4px; }
  .audit-content { flex: 1; }
  .audit-action { font-size: 13px; font-weight: 600; color: var(--ink); }
  .audit-meta { font-size: 11px; color: var(--gray); margin-top: 2px; }

  /* ── PAYOUT ── */
  .payout-card {
    background: var(--white); border-radius: 14px; border: 1.5px solid var(--border);
    padding: 18px 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px;
  }
  .payout-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .payout-card-name { font-size: 14px; font-weight: 700; color: var(--ink); }
  .payout-card-sub { font-size: 12px; color: var(--gray); margin-top: 2px; }
  .amount-track { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
  .amount-cell { text-align: center; }
  .amount-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); font-weight: 600; }
  .amount-val { font-size: 18px; font-weight: 700; color: var(--ink); margin-top: 4px; }
  .amount-val.green { color: var(--forest-mid); }
  .amount-val.amber { color: var(--amber); }

  /* ── MISC UTILITIES ── */
  .two-col   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .flex-gap { display: flex; align-items: center; gap: 10px; }
  .text-xs { font-size: 11px; }
  .text-sm { font-size: 13px; }
  .text-gray { color: var(--gray); }
  .text-ink { color: var(--ink); }
  .text-forest { color: var(--forest-mid); }
  .fw-600 { font-weight: 600; }
  .mb-4  { margin-bottom: 4px; }
  .mb-8  { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .mt-16 { margin-top: 16px; }
  .mt-24 { margin-top: 24px; }
  .serif { font-family: 'DM Serif Display', serif; }
  .section-header { margin-bottom: 20px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .section-sub { font-size: 13px; color: var(--gray); margin-top: 4px; }
  .blocked-banner {
    background: var(--red-bg); border: 1.5px solid rgba(184,64,64,0.3);
    border-radius: 12px; padding: 20px 24px; text-align: center; margin-bottom: 24px;
  }
  .blocked-icon { font-size: 32px; margin-bottom: 10px; }
  .blocked-title { font-family: 'DM Serif Display', serif; font-size: 17px; color: var(--red-soft); }
  .blocked-sub { font-size: 13px; color: var(--gray); margin-top: 6px; line-height: 1.5; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .amount-track { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .sidebar {
      position: fixed; top: 0; bottom: 0; left: 0;
      transform: translateX(-100%); z-index: 100;
      width: 260px; min-width: 260px;
    }
    .sidebar.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0,0,0,0.4); }
    .sidebar-overlay.open { display: block; }
    .topbar { padding: 0 16px; }
    .content { padding: 16px; }
    .topbar-pill { display: none; }
    .two-col   { grid-template-columns: 1fr; }
    .three-col { grid-template-columns: 1fr; }
    .device-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 540px) {
    .stats-grid  { grid-template-columns: 1fr 1fr; }
    .device-grid { grid-template-columns: 1fr; }
    .form-row    { grid-template-columns: 1fr; }
    .role-select-grid { grid-template-columns: 1fr; }
    .splash-logo { font-size: 38px; }
    .section-title { font-size: 18px; }
    .topbar-title  { font-size: 15px; }
    .content { padding: 12px; }
    .admin-layout { flex-direction: column !important; }
    .admin-detail { width: 100% !important; }
  }

  @media (max-width: 380px) {
    .stats-grid { grid-template-columns: 1fr; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const DEVICES = [
  { id: 1, name: "Blood Pressure Monitor", cat: "Cardiovascular", icon: "🩺", available: 42, color: "#E8F5EE" },
  { id: 2, name: "Pulse Oximeter",          cat: "Respiratory",    icon: "🫀", available: 88, color: "#EAF1FB" },
  { id: 3, name: "Glucometer Kit",           cat: "Metabolic",      icon: "🩸", available: 31, color: "#FDF0E8" },
  { id: 4, name: "Digital Thermometer",      cat: "General",        icon: "🌡️", available: 120, color: "#F5F0F8" },
  { id: 5, name: "Peak Flow Meter",          cat: "Respiratory",    icon: "💨", available: 19, color: "#EAF5F0" },
  { id: 6, name: "BMI Scale (Smart)",        cat: "Metabolic",      icon: "⚖️", available: 27, color: "#FFF8E8" },
];

const CASES = [
  { id: "REQ-2841", type: "Device Request",      provider: "Lagos General Hospital", amount: "—",       status: "pending",  flag: false, date: "Today, 9:14am",  country: "🇳🇬" },
  { id: "FA-1093",  type: "Financial Assistance", provider: "Kano Medical Centre",    amount: "₦480,000", status: "review",   flag: true,  date: "Today, 8:02am",  country: "🇳🇬" },
  { id: "EQ-0572",  type: "Equipment Request",    provider: "Abuja Clinic Trust",     amount: "—",       status: "approved", flag: false, date: "Yesterday",       country: "🇳🇬" },
  { id: "FA-1089",  type: "Financial Assistance", provider: "Ikeja Pharmacy Group",   amount: "₦125,000", status: "paid",     flag: false, date: "Yesterday",       country: "🇳🇬" },
  { id: "REQ-2839", type: "Device Request",       provider: "Lekki Health Access",    amount: "—",       status: "pending",  flag: false, date: "2 days ago",      country: "🇳🇬" },
];

// ── SCREENS ───────────────────────────────────────────────────────────────────

function Splash({ onSelectCountry }) {
  const countries = [
    { flag: "🇳🇬", name: "Nigeria",       sub: "Telemedicine + Device Access + Financial Assistance" },
    { flag: "🇺🇸", name: "United States", sub: "Device Access + Financial Assistance" },
    { flag: "🌍", name: "Other Region",   sub: "Feature availability varies by country" },
  ];
  return (
    <div className="splash screen-fade" role="main">
      <div className="splash-bg" aria-hidden="true" />
      <div className="splash-content">
        <p className="splash-logo" aria-label="SPOB">SPOB</p>
        <p className="splash-tagline">Global Health Access Platform</p>
        <div className="splash-divider" aria-hidden="true" />
        <p className="splash-sub">Connecting communities to preventive care, medical devices, and health funding — worldwide.</p>
        <nav className="country-picker" aria-label="Region selection">
          <p className="country-picker-label" id="region-label">Select your region to continue</p>
          <ul className="country-list" role="list" aria-labelledby="region-label">
            {countries.map(c => (
              <li key={c.name} role="listitem">
                <button className="country-option" onClick={() => onSelectCountry(c.name)}>
                  <span className="country-option-flag" aria-hidden="true">{c.flag}</span>
                  <span>
                    <span className="country-option-name">{c.name}</span>
                    <span className="country-option-sub">{c.sub}</span>
                  </span>
                  <span className="country-option-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function RoleSelect({ country, onSelectRole }) {
  const [selected, setSelected] = useState(null);
  const roles = [
    { id: "beneficiary", icon: "🙋", title: "Beneficiary",       desc: "Request medical devices or financial assistance for your healthcare needs" },
    { id: "provider",    icon: "🏥", title: "Provider / Clinic", desc: "Request equipment, verify billing, and receive medical assistance funds" },
    { id: "donor",       icon: "🤝", title: "Donor",             desc: "Contribute devices or funds to healthcare campaigns and individual cases" },
    { id: "admin",       icon: "🛡️", title: "Administrator",    desc: "Review cases, verify providers, manage payouts and compliance" },
  ];
  return (
    <main className="splash screen-fade" style={{ background: "var(--cream)" }}>
      <div style={{ maxWidth: 480, width: "100%", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>Welcome to SPOB</h1>
          <p className="text-sm text-gray" style={{ marginTop: 6 }}>Region: <strong>{country}</strong> — How will you use the platform?</p>
        </div>
        <fieldset style={{ border: "none", padding: 0 }}>
          <legend className="sr-only">Select your role</legend>
          <div className="role-select-grid">
            {roles.map(r => (
              <button
                key={r.id}
                className="role-card"
                aria-pressed={selected === r.id}
                onClick={() => setSelected(r.id)}
              >
                <div className="role-card-icon" aria-hidden="true">{r.icon}</div>
                <div className="role-card-title">{r.title}</div>
                <div className="role-card-desc">{r.desc}</div>
              </button>
            ))}
          </div>
        </fieldset>
        {selected && (
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 20, justifyContent: "center", padding: "13px" }}
            onClick={() => onSelectRole(selected)}
          >
            Continue as {roles.find(r => r.id === selected)?.title} →
          </button>
        )}
      </div>
    </main>
  );
}

function BeneficiaryDashboard({ country }) {
  return (
    <div className="screen-fade">
      <div className="section-header">
        <h2 className="section-title">My Health Dashboard</h2>
        <p className="section-sub">Track your device requests and assistance applications, {country}</p>
      </div>
      <dl className="stats-grid">
        {[
          { label: "Active Requests",    value: "2",    delta: "1 awaiting match" },
          { label: "Devices Received",   value: "1",    delta: "Blood pressure monitor" },
          { label: "Assistance Applied", value: "₦0",   delta: "No active applications" },
          { label: "Case Health Score",  value: "97%",  delta: "Fully verified" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <dt className="stat-label">{s.label}</dt>
            <dd className="stat-value">{s.value}</dd>
            <dd className="stat-delta">{s.delta}</dd>
          </div>
        ))}
      </dl>
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">My Requests</h3>
              <p className="card-sub">Current and past submissions</p>
            </div>
          </div>
          <table className="table" aria-label="My requests">
            <thead><tr><th scope="col">Item</th><th scope="col">Type</th><th scope="col">Status</th></tr></thead>
            <tbody>
              <tr><td><strong>Blood Pressure Monitor</strong></td><td><span className="badge badge-blue">Device</span></td><td><span className="badge badge-green"><span className="badge-dot" aria-hidden="true"/>Delivered</span></td></tr>
              <tr><td><strong>Pulse Oximeter</strong></td><td><span className="badge badge-blue">Device</span></td><td><span className="badge badge-amber"><span className="badge-dot" aria-hidden="true"/>Matched</span></td></tr>
              <tr><td><strong>Clinic Bill — Oct</strong></td><td><span className="badge badge-gray">Assistance</span></td><td><span className="badge badge-gray"><span className="badge-dot" aria-hidden="true"/>Draft</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="card card-pad">
          <h3 className="card-title serif mb-16">Request Checklist</h3>
          <ul style={{ listStyle: "none", padding: 0 }} aria-label="Checklist progress">
            {[
              { done: true,  text: "Identity verified (OTP)" },
              { done: true,  text: "Country confirmed — Nigeria" },
              { done: true,  text: "Device request submitted" },
              { done: false, text: "Financial assistance form" },
              { done: false, text: "Provider payee added" },
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }} aria-label={`${item.text}: ${item.done ? "complete" : "incomplete"}`}>
                <span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "var(--forest)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", flexShrink: 0 }}>
                  {item.done ? "✓" : ""}
                </span>
                <span className="text-sm" style={{ color: item.done ? "var(--ink)" : "var(--gray)" }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DeviceCatalog({ country }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);

  if (step === 2) return (
    <div className="screen-fade" style={{ maxWidth: 560 }} role="main" aria-live="polite">
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">✅</div>
        <h2 className="serif" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 8 }}>Request Submitted</h2>
        <p className="text-sm text-gray" style={{ lineHeight: 1.6, marginBottom: 24 }}>Your request for a <strong>{DEVICES.find(d => d.id === selected)?.name}</strong> has been received. You'll be notified when a match is found.</p>
        <div className="alert alert-info" role="status"><span className="alert-icon" aria-hidden="true">ℹ️</span> Estimated match time: <strong>2–5 business days</strong>. Delivery will be arranged once confirmed.</div>
        <button className="btn btn-outline" onClick={() => { setStep(0); setSelected(null); }}>← Back to Catalog</button>
      </div>
    </div>
  );

  if (step === 1 && selected) {
    const device = DEVICES.find(d => d.id === selected);
    return (
      <div className="screen-fade" style={{ maxWidth: 600 }}>
        <div className="flex-between mb-24">
          <div>
            <h2 className="section-title">Request: {device.name}</h2>
            <p className="section-sub">Complete all required fields to submit your request</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>← Back</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }} role="list" aria-label="Request steps">
          {["Select Device", "Your Details", "Confirm"].map((s, i) => (
            <div key={s} role="listitem" style={{ display: "flex", alignItems: "center", flex: i < 2 ? "1" : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div className={`step-dot ${i < 1 ? "done" : i === 1 ? "active" : "inactive"}`} aria-current={i === 1 ? "step" : undefined}>{i < 1 ? "✓" : i + 1}</div>
                <div className="step-label text-xs text-gray">{s}</div>
              </div>
              {i < 2 && <div className={`step-line ${i < 1 ? "done" : ""}`} style={{ marginBottom: 18 }} aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <h3 className="form-section-title">Eligibility &amp; Need</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="dc-fullname">Full Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <input id="dc-fullname" className="form-input" placeholder="As on your ID" required aria-required="true" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="dc-phone">Phone Number <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <input id="dc-phone" className="form-input" type="tel" placeholder="+234 — " required aria-required="true" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="dc-need">Medical Need / Reason <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
            <textarea id="dc-need" className="form-textarea" placeholder="Briefly describe why you need this device and how you will use it for preventive care..." required aria-required="true" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="dc-provider">Referring Provider <span className="text-gray fw-600" style={{ fontWeight: 400 }}>(optional)</span></label>
            <input id="dc-provider" className="form-input" placeholder="Clinic or hospital name" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="dc-address">Delivery Address <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
            <input id="dc-address" className="form-input" placeholder="Street address, city, state" required aria-required="true" />
          </div>
          <div className="alert alert-warning" style={{ marginTop: 4 }} role="note">
            <span className="alert-icon" aria-hidden="true">⚠️</span>
            <span>Only <strong>new, preventive</strong> devices are available. Therapeutic or treatment devices are not in scope for this platform.</span>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Submit Request →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-fade">
      <div className="flex-between mb-24">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <h2 className="section-title">Device Catalog</h2>
          <p className="section-sub">Approved new preventive devices — {country}</p>
        </div>
        <div className="flex-gap">
          <label htmlFor="cat-filter" className="sr-only">Filter by category</label>
          <select id="cat-filter" className="form-select" style={{ width: 160 }}>
            <option>All Categories</option>
            <option>Cardiovascular</option>
            <option>Respiratory</option>
            <option>Metabolic</option>
          </select>
        </div>
      </div>
      <div className="device-grid" role="list" aria-label="Available devices">
        {DEVICES.map(d => (
          <button
            key={d.id}
            role="listitem"
            className="device-card"
            aria-pressed={selected === d.id}
            aria-label={`${d.name}, ${d.cat}, ${d.available} available. ${selected === d.id ? "Selected." : "Click to select."}`}
            onClick={() => setSelected(d.id)}
          >
            <div className="device-card-img" style={{ background: d.color }} aria-hidden="true">{d.icon}</div>
            <div className="device-card-body">
              <div className="device-card-name">{d.name}</div>
              <div className="device-card-cat">{d.cat}</div>
            </div>
            <div className="device-card-footer">
              <span className="badge badge-green"><span className="badge-dot" aria-hidden="true"/>{d.available} available</span>
              <span className="badge badge-gray">Preventive</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={() => setStep(1)}>
            Request {DEVICES.find(d => d.id === selected)?.name} →
          </button>
        </div>
      )}
    </div>
  );
}

function ProviderDashboard({ country }) {
  return (
    <div className="screen-fade">
      <div className="section-header">
        <h2 className="section-title">Provider Dashboard</h2>
        <p className="section-sub">Lagos General Hospital · {country} · Verified ✓</p>
      </div>
      <div className="alert alert-success mb-24" role="status">
        <span className="alert-icon" aria-hidden="true">✅</span>
        <strong>Provider verified.</strong> Your facility is approved to receive equipment and financial assistance disbursements.
      </div>
      <dl className="stats-grid">
        {[
          { label: "Open Requests",    value: "3",      delta: "2 pending admin review" },
          { label: "Devices Received", value: "14",     delta: "This quarter" },
          { label: "Funds Received",   value: "₦2.1M",  delta: "Total disbursed YTD" },
          { label: "Patients Reached", value: "1,840",  delta: "Estimated from device usage" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <dt className="stat-label">{s.label}</dt>
            <dd className="stat-value">{s.value}</dd>
            <dd className="stat-delta">{s.delta}</dd>
          </div>
        ))}
      </dl>
      <div className="card">
        <div className="card-header">
          <div><h3 className="card-title">Recent Activity</h3></div>
          <button className="btn btn-outline btn-sm">View All</button>
        </div>
        <table className="table" aria-label="Recent activity">
          <thead><tr><th scope="col">Case ID</th><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Status</th><th scope="col">Date</th></tr></thead>
          <tbody>
            <tr><td><strong>FA-1089</strong></td><td>Financial Assistance</td><td>₦125,000</td><td><span className="badge badge-green"><span className="badge-dot" aria-hidden="true"/>Paid</span></td><td className="text-gray text-xs">Yesterday</td></tr>
            <tr><td><strong>EQ-0572</strong></td><td>Equipment Request</td><td>—</td><td><span className="badge badge-blue"><span className="badge-dot" aria-hidden="true"/>Approved</span></td><td className="text-gray text-xs">Yesterday</td></tr>
            <tr><td><strong>FA-1093</strong></td><td>Financial Assistance</td><td>₦480,000</td><td><span className="badge badge-amber"><span className="badge-dot" aria-hidden="true"/>Under Review</span></td><td className="text-gray text-xs">Today</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EquipmentRequest() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="screen-fade" style={{ maxWidth: 500 }} aria-live="polite">
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">📋</div>
        <h2 className="serif" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 8 }}>Equipment Request Submitted</h2>
        <p className="text-sm text-gray" style={{ lineHeight: 1.6, marginBottom: 24 }}>Case ID: <strong>EQ-0591</strong>. Admin will review your facility profile and eligibility within 2 business days.</p>
        <button className="btn btn-outline" onClick={() => setSubmitted(false)}>← New Request</button>
      </div>
    </div>
  );
  return (
    <div className="screen-fade" style={{ maxWidth: 680 }}>
      <div className="section-header">
        <h2 className="section-title">Equipment Request</h2>
        <p className="section-sub">For approved clinics and hospitals in Nigeria and enabled regions</p>
      </div>
      <div className="alert alert-info mb-24" role="note">
        <span className="alert-icon" aria-hidden="true">🌍</span>
        Only available in approved regions. Cross-border donations from U.S. clinics are matched where inventory is available.
      </div>
      <div className="card card-pad">
        <h3 className="form-section-title">Facility Profile</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="eq-facility-name">Facility Name <span aria-hidden="true">*</span></label>
            <input id="eq-facility-name" className="form-input" defaultValue="Lagos General Hospital" required aria-required="true" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-facility-type">Facility Type <span aria-hidden="true">*</span></label>
            <select id="eq-facility-type" className="form-select" required aria-required="true">
              <option>Public Hospital</option><option>Private Clinic</option><option>Community Health Centre</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="eq-state">State / Region <span aria-hidden="true">*</span></label>
            <select id="eq-state" className="form-select" required aria-required="true">
              <option>Lagos</option><option>Abuja</option><option>Kano</option><option>Rivers</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-reg">Registration Number</label>
            <input id="eq-reg" className="form-input" placeholder="MDCN or facility reg. no." />
          </div>
        </div>
        <h3 className="form-section-title" style={{ marginTop: 8 }}>Equipment Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="eq-type">Equipment Type <span aria-hidden="true">*</span></label>
            <select id="eq-type" className="form-select" required aria-required="true">
              <option>Blood Pressure Monitors</option><option>Pulse Oximeters</option><option>Glucometer Kits</option><option>Thermometers</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-qty">Quantity Requested <span aria-hidden="true">*</span></label>
            <input id="eq-qty" className="form-input" type="number" min="1" placeholder="e.g. 20" required aria-required="true" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="eq-justification">Clinical Use Justification <span aria-hidden="true">*</span></label>
          <textarea id="eq-justification" className="form-textarea" placeholder="Describe the preventive care use case, target patient population, and expected monthly usage..." required aria-required="true" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="eq-vol">Expected Beneficiary Volume</label>
            <input id="eq-vol" className="form-input" placeholder="Patients per month" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="eq-storage">Storage Readiness</label>
            <select id="eq-storage" className="form-select">
              <option>Climate-controlled room available</option><option>Standard storage room</option><option>Shared storage</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="eq-docs">Supporting Documents</label>
          <div className="upload-zone" role="button" tabIndex={0} aria-label="Upload supporting documents" id="eq-docs">
            <div className="upload-icon" aria-hidden="true">📎</div>
            <p className="upload-text"><strong>Choose files</strong> or drag here</p>
            <p className="text-xs text-gray" style={{ marginTop: 4 }}>Facility license, inventory list, need assessment (PDF, JPG · max 10MB)</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button className="btn btn-ghost">Save Draft</button>
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit Request →</button>
        </div>
      </div>
    </div>
  );
}

function FinancialAssistance() {
  const [providerAdded, setProviderAdded] = useState(false);
  return (
    <div className="screen-fade" style={{ maxWidth: 680 }}>
      <div className="section-header">
        <h2 className="section-title">Medical Financial Assistance</h2>
        <p className="section-sub">Funds are paid exclusively to verified provider organizations — never to patients</p>
      </div>
      <div className="alert alert-warning mb-24" role="note">
        <span className="alert-icon" aria-hidden="true">⚠️</span>
        <strong>Provider payee required.</strong> You must identify and verify the provider receiving payment before this request can be approved.
      </div>
      <div className="card card-pad">
        <h3 className="form-section-title">Request Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="fa-type">Request Type <span aria-hidden="true">*</span></label>
            <select id="fa-type" className="form-select" required aria-required="true">
              <option>Hospital Bill</option><option>Pharmacy / Medicines</option><option>Lab / Diagnostics</option><option>Preventive Care</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="fa-amount">Total Amount Requested <span aria-hidden="true">*</span></label>
            <input id="fa-amount" className="form-input" placeholder="₦ 0.00" required aria-required="true" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="fa-desc">Description of Need <span aria-hidden="true">*</span></label>
          <textarea id="fa-desc" className="form-textarea" placeholder="Describe the medical situation and how funds will be used..." required aria-required="true" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="fa-upload">Invoice / Bill / Prescription <span aria-hidden="true">*</span></label>
          <div className="upload-zone" role="button" tabIndex={0} aria-label="Upload invoice or bill" id="fa-upload">
            <div className="upload-icon" aria-hidden="true">🧾</div>
            <p className="upload-text"><strong>Upload invoice or bill</strong></p>
            <p className="text-xs text-gray" style={{ marginTop: 4 }}>PDF, JPG, PNG · Issued by provider within last 90 days</p>
          </div>
        </div>

        <h3 className="form-section-title" style={{ marginTop: 8 }}>Provider Payee</h3>
        {!providerAdded ? (
          <div style={{ border: "2px dashed var(--border)", borderRadius: 10, padding: 20, textAlign: "center" }} role="status" aria-live="polite">
            <div style={{ fontSize: 24, marginBottom: 8 }} aria-hidden="true">🏥</div>
            <p className="text-sm fw-600" style={{ marginBottom: 4 }}>No provider linked yet</p>
            <p className="text-xs text-gray" style={{ marginBottom: 14 }}>Payments cannot be released until a verified provider is linked to this request.</p>
            <button className="btn btn-outline btn-sm" onClick={() => setProviderAdded(true)}>+ Add Provider Payee</button>
          </div>
        ) : (
          <div className="payout-card" style={{ border: "1.5px solid var(--forest)", background: "var(--forest-overlay)" }} role="status" aria-live="polite" aria-label="Provider linked: Lagos General Hospital, verified">
            <div className="payout-card-icon" style={{ background: "var(--sage-light)" }} aria-hidden="true">🏥</div>
            <div>
              <div className="payout-card-name">Lagos General Hospital</div>
              <div className="payout-card-sub">Verified Provider · Account: **** 4821 · GTBank</div>
            </div>
            <span className="badge badge-green">✓ Verified</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn btn-ghost">Save Draft</button>
          <button
            className="btn btn-primary"
            disabled={!providerAdded}
            aria-disabled={!providerAdded}
            aria-describedby={!providerAdded ? "fa-provider-hint" : undefined}
          >
            Submit Request →
          </button>
        </div>
        {!providerAdded && <p id="fa-provider-hint" className="text-xs text-gray" style={{ marginTop: 8 }}>Add a provider payee to enable submission.</p>}
      </div>
    </div>
  );
}

function Telemedicine({ country }) {
  const isUS = country === "United States";
  return (
    <div className="screen-fade" style={{ maxWidth: 600 }}>
      <h2 className="section-title mb-16">Telemedicine</h2>
      {isUS ? (
        <>
          <div className="blocked-banner" role="alert">
            <div className="blocked-icon" aria-hidden="true">🚫</div>
            <h3 className="blocked-title">Telemedicine is not available in the United States</h3>
            <p className="blocked-sub">This feature is disabled for U.S. users by platform policy. SPOB does not currently operate as a licensed telehealth provider in the United States. Please consult a licensed U.S. healthcare provider for medical consultations.</p>
          </div>
          <div className="card card-pad">
            <h3 className="serif mb-8" style={{ fontSize: 15, color: "var(--ink)" }}>Available in your region</h3>
            <p className="text-sm text-gray" style={{ lineHeight: 1.6 }}>Device Access and Medical Financial Assistance are available to you. Use the navigation to explore those features.</p>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button className="btn btn-outline btn-sm">View Devices →</button>
              <button className="btn btn-ghost btn-sm">Financial Assistance →</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="alert alert-success mb-24" role="status">
            <span className="alert-icon" aria-hidden="true">✅</span>
            Telemedicine is <strong>active in Nigeria</strong>. Book a consultation with an approved provider.
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Available Providers</h3>
              <button className="btn btn-primary btn-sm">+ Book Consultation</button>
            </div>
            <table className="table" aria-label="Available telemedicine providers">
              <thead><tr><th scope="col">Provider</th><th scope="col">Specialty</th><th scope="col">Next Available</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>
                {[
                  { name: "Dr. Amara Okafor", spec: "General Practice",     next: "Today, 3:00pm" },
                  { name: "Dr. Emeka Nwosu",  spec: "Preventive Medicine",  next: "Tomorrow, 10am" },
                  { name: "Dr. Fatima Bello", spec: "Nutrition & Wellness", next: "Tomorrow, 2:00pm" },
                ].map(p => (
                  <tr key={p.name}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.spec}</td>
                    <td><span className="badge badge-green">{p.next}</span></td>
                    <td><button className="btn btn-outline btn-sm" aria-label={`Book consultation with ${p.name}`}>Book</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function AdminQueue() {
  const [selected, setSelected] = useState(null);
  const statusBadge = s => {
    if (s === "pending")  return <span className="badge badge-amber"><span className="badge-dot" aria-hidden="true"/>Pending</span>;
    if (s === "review")   return <span className="badge badge-red"><span className="badge-dot" aria-hidden="true"/>Flagged</span>;
    if (s === "approved") return <span className="badge badge-green"><span className="badge-dot" aria-hidden="true"/>Approved</span>;
    if (s === "paid")     return <span className="badge badge-blue"><span className="badge-dot" aria-hidden="true"/>Paid</span>;
    return null;
  };
  const c = selected ? CASES.find(x => x.id === selected) : null;
  const toggle = (id) => setSelected(prev => prev === id ? null : id);

  return (
    <div className="screen-fade">
      <div className="flex-between mb-24">
        <div>
          <h2 className="section-title">Admin Review Queue</h2>
          <p className="section-sub">5 cases — 2 require action</p>
        </div>
        <div className="flex-gap">
          <button className="btn btn-ghost btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">+ New Case</button>
        </div>
      </div>
      <div className="admin-layout" style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="table" aria-label="Cases requiring review">
              <thead>
                <tr>
                  <th scope="col">Case ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {CASES.map(row => (
                  <tr
                    key={row.id}
                    style={{ cursor: "pointer", background: selected === row.id ? "var(--cream)" : "" }}
                    onClick={() => toggle(row.id)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(row.id); } }}
                    tabIndex={0}
                    aria-selected={selected === row.id}
                    aria-label={`${row.id}: ${row.type}, ${row.provider}, status ${row.status}${row.flag ? ", flagged" : ""}`}
                  >
                    <td><strong>{row.id}</strong></td>
                    <td className="text-sm">{row.type}</td>
                    <td>{row.country} {row.provider}</td>
                    <td className="fw-600">{row.amount}</td>
                    <td>{statusBadge(row.status)}{row.flag && <span style={{ marginLeft: 6 }} aria-label="Flagged">🚩</span>}</td>
                    <td className="text-xs text-gray">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {c && (
          <aside className="admin-detail" style={{ width: 300, flexShrink: 0 }} aria-label={`Case detail: ${c.id}`}>
            <div className="card">
              <div className="card-header">
                <div><h3 className="card-title">{c.id}</h3><p className="card-sub">{c.type}</p></div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close case detail panel"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--gray)", lineHeight: 1 }}
                >×</button>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {c.flag && (
                  <div className="alert alert-danger" role="alert">
                    <span className="alert-icon" aria-hidden="true">🚩</span>
                    Suspicious billing pattern detected. Manual review required before any disbursement.
                  </div>
                )}
                <p className="text-xs text-gray fw-600" style={{ marginBottom: 4 }}>PROVIDER</p>
                <p className="text-sm fw-600 mb-16">{c.country} {c.provider}</p>
                {c.amount !== "—" && (
                  <div className="amount-track" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
                    <div className="amount-cell"><div className="amount-label">Requested</div><div className="amount-val">{c.amount}</div></div>
                    <div className="amount-cell"><div className="amount-label">Funded</div><div className="amount-val amber">₦0</div></div>
                  </div>
                )}
                <p className="text-xs text-gray fw-600" style={{ marginBottom: 8 }}>AUDIT LOG</p>
                <ol className="audit-log" aria-label="Audit trail" style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { action: "Request submitted",                              meta: "Provider · " + c.date },
                    { action: "Identity check passed",                          meta: "System · Auto" },
                    { action: c.flag ? "Billing flag raised" : "Queued for review", meta: "System · Auto" },
                  ].map((item, i) => (
                    <li key={i} className="audit-item">
                      <div className="audit-dot-col" aria-hidden="true">
                        <div className="audit-dot" style={{ background: i === 2 && c.flag ? "var(--red-soft)" : "var(--forest)" }} />
                        {i < 2 && <div className="audit-line" />}
                      </div>
                      <div className="audit-content">
                        <div className="audit-action">{item.action}</div>
                        <div className="audit-meta">{item.meta}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Approve</button>
                  <button className="btn btn-danger btn-sm" style={{ flex: 1, justifyContent: "center" }}>Flag / Hold</button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function DonorDashboard() {
  return (
    <div className="screen-fade">
      <h2 className="section-title mb-24">Donor Dashboard</h2>
      <dl className="stats-grid">
        {[
          { label: "Total Donated",        value: "$4,200", delta: "Lifetime contribution" },
          { label: "Devices Donated",       value: "32",     delta: "Across 3 campaigns" },
          { label: "Beneficiaries Reached", value: "218",    delta: "Estimated" },
          { label: "Active Campaigns",      value: "2",      delta: "Accepting contributions" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <dt className="stat-label">{s.label}</dt>
            <dd className="stat-value">{s.value}</dd>
            <dd className="stat-delta">{s.delta}</dd>
          </div>
        ))}
      </dl>
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Active Campaigns</h3>
            <button className="btn btn-primary btn-sm">Contribute</button>
          </div>
          {[
            { name: "Lagos Preventive Care Drive",  goal: 500, raised: 347, type: "Devices + Funds" },
            { name: "Nigeria Glucometer Access",    goal: 200, raised: 180, type: "Devices" },
          ].map(camp => (
            <div key={camp.name} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
              <div className="flex-between mb-8">
                <span className="fw-600 text-sm">{camp.name}</span>
                <span className="badge badge-blue">{camp.type}</span>
              </div>
              <div className="progress-bar mb-4" role="progressbar" aria-valuenow={Math.round(camp.raised/camp.goal*100)} aria-valuemin={0} aria-valuemax={100} aria-label={`${camp.name} progress`}>
                <div className="progress-fill" style={{ width: `${camp.raised/camp.goal*100}%` }} />
              </div>
              <p className="text-xs text-gray">{camp.raised} of {camp.goal} units raised ({Math.round(camp.raised/camp.goal*100)}%)</p>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <h3 className="card-title serif mb-16">Donate Devices</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="donor-device">Device Type</label>
            <select id="donor-device" className="form-select">
              <option>Blood Pressure Monitor</option><option>Pulse Oximeter</option><option>Glucometer Kit</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="donor-qty">Quantity</label>
            <input id="donor-qty" className="form-input" type="number" min="1" placeholder="e.g. 10" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="donor-dest">Destination Region</label>
            <select id="donor-dest" className="form-select">
              <option>Nigeria (Lagos)</option><option>Nigeria (Abuja)</option><option>Any approved region</option>
            </select>
          </div>
          <button className="btn btn-amber" style={{ width: "100%", justifyContent: "center" }}>Donate Devices →</button>
        </div>
      </div>
    </div>
  );
}

// ── NAV CONFIG ────────────────────────────────────────────────────────────────

const NAV = {
  beneficiary: [
    { id: "dashboard",   label: "Dashboard",           icon: "◉", section: "Overview" },
    { id: "devices",     label: "Device Catalog",       icon: "📦", section: "Access" },
    { id: "assistance",  label: "Financial Assistance", icon: "💳", section: "Access" },
    { id: "telemedicine",label: "Telemedicine",          icon: "📹", section: "Access" },
  ],
  provider: [
    { id: "provider-dashboard", label: "Dashboard",           icon: "◉", section: "Overview" },
    { id: "equipment",          label: "Equipment Request",    icon: "🏥", section: "Requests" },
    { id: "assistance",         label: "Financial Assistance", icon: "💳", section: "Requests" },
    { id: "telemedicine",       label: "Telemedicine",          icon: "📹", section: "Services" },
  ],
  donor: [
    { id: "donor-dashboard", label: "Dashboard",      icon: "◉", section: "Overview" },
    { id: "devices",         label: "Device Catalog",  icon: "📦", section: "Donate" },
  ],
  admin: [
    { id: "admin-queue",        label: "Review Queue",   icon: "📋", section: "Operations", badge: 5 },
    { id: "devices",            label: "Device Catalog", icon: "📦", section: "Catalog" },
    { id: "provider-dashboard", label: "Provider View",  icon: "🏥", section: "Verify" },
  ],
};

const ROLE_INFO = {
  beneficiary: { name: "Adaeze Okonkwo",      type: "Beneficiary",    init: "AO" },
  provider:    { name: "Lagos Gen. Hospital",  type: "Provider",       init: "LG" },
  donor:       { name: "James Hartwell",       type: "Donor",          init: "JH" },
  admin:       { name: "Admin Console",        type: "Platform Admin", init: "AD" },
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [country, setCountry] = useState(null);
  const [role, setRole] = useState(null);
  const [activeNav, setActiveNav] = useState(null);
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (role) setActiveNav(NAV[role][0].id);
  }, [role]);

  // Close sidebar on escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSidebarOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleCountry = (c) => { setCountry(c); setScreen("role"); };
  const handleRole = (r) => { setRole(r); setScreen("main"); };
  const handleNav = (id) => { setActiveNav(id); setSidebarOpen(false); };

  const renderScreen = () => {
    switch (activeNav) {
      case "dashboard":          return <BeneficiaryDashboard country={country} />;
      case "devices":            return <DeviceCatalog country={country} />;
      case "assistance":         return <FinancialAssistance />;
      case "telemedicine":       return <Telemedicine country={country} />;
      case "provider-dashboard": return <ProviderDashboard country={country} />;
      case "equipment":          return <EquipmentRequest />;
      case "donor-dashboard":    return <DonorDashboard />;
      case "admin-queue":        return <AdminQueue />;
      default:                   return <BeneficiaryDashboard country={country} />;
    }
  };

  const navItems  = role ? NAV[role] : [];
  const roleInfo  = role ? ROLE_INFO[role] : null;
  const sections  = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});
  const screenTitle = navItems.find(n => n.id === activeNav)?.label || "Dashboard";

  return (
    <>
      <style>{css}</style>
      <div data-theme={darkMode ? "dark" : "light"}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="app">
          {screen === "splash" && <Splash onSelectCountry={handleCountry} />}
          {screen === "role"   && <RoleSelect country={country} onSelectRole={handleRole} />}

          {screen === "main" && (
            <>
              {/* Mobile sidebar overlay */}
              <button
                className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation menu"
                tabIndex={sidebarOpen ? 0 : -1}
              />

              <aside
                id="sidebar"
                className={`sidebar ${sidebarOpen ? "open" : ""}`}
                aria-label="Main navigation"
              >
                <div className="sidebar-brand">
                  <div className="sidebar-brand-logo" aria-label="SPOB">SPOB</div>
                  <div className="sidebar-brand-sub">Health Access Platform</div>
                </div>

                {roleInfo && (
                  <div className="sidebar-role" aria-label={`Signed in as ${roleInfo.name}, ${roleInfo.type}`}>
                    <div className="sidebar-role-avatar" aria-hidden="true">{roleInfo.init}</div>
                    <div className="sidebar-role-info">
                      <div className="sidebar-role-name">{roleInfo.name}</div>
                      <div className="sidebar-role-type">{roleInfo.type}</div>
                    </div>
                  </div>
                )}

                <nav className="sidebar-nav" aria-label="App sections">
                  {Object.entries(sections).map(([section, items]) => (
                    <div key={section}>
                      <div className="sidebar-section-label" aria-hidden="true">{section}</div>
                      {items.map(item => (
                        <button
                          key={item.id}
                          className="nav-item"
                          aria-current={activeNav === item.id ? "page" : undefined}
                          onClick={() => handleNav(item.id)}
                        >
                          <span className="nav-item-icon" aria-hidden="true">{item.icon}</span>
                          {item.label}
                          {item.badge && (
                            <span className="nav-badge" aria-label={`${item.badge} items`}>{item.badge}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </nav>

                <div className="sidebar-country" aria-label={`Current region: ${country}`}>
                  <span className="country-flag" aria-hidden="true">
                    {country === "Nigeria" ? "🇳🇬" : country === "United States" ? "🇺🇸" : "🌍"}
                  </span>
                  <div>
                    <div className="country-name-label">{country}</div>
                    <div className="country-sub">Switch region</div>
                  </div>
                </div>
              </aside>

              <div className="main">
                <header className="topbar">
                  <div className="topbar-left">
                    <button
                      className="hamburger"
                      onClick={() => setSidebarOpen(true)}
                      aria-label="Open navigation menu"
                      aria-expanded={sidebarOpen}
                      aria-controls="sidebar"
                    >
                      ☰
                    </button>
                    <h1 className="topbar-title">{screenTitle}</h1>
                  </div>
                  <div className="topbar-right">
                    <span className={`topbar-pill ${role === "admin" ? "amber" : ""}`} aria-label={role === "admin" ? "Admin mode" : `Region: ${country}`}>
                      {role === "admin" ? "Admin" : country}
                    </span>
                    <button className="topbar-notif" aria-label="Notifications, 1 unread">
                      <span aria-hidden="true">🔔</span>
                      <div className="notif-dot" aria-hidden="true" />
                    </button>
                    <button
                      className="theme-toggle"
                      onClick={() => setDarkMode(d => !d)}
                      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                      aria-pressed={darkMode}
                    >
                      <span aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => { setScreen("splash"); setRole(null); setCountry(null); setSidebarOpen(false); }}
                    >
                      ← Switch View
                    </button>
                  </div>
                </header>

                <main id="main-content" className="content" tabIndex={-1}>
                  {renderScreen()}
                </main>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
