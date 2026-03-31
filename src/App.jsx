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
    --gray: #6B7B72;
    --gray-light: #A8B8B0;
    --border: #D5E0DA;
    --white: #FFFFFF;
  }

  .app { display: flex; height: 100vh; background: var(--cream); overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; }

  /* SIDEBAR */
  .sidebar {
    width: 220px; min-width: 220px; background: var(--forest);
    display: flex; flex-direction: column;
    padding: 0; overflow: hidden; position: relative;
  }
  .sidebar-brand {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .sidebar-brand-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 22px; color: var(--cream); letter-spacing: 0.5px;
    line-height: 1;
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
  .nav-item.active { background: var(--forest-light); color: white; }
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
  .country-info { }
  .country-name { font-size: 12px; color: white; font-weight: 600; }
  .country-sub { font-size: 10px; color: var(--sage); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    background: white; border-bottom: 1px solid var(--border);
    padding: 0 28px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .topbar-title { font-family: 'DM Serif Display', serif; font-size: 19px; color: var(--ink); }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .topbar-pill {
    background: var(--forest); color: white;
    font-size: 11px; font-weight: 600; padding: 5px 12px;
    border-radius: 20px; letter-spacing: 0.3px;
  }
  .topbar-pill.amber { background: var(--amber); }
  .topbar-notif {
    width: 34px; height: 34px; border-radius: 50%;
    border: 1px solid var(--border); display: flex;
    align-items: center; justify-content: center;
    cursor: pointer; background: white; position: relative;
    font-size: 14px;
  }
  .notif-dot {
    width: 8px; height: 8px; background: var(--amber);
    border-radius: 50%; position: absolute; top: 5px; right: 5px;
    border: 2px solid white;
  }

  .content { flex: 1; overflow-y: auto; padding: 28px; background: var(--cream); }

  /* CARDS */
  .card {
    background: white; border-radius: 14px;
    border: 1px solid var(--border); overflow: hidden;
  }
  .card-pad { padding: 22px 24px; }
  .card-header {
    padding: 18px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--ink); }
  .card-sub { font-size: 12px; color: var(--gray); margin-top: 2px; }

  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: white; border-radius: 14px; padding: 20px 22px;
    border: 1px solid var(--border);
  }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--gray); font-weight: 600; }
  .stat-value { font-family: 'DM Serif Display', serif; font-size: 30px; color: var(--ink); margin-top: 6px; line-height: 1; }
  .stat-delta { font-size: 11px; color: var(--forest-mid); margin-top: 6px; font-weight: 500; }
  .stat-delta.neg { color: var(--red-soft); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 9px; font-size: 13px;
    font-weight: 600; cursor: pointer; border: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.15s; white-space: nowrap;
  }
  .btn-primary { background: var(--forest); color: white; }
  .btn-primary:hover { background: var(--forest-mid); }
  .btn-amber { background: var(--amber); color: white; }
  .btn-amber:hover { background: #A0662A; }
  .btn-outline { background: white; color: var(--forest); border: 1.5px solid var(--forest); }
  .btn-outline:hover { background: var(--cream); }
  .btn-ghost { background: transparent; color: var(--gray); border: 1.5px solid var(--border); }
  .btn-ghost:hover { background: var(--cream-dark); }
  .btn-sm { padding: 6px 13px; font-size: 12px; }
  .btn-danger { background: var(--red-bg); color: var(--red-soft); border: 1.5px solid #E0B0B0; }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .badge-green { background: #E8F5EE; color: #1F7A48; }
  .badge-amber { background: var(--amber-light); color: var(--amber); }
  .badge-red { background: var(--red-bg); color: var(--red-soft); }
  .badge-blue { background: var(--sky-light); color: var(--sky); }
  .badge-gray { background: #F0F0F0; color: var(--gray); }
  .badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

  /* FORMS */
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 12px; font-weight: 600; color: var(--ink); margin-bottom: 6px; display: block; }
  .form-label span { color: var(--amber); margin-left: 2px; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 10px 14px; border-radius: 9px;
    border: 1.5px solid var(--border); font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif; color: var(--ink);
    background: white; outline: none; transition: border-color 0.15s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--forest-mid);
  }
  .form-textarea { resize: vertical; min-height: 90px; }
  .form-hint { font-size: 11px; color: var(--gray); margin-top: 5px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-section-title {
    font-family: 'DM Serif Display', serif; font-size: 15px; color: var(--ink);
    margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .form-step-indicator {
    display: flex; align-items: center; gap: 0; margin-bottom: 28px;
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

  /* TABLES */
  .table { width: 100%; border-collapse: collapse; }
  .table th {
    text-align: left; font-size: 11px; text-transform: uppercase;
    letter-spacing: 1px; color: var(--gray); font-weight: 600;
    padding: 10px 16px; border-bottom: 1px solid var(--border);
    background: var(--cream);
  }
  .table td {
    padding: 13px 16px; border-bottom: 1px solid var(--border);
    font-size: 13px; color: var(--ink);
    vertical-align: middle;
  }
  .table tr:hover td { background: var(--cream); }
  .table tr:last-child td { border-bottom: none; }

  /* DEVICE CARD */
  .device-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .device-card {
    background: white; border-radius: 14px; border: 1.5px solid var(--border);
    overflow: hidden; cursor: pointer; transition: all 0.15s;
  }
  .device-card:hover { border-color: var(--forest-mid); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(28,74,58,0.12); }
  .device-card.selected { border-color: var(--forest); box-shadow: 0 0 0 3px rgba(28,74,58,0.12); }
  .device-card-img {
    height: 100px; display: flex; align-items: center; justify-content: center;
    font-size: 40px;
  }
  .device-card-body { padding: 14px 16px; }
  .device-card-name { font-size: 13px; font-weight: 700; color: var(--ink); }
  .device-card-cat { font-size: 11px; color: var(--gray); margin-top: 2px; }
  .device-card-footer {
    padding: 10px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }

  /* UPLOAD ZONE */
  .upload-zone {
    border: 2px dashed var(--border); border-radius: 10px;
    padding: 24px; text-align: center; cursor: pointer;
    transition: all 0.15s; background: var(--cream);
  }
  .upload-zone:hover { border-color: var(--forest-mid); background: #EEF5F2; }
  .upload-icon { font-size: 24px; margin-bottom: 8px; }
  .upload-text { font-size: 13px; color: var(--gray); }
  .upload-text strong { color: var(--forest); cursor: pointer; }

  /* ALERT */
  .alert {
    padding: 12px 16px; border-radius: 10px; font-size: 13px;
    display: flex; gap: 10px; align-items: flex-start;
    margin-bottom: 18px;
  }
  .alert-warning { background: var(--amber-light); border: 1px solid #E0C090; color: #7A4E18; }
  .alert-info { background: var(--sky-light); border: 1px solid #B0D0E8; color: #1A4A6B; }
  .alert-danger { background: var(--red-bg); border: 1px solid #E0B0B0; color: var(--red-soft); }
  .alert-success { background: #E8F5EE; border: 1px solid #A8D8B8; color: #1F5A38; }
  .alert-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  /* PROGRESS */
  .progress-bar { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--forest); border-radius: 3px; transition: width 0.3s; }
  .progress-fill.amber { background: var(--amber); }

  /* FLOW SCREEN */
  .screen-fade { animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  /* SPLASH */
  .splash {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: var(--forest);
    position: relative; overflow: hidden;
  }
  .splash-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(61,139,112,0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 80%, rgba(192,120,48,0.25) 0%, transparent 50%);
  }
  .splash-content { position: relative; z-index: 1; text-align: center; max-width: 400px; }
  .splash-logo { font-family: 'DM Serif Display', serif; font-size: 52px; color: var(--cream); letter-spacing: 1px; }
  .splash-tagline { font-size: 15px; color: var(--sage); margin-top: 10px; font-weight: 300; letter-spacing: 0.5px; }
  .splash-divider { width: 40px; height: 2px; background: var(--amber); margin: 24px auto; }
  .splash-sub { font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6; }
  .country-picker { margin-top: 36px; }
  .country-picker-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--sage); margin-bottom: 12px; }
  .country-list { display: flex; flex-direction: column; gap: 8px; }
  .country-option {
    background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
    border-radius: 12px; padding: 14px 18px; cursor: pointer;
    display: flex; align-items: center; gap: 14px; transition: all 0.15s;
    color: white;
  }
  .country-option:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.35); }
  .country-option-flag { font-size: 24px; }
  .country-option-name { font-size: 15px; font-weight: 600; }
  .country-option-sub { font-size: 11px; color: var(--sage); margin-top: 2px; }
  .country-option-arrow { margin-left: auto; color: var(--sage); }

  /* ROLE SELECT */
  .role-select-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
  .role-card {
    background: white; border: 2px solid var(--border); border-radius: 14px;
    padding: 22px; cursor: pointer; transition: all 0.15s; text-align: left;
  }
  .role-card:hover { border-color: var(--forest-mid); }
  .role-card.selected { border-color: var(--forest); background: #EEF5F2; }
  .role-card-icon { font-size: 28px; margin-bottom: 12px; }
  .role-card-title { font-size: 15px; font-weight: 700; color: var(--ink); }
  .role-card-desc { font-size: 12px; color: var(--gray); margin-top: 5px; line-height: 1.5; }

  /* AUDIT LOG */
  .audit-log { }
  .audit-item {
    display: flex; gap: 14px; padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }
  .audit-item:last-child { border-bottom: none; }
  .audit-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
  .audit-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--forest); flex-shrink: 0; }
  .audit-line { flex: 1; width: 1px; background: var(--border); margin-top: 4px; }
  .audit-content { flex: 1; }
  .audit-action { font-size: 13px; font-weight: 600; color: var(--ink); }
  .audit-meta { font-size: 11px; color: var(--gray); margin-top: 2px; }

  /* PAYMENT FLOW */
  .payout-card {
    background: white; border-radius: 14px; border: 1.5px solid var(--border);
    padding: 18px 20px; display: flex; align-items: center; gap: 16px;
    margin-bottom: 12px;
  }
  .payout-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .payout-card-info { flex: 1; }
  .payout-card-name { font-size: 14px; font-weight: 700; color: var(--ink); }
  .payout-card-sub { font-size: 12px; color: var(--gray); margin-top: 2px; }
  .amount-track { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 16px; }
  .amount-cell { text-align: center; }
  .amount-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); font-weight: 600; }
  .amount-val { font-size: 18px; font-weight: 700; color: var(--ink); margin-top: 4px; }
  .amount-val.green { color: var(--forest); }
  .amount-val.amber { color: var(--amber); }

  /* MISC */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .flex-gap { display: flex; align-items: center; gap: 10px; }
  .text-xs { font-size: 11px; }
  .text-sm { font-size: 13px; }
  .text-gray { color: var(--gray); }
  .text-ink { color: var(--ink); }
  .text-forest { color: var(--forest); }
  .fw-600 { font-weight: 600; }
  .mb-4 { margin-bottom: 4px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .mt-16 { margin-top: 16px; }
  .mt-24 { margin-top: 24px; }
  .serif { font-family: 'DM Serif Display', serif; }
  .section-header { margin-bottom: 20px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); }
  .section-sub { font-size: 13px; color: var(--gray); margin-top: 4px; }
  .disabled-overlay {
    pointer-events: none; opacity: 0.4; filter: grayscale(0.5);
  }
  .blocked-banner {
    background: var(--red-bg); border: 1.5px solid #E0B0B0;
    border-radius: 12px; padding: 20px 24px; text-align: center;
    margin-bottom: 24px;
  }
  .blocked-icon { font-size: 32px; margin-bottom: 10px; }
  .blocked-title { font-family: 'DM Serif Display', serif; font-size: 17px; color: var(--red-soft); }
  .blocked-sub { font-size: 13px; color: #8B5050; margin-top: 6px; line-height: 1.5; }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const DEVICES = [
  { id: 1, name: "Blood Pressure Monitor", cat: "Cardiovascular", icon: "🩺", available: 42, color: "#E8F5EE" },
  { id: 2, name: "Pulse Oximeter", cat: "Respiratory", icon: "🫀", available: 88, color: "#EAF1FB" },
  { id: 3, name: "Glucometer Kit", cat: "Metabolic", icon: "🩸", available: 31, color: "#FDF0E8" },
  { id: 4, name: "Digital Thermometer", cat: "General", icon: "🌡️", available: 120, color: "#F5F0F8" },
  { id: 5, name: "Peak Flow Meter", cat: "Respiratory", icon: "💨", available: 19, color: "#EAF5F0" },
  { id: 6, name: "BMI Scale (Smart)", cat: "Metabolic", icon: "⚖️", available: 27, color: "#FFF8E8" },
];

const CASES = [
  { id: "REQ-2841", type: "Device Request", provider: "Lagos General Hospital", amount: "—", status: "pending", flag: false, date: "Today, 9:14am", country: "🇳🇬" },
  { id: "FA-1093", type: "Financial Assistance", provider: "Kano Medical Centre", amount: "₦480,000", status: "review", flag: true, date: "Today, 8:02am", country: "🇳🇬" },
  { id: "EQ-0572", type: "Equipment Request", provider: "Abuja Clinic Trust", amount: "—", status: "approved", flag: false, date: "Yesterday", country: "🇳🇬" },
  { id: "FA-1089", type: "Financial Assistance", provider: "Ikeja Pharmacy Group", amount: "₦125,000", status: "paid", flag: false, date: "Yesterday", country: "🇳🇬" },
  { id: "REQ-2839", type: "Device Request", provider: "Lekki Health Access", amount: "—", status: "pending", flag: false, date: "2 days ago", country: "🇳🇬" },
];

// ── SCREENS ───────────────────────────────────────────────────────────────────

function Splash({ onSelectCountry }) {
  return (
    <div className="splash screen-fade">
      <div className="splash-bg" />
      <div className="splash-content">
        <div className="splash-logo">SPOB</div>
        <div className="splash-tagline">Global Health Access Platform</div>
        <div className="splash-divider" />
        <div className="splash-sub">Connecting communities to preventive care, medical devices, and health funding — worldwide.</div>
        <div className="country-picker">
          <div className="country-picker-label">Select your region to continue</div>
          <div className="country-list">
            {[
              { flag: "🇳🇬", name: "Nigeria", sub: "Telemedicine + Device Access + Financial Assistance" },
              { flag: "🇺🇸", name: "United States", sub: "Device Access + Financial Assistance" },
              { flag: "🌍", name: "Other Region", sub: "Feature availability varies by country" },
            ].map(c => (
              <div key={c.name} className="country-option" onClick={() => onSelectCountry(c.name)}>
                <div className="country-option-flag">{c.flag}</div>
                <div>
                  <div className="country-option-name">{c.name}</div>
                  <div className="country-option-sub">{c.sub}</div>
                </div>
                <div className="country-option-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleSelect({ country, onSelectRole }) {
  const [selected, setSelected] = useState(null);
  const roles = [
    { id: "beneficiary", icon: "🙋", title: "Beneficiary", desc: "Request medical devices or financial assistance for your healthcare needs" },
    { id: "provider", icon: "🏥", title: "Provider / Clinic", desc: "Request equipment, verify billing, and receive medical assistance funds" },
    { id: "donor", icon: "🤝", title: "Donor", desc: "Contribute devices or funds to healthcare campaigns and individual cases" },
    { id: "admin", icon: "🛡️", title: "Administrator", desc: "Review cases, verify providers, manage payouts and compliance" },
  ];
  return (
    <div className="splash screen-fade" style={{ background: "var(--cream)" }}>
      <div style={{ maxWidth: 480, width: "100%", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="serif" style={{ fontSize: 28, color: "var(--ink)" }}>Welcome to SPOB</div>
          <div className="text-sm text-gray" style={{ marginTop: 6 }}>Region: <strong>{country}</strong> — How will you use the platform?</div>
        </div>
        <div className="role-select-grid">
          {roles.map(r => (
            <div key={r.id} className={`role-card ${selected === r.id ? "selected" : ""}`} onClick={() => setSelected(r.id)}>
              <div className="role-card-icon">{r.icon}</div>
              <div className="role-card-title">{r.title}</div>
              <div className="role-card-desc">{r.desc}</div>
            </div>
          ))}
        </div>
        {selected && (
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 20, justifyContent: "center", padding: "13px" }}
            onClick={() => onSelectRole(selected)}>
            Continue as {roles.find(r => r.id === selected)?.title} →
          </button>
        )}
      </div>
    </div>
  );
}

function BeneficiaryDashboard({ country }) {
  return (
    <div className="screen-fade">
      <div className="section-header">
        <div className="section-title">My Health Dashboard</div>
        <div className="section-sub">Track your device requests and assistance applications, {country}</div>
      </div>
      <div className="stats-grid">
        {[
          { label: "Active Requests", value: "2", delta: "1 awaiting match" },
          { label: "Devices Received", value: "1", delta: "Blood pressure monitor" },
          { label: "Assistance Applied", value: "₦0", delta: "No active applications" },
          { label: "Case Health Score", value: "97%", delta: "Fully verified" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">My Requests</div><div className="card-sub">Current and past submissions</div></div>
          </div>
          <table className="table">
            <thead><tr><th>Item</th><th>Type</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td><strong>Blood Pressure Monitor</strong></td><td><span className="badge badge-blue">Device</span></td><td><span className="badge badge-green"><span className="badge-dot"/>Delivered</span></td></tr>
              <tr><td><strong>Pulse Oximeter</strong></td><td><span className="badge badge-blue">Device</span></td><td><span className="badge badge-amber"><span className="badge-dot"/>Matched</span></td></tr>
              <tr><td><strong>Clinic Bill — Oct</strong></td><td><span className="badge badge-gray">Assistance</span></td><td><span className="badge badge-gray"><span className="badge-dot"/>Draft</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="card card-pad">
          <div className="card-title serif mb-16">Request Checklist</div>
          {[
            { done: true, text: "Identity verified (OTP)" },
            { done: true, text: "Country confirmed — Nigeria" },
            { done: true, text: "Device request submitted" },
            { done: false, text: "Financial assistance form" },
            { done: false, text: "Provider payee added" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "var(--forest)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", flexShrink: 0 }}>
                {item.done ? "✓" : ""}
              </div>
              <span className="text-sm" style={{ color: item.done ? "var(--ink)" : "var(--gray)" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceCatalog({ country }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0); // 0=catalog, 1=form, 2=confirm

  if (step === 2) return (
    <div className="screen-fade" style={{ maxWidth: 560 }}>
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div className="serif" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 8 }}>Request Submitted</div>
        <div className="text-sm text-gray" style={{ lineHeight: 1.6, marginBottom: 24 }}>Your request for a <strong>{DEVICES.find(d => d.id === selected)?.name}</strong> has been received. You'll be notified when a match is found.</div>
        <div className="alert alert-info"><span className="alert-icon">ℹ️</span> Estimated match time: <strong>2–5 business days</strong>. Delivery will be arranged once confirmed.</div>
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
            <div className="section-title">Request: {device.name}</div>
            <div className="section-sub">Complete all required fields to submit your request</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>← Back</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
          {["Select Device", "Your Details", "Confirm"].map((s, i) => (
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div className={`step-dot ${i < 1 ? "done" : i === 1 ? "active" : "inactive"}`}>{i < 1 ? "✓" : i + 1}</div>
                <div className="step-label text-xs text-gray">{s}</div>
              </div>
              {i < 2 && <div className={`step-line ${i < 1 ? "done" : ""}`} style={{ marginBottom: 18 }} />}
            </>
          ))}
        </div>
        <div className="card card-pad">
          <div className="form-section-title">Eligibility & Need</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name <span>*</span></label>
              <input className="form-input" placeholder="As on your ID" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number <span>*</span></label>
              <input className="form-input" placeholder="+234 — " />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Medical Need / Reason <span>*</span></label>
            <textarea className="form-textarea" placeholder="Briefly describe why you need this device and how you will use it for preventive care..." />
          </div>
          <div className="form-group">
            <label className="form-label">Referring Provider (optional)</label>
            <input className="form-input" placeholder="Clinic or hospital name" />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Address <span>*</span></label>
            <input className="form-input" placeholder="Street address, city, state" />
          </div>
          <div className="alert alert-warning" style={{ marginTop: 4 }}>
            <span className="alert-icon">⚠️</span>
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
          <div className="section-title">Device Catalog</div>
          <div className="section-sub">Approved new preventive devices — {country}</div>
        </div>
        <div className="flex-gap">
          <select className="form-select" style={{ width: 160 }}>
            <option>All Categories</option>
            <option>Cardiovascular</option>
            <option>Respiratory</option>
            <option>Metabolic</option>
          </select>
        </div>
      </div>
      <div className="device-grid">
        {DEVICES.map(d => (
          <div key={d.id} className={`device-card ${selected === d.id ? "selected" : ""}`} onClick={() => setSelected(d.id)}>
            <div className="device-card-img" style={{ background: d.color }}>{d.icon}</div>
            <div className="device-card-body">
              <div className="device-card-name">{d.name}</div>
              <div className="device-card-cat">{d.cat}</div>
            </div>
            <div className="device-card-footer">
              <span className="badge badge-green"><span className="badge-dot"/>{d.available} available</span>
              <span className="badge badge-gray">Preventive</span>
            </div>
          </div>
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
        <div className="section-title">Provider Dashboard</div>
        <div className="section-sub">Lagos General Hospital · {country} · Verified ✓</div>
      </div>
      <div className="alert alert-success mb-24">
        <span className="alert-icon">✅</span>
        <strong>Provider verified.</strong> Your facility is approved to receive equipment and financial assistance disbursements.
      </div>
      <div className="stats-grid">
        {[
          { label: "Open Requests", value: "3", delta: "2 pending admin review" },
          { label: "Devices Received", value: "14", delta: "This quarter" },
          { label: "Funds Received", value: "₦2.1M", delta: "Total disbursed YTD" },
          { label: "Patients Reached", value: "1,840", delta: "Estimated from device usage" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">Recent Activity</div></div>
          <button className="btn btn-outline btn-sm">View All</button>
        </div>
        <table className="table">
          <thead><tr><th>Case ID</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            <tr><td><strong>FA-1089</strong></td><td>Financial Assistance</td><td>₦125,000</td><td><span className="badge badge-green"><span className="badge-dot"/>Paid</span></td><td className="text-gray text-xs">Yesterday</td></tr>
            <tr><td><strong>EQ-0572</strong></td><td>Equipment Request</td><td>—</td><td><span className="badge badge-blue"><span className="badge-dot"/>Approved</span></td><td className="text-gray text-xs">Yesterday</td></tr>
            <tr><td><strong>FA-1093</strong></td><td>Financial Assistance</td><td>₦480,000</td><td><span className="badge badge-amber"><span className="badge-dot"/>Under Review</span></td><td className="text-gray text-xs">Today</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EquipmentRequest({ country }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="screen-fade" style={{ maxWidth: 500 }}>
      <div style={{ textAlign: "center", padding: "48px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <div className="serif" style={{ fontSize: 22, color: "var(--ink)", marginBottom: 8 }}>Equipment Request Submitted</div>
        <div className="text-sm text-gray" style={{ lineHeight: 1.6, marginBottom: 24 }}>Case ID: <strong>EQ-0591</strong>. Admin will review your facility profile and eligibility within 2 business days.</div>
        <button className="btn btn-outline" onClick={() => setSubmitted(false)}>← New Request</button>
      </div>
    </div>
  );
  return (
    <div className="screen-fade" style={{ maxWidth: 680 }}>
      <div className="section-header">
        <div className="section-title">Equipment Request</div>
        <div className="section-sub">For approved clinics and hospitals in Nigeria and enabled regions</div>
      </div>
      <div className="alert alert-info mb-24">
        <span className="alert-icon">🌍</span>
        Only available in approved regions. Cross-border donations from U.S. clinics are matched where inventory is available.
      </div>
      <div className="card card-pad">
        <div className="form-section-title">Facility Profile</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Facility Name <span>*</span></label>
            <input className="form-input" defaultValue="Lagos General Hospital" />
          </div>
          <div className="form-group">
            <label className="form-label">Facility Type <span>*</span></label>
            <select className="form-select"><option>Public Hospital</option><option>Private Clinic</option><option>Community Health Centre</option></select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">State / Region <span>*</span></label>
            <select className="form-select"><option>Lagos</option><option>Abuja</option><option>Kano</option><option>Rivers</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Registration Number</label>
            <input className="form-input" placeholder="MDCN or facility reg. no." />
          </div>
        </div>
        <div className="form-section-title" style={{ marginTop: 8 }}>Equipment Details</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Equipment Type <span>*</span></label>
            <select className="form-select"><option>Blood Pressure Monitors</option><option>Pulse Oximeters</option><option>Glucometer Kits</option><option>Thermometers</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Quantity Requested <span>*</span></label>
            <input className="form-input" type="number" placeholder="e.g. 20" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Clinical Use Justification <span>*</span></label>
          <textarea className="form-textarea" placeholder="Describe the preventive care use case, target patient population, and expected monthly usage..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Expected Beneficiary Volume</label>
            <input className="form-input" placeholder="Patients per month" />
          </div>
          <div className="form-group">
            <label className="form-label">Storage Readiness</label>
            <select className="form-select"><option>Climate-controlled room available</option><option>Standard storage room</option><option>Shared storage</option></select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Supporting Documents</label>
          <div className="upload-zone">
            <div className="upload-icon">📎</div>
            <div className="upload-text"><strong>Choose files</strong> or drag here</div>
            <div className="text-xs text-gray" style={{ marginTop: 4 }}>Facility license, inventory list, need assessment (PDF, JPG · max 10MB)</div>
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
        <div className="section-title">Medical Financial Assistance</div>
        <div className="section-sub">Funds are paid exclusively to verified provider organizations — never to patients</div>
      </div>
      <div className="alert alert-warning mb-24">
        <span className="alert-icon">⚠️</span>
        <strong>Provider payee required.</strong> You must identify and verify the provider receiving payment before this request can be approved.
      </div>
      <div className="card card-pad">
        <div className="form-section-title">Request Details</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Request Type <span>*</span></label>
            <select className="form-select"><option>Hospital Bill</option><option>Pharmacy / Medicines</option><option>Lab / Diagnostics</option><option>Preventive Care</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Total Amount Requested <span>*</span></label>
            <input className="form-input" placeholder="₦ 0.00" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description of Need <span>*</span></label>
          <textarea className="form-textarea" placeholder="Describe the medical situation and how funds will be used..." />
        </div>
        <div className="form-group">
          <label className="form-label">Invoice / Bill / Prescription <span>*</span></label>
          <div className="upload-zone">
            <div className="upload-icon">🧾</div>
            <div className="upload-text"><strong>Upload invoice or bill</strong></div>
            <div className="text-xs text-gray" style={{ marginTop: 4 }}>PDF, JPG, PNG · Issued by provider within last 90 days</div>
          </div>
        </div>

        <div className="form-section-title" style={{ marginTop: 8 }}>Provider Payee</div>
        {!providerAdded ? (
          <div style={{ border: "2px dashed var(--border)", borderRadius: 10, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏥</div>
            <div className="text-sm fw-600" style={{ marginBottom: 4 }}>No provider linked yet</div>
            <div className="text-xs text-gray" style={{ marginBottom: 14 }}>Payments cannot be released until a verified provider is linked to this request.</div>
            <button className="btn btn-outline btn-sm" onClick={() => setProviderAdded(true)}>+ Add Provider Payee</button>
          </div>
        ) : (
          <div className="payout-card" style={{ border: "1.5px solid var(--forest)", background: "#EEF5F2" }}>
            <div className="payout-card-icon" style={{ background: "#D0EAE0" }}>🏥</div>
            <div className="payout-card-info">
              <div className="payout-card-name">Lagos General Hospital</div>
              <div className="payout-card-sub">Verified Provider · Account: **** 4821 · GTBank</div>
            </div>
            <span className="badge badge-green">✓ Verified</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn btn-ghost">Save Draft</button>
          <button className={`btn btn-primary ${!providerAdded ? "disabled-overlay" : ""}`} disabled={!providerAdded}>
            Submit Request →
          </button>
        </div>
        {!providerAdded && <div className="text-xs text-gray" style={{ marginTop: 8 }}>Add a provider payee to enable submission.</div>}
      </div>
    </div>
  );
}

function Telemedicine({ country }) {
  const isUS = country === "United States";
  return (
    <div className="screen-fade" style={{ maxWidth: 600 }}>
      <div className="section-title mb-16">Telemedicine</div>
      {isUS ? (
        <>
          <div className="blocked-banner">
            <div className="blocked-icon">🚫</div>
            <div className="blocked-title">Telemedicine is not available in the United States</div>
            <div className="blocked-sub">This feature is disabled for U.S. users by platform policy. SPOB does not currently operate as a licensed telehealth provider in the United States. Please consult a licensed U.S. healthcare provider for medical consultations.</div>
          </div>
          <div className="card card-pad">
            <div className="serif mb-8" style={{ fontSize: 15, color: "var(--ink)" }}>Available in your region</div>
            <div className="text-sm text-gray" style={{ lineHeight: 1.6 }}>Device Access and Medical Financial Assistance are available to you. Use the navigation to explore those features.</div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button className="btn btn-outline btn-sm">View Devices →</button>
              <button className="btn btn-ghost btn-sm">Financial Assistance →</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="alert alert-success mb-24">
            <span className="alert-icon">✅</span>
            Telemedicine is <strong>active in Nigeria</strong>. Book a consultation with an approved provider.
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Available Providers</div><button className="btn btn-primary btn-sm">+ Book Consultation</button></div>
            <table className="table">
              <thead><tr><th>Provider</th><th>Specialty</th><th>Next Available</th><th></th></tr></thead>
              <tbody>
                {[
                  { name: "Dr. Amara Okafor", spec: "General Practice", next: "Today, 3:00pm" },
                  { name: "Dr. Emeka Nwosu", spec: "Preventive Medicine", next: "Tomorrow, 10am" },
                  { name: "Dr. Fatima Bello", spec: "Nutrition & Wellness", next: "Tomorrow, 2:00pm" },
                ].map(p => (
                  <tr key={p.name}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.spec}</td>
                    <td><span className="badge badge-green">{p.next}</span></td>
                    <td><button className="btn btn-outline btn-sm">Book</button></td>
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
    if (s === "pending") return <span className="badge badge-amber"><span className="badge-dot"/>Pending</span>;
    if (s === "review") return <span className="badge badge-red"><span className="badge-dot"/>Flagged</span>;
    if (s === "approved") return <span className="badge badge-green"><span className="badge-dot"/>Approved</span>;
    if (s === "paid") return <span className="badge badge-blue"><span className="badge-dot"/>Paid</span>;
  };
  const c = selected ? CASES.find(x => x.id === selected) : null;
  return (
    <div className="screen-fade">
      <div className="flex-between mb-24">
        <div>
          <div className="section-title">Admin Review Queue</div>
          <div className="section-sub">5 cases — 2 require action</div>
        </div>
        <div className="flex-gap">
          <button className="btn btn-ghost btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">+ New Case</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="card">
            <table className="table">
              <thead>
                <tr><th>Case ID</th><th>Type</th><th>Provider</th><th>Amount</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {CASES.map(c => (
                  <tr key={c.id} style={{ cursor: "pointer", background: selected === c.id ? "var(--cream)" : "" }}
                    onClick={() => setSelected(selected === c.id ? null : c.id)}>
                    <td><strong>{c.id}</strong></td>
                    <td className="text-sm">{c.type}</td>
                    <td>{c.country} {c.provider}</td>
                    <td className="fw-600">{c.amount}</td>
                    <td>{statusBadge(c.status)}{c.flag && <span style={{ marginLeft: 6 }}>🚩</span>}</td>
                    <td className="text-xs text-gray">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {c && (
          <div style={{ width: 300, flexShrink: 0 }}>
            <div className="card">
              <div className="card-header">
                <div><div className="card-title">{c.id}</div><div className="card-sub">{c.type}</div></div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "var(--gray)" }}>×</button>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {c.flag && <div className="alert alert-danger"><span className="alert-icon">🚩</span>Suspicious billing pattern detected. Manual review required before any disbursement.</div>}
                <div className="text-xs text-gray fw-600" style={{ marginBottom: 4 }}>PROVIDER</div>
                <div className="text-sm fw-600 mb-16">{c.country} {c.provider}</div>
                {c.amount !== "—" && <>
                  <div className="amount-track" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
                    <div className="amount-cell"><div className="amount-label">Requested</div><div className="amount-val">{c.amount}</div></div>
                    <div className="amount-cell"><div className="amount-label">Funded</div><div className="amount-val amber">₦0</div></div>
                  </div>
                </>}
                <div className="text-xs text-gray fw-600" style={{ marginBottom: 8 }}>AUDIT LOG</div>
                <div className="audit-log">
                  {[
                    { action: "Request submitted", meta: "Provider · " + c.date },
                    { action: "Identity check passed", meta: "System · Auto" },
                    { action: c.flag ? "Billing flag raised" : "Queued for review", meta: "System · Auto" },
                  ].map((item, i) => (
                    <div key={i} className="audit-item">
                      <div className="audit-dot-col">
                        <div className="audit-dot" style={{ background: i === 2 && c.flag ? "var(--red-soft)" : "var(--forest)" }} />
                        {i < 2 && <div className="audit-line" />}
                      </div>
                      <div className="audit-content">
                        <div className="audit-action">{item.action}</div>
                        <div className="audit-meta">{item.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Approve</button>
                  <button className="btn btn-danger btn-sm" style={{ flex: 1, justifyContent: "center" }}>Flag / Hold</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DonorDashboard() {
  return (
    <div className="screen-fade">
      <div className="section-title mb-24">Donor Dashboard</div>
      <div className="stats-grid">
        {[
          { label: "Total Donated", value: "$4,200", delta: "Lifetime contribution" },
          { label: "Devices Donated", value: "32", delta: "Across 3 campaigns" },
          { label: "Beneficiaries Reached", value: "218", delta: "Estimated" },
          { label: "Active Campaigns", value: "2", delta: "Accepting contributions" },
        ].map(s => <div key={s.label} className="stat-card"><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-delta">{s.delta}</div></div>)}
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-header"><div className="card-title">Active Campaigns</div><button className="btn btn-primary btn-sm">Contribute</button></div>
          {[
            { name: "Lagos Preventive Care Drive", goal: 500, raised: 347, type: "Devices + Funds" },
            { name: "Nigeria Glucometer Access", goal: 200, raised: 180, type: "Devices" },
          ].map(c => (
            <div key={c.name} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
              <div className="flex-between mb-8">
                <div className="fw-600 text-sm">{c.name}</div>
                <span className="badge badge-blue">{c.type}</span>
              </div>
              <div className="progress-bar mb-4"><div className="progress-fill" style={{ width: `${c.raised / c.goal * 100}%` }} /></div>
              <div className="text-xs text-gray">{c.raised} of {c.goal} units raised ({Math.round(c.raised / c.goal * 100)}%)</div>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="card-title serif mb-16">Donate Devices</div>
          <div className="form-group">
            <label className="form-label">Device Type</label>
            <select className="form-select"><option>Blood Pressure Monitor</option><option>Pulse Oximeter</option><option>Glucometer Kit</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input className="form-input" type="number" placeholder="e.g. 10" />
          </div>
          <div className="form-group">
            <label className="form-label">Destination Region</label>
            <select className="form-select"><option>Nigeria (Lagos)</option><option>Nigeria (Abuja)</option><option>Any approved region</option></select>
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
    { id: "dashboard", label: "Dashboard", icon: "◉", section: "Overview" },
    { id: "devices", label: "Device Catalog", icon: "📦", section: "Access" },
    { id: "assistance", label: "Financial Assistance", icon: "💳", section: "Access" },
    { id: "telemedicine", label: "Telemedicine", icon: "📹", section: "Access" },
  ],
  provider: [
    { id: "provider-dashboard", label: "Dashboard", icon: "◉", section: "Overview" },
    { id: "equipment", label: "Equipment Request", icon: "🏥", section: "Requests" },
    { id: "assistance", label: "Financial Assistance", icon: "💳", section: "Requests" },
    { id: "telemedicine", label: "Telemedicine", icon: "📹", section: "Services" },
  ],
  donor: [
    { id: "donor-dashboard", label: "Dashboard", icon: "◉", section: "Overview" },
    { id: "devices", label: "Device Catalog", icon: "📦", section: "Donate" },
  ],
  admin: [
    { id: "admin-queue", label: "Review Queue", icon: "📋", section: "Operations", badge: 5 },
    { id: "devices", label: "Device Catalog", icon: "📦", section: "Catalog" },
    { id: "provider-dashboard", label: "Provider View", icon: "🏥", section: "Verify" },
  ],
};

const ROLE_INFO = {
  beneficiary: { name: "Adaeze Okonkwo", type: "Beneficiary", init: "AO" },
  provider: { name: "Lagos Gen. Hospital", type: "Provider", init: "LG" },
  donor: { name: "James Hartwell", type: "Donor", init: "JH" },
  admin: { name: "Admin Console", type: "Platform Admin", init: "AD" },
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [country, setCountry] = useState(null);
  const [role, setRole] = useState(null);
  const [activeNav, setActiveNav] = useState(null);

  useEffect(() => {
    if (role) {
      const navItems = NAV[role];
      setActiveNav(navItems[0].id);
    }
  }, [role]);

  const handleCountry = (c) => { setCountry(c); setScreen("role"); };
  const handleRole = (r) => { setRole(r); setScreen("main"); };

  const renderScreen = () => {
    switch (activeNav) {
      case "dashboard": return <BeneficiaryDashboard country={country} />;
      case "devices": return <DeviceCatalog country={country} />;
      case "assistance": return <FinancialAssistance />;
      case "telemedicine": return <Telemedicine country={country} />;
      case "provider-dashboard": return <ProviderDashboard country={country} />;
      case "equipment": return <EquipmentRequest country={country} />;
      case "donor-dashboard": return <DonorDashboard />;
      case "admin-queue": return <AdminQueue />;
      default: return <BeneficiaryDashboard country={country} />;
    }
  };

  const navItems = role ? NAV[role] : [];
  const roleInfo = role ? ROLE_INFO[role] : null;

  const sections = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const screenTitle = navItems.find(n => n.id === activeNav)?.label || "Dashboard";

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {screen === "splash" && <Splash onSelectCountry={handleCountry} />}
        {screen === "role" && <RoleSelect country={country} onSelectRole={handleRole} />}
        {screen === "main" && (
          <>
            <div className="sidebar">
              <div className="sidebar-brand">
                <div className="sidebar-brand-logo">SPOB</div>
                <div className="sidebar-brand-sub">Health Access Platform</div>
              </div>
              {roleInfo && (
                <div className="sidebar-role">
                  <div className="sidebar-role-avatar">{roleInfo.init}</div>
                  <div className="sidebar-role-info">
                    <div className="sidebar-role-name">{roleInfo.name}</div>
                    <div className="sidebar-role-type">{roleInfo.type}</div>
                  </div>
                </div>
              )}
              <div className="sidebar-nav">
                {Object.entries(sections).map(([section, items]) => (
                  <div key={section}>
                    <div className="sidebar-section-label">{section}</div>
                    {items.map(item => (
                      <button key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                        onClick={() => setActiveNav(item.id)}>
                        <span className="nav-item-icon">{item.icon}</span>
                        {item.label}
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="sidebar-country">
                <div className="country-flag">{country === "Nigeria" ? "🇳🇬" : country === "United States" ? "🇺🇸" : "🌍"}</div>
                <div className="country-info">
                  <div className="country-name">{country}</div>
                  <div className="country-sub">Switch region</div>
                </div>
              </div>
            </div>
            <div className="main">
              <div className="topbar">
                <div className="topbar-title">{screenTitle}</div>
                <div className="topbar-right">
                  <span className={`topbar-pill ${role === "admin" ? "amber" : ""}`}>
                    {role === "admin" ? "Admin" : country}
                  </span>
                  <div className="topbar-notif">🔔<div className="notif-dot" /></div>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setScreen("splash"); setRole(null); setCountry(null); }}>
                    ← Switch View
                  </button>
                </div>
              </div>
              <div className="content">{renderScreen()}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
