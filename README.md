# SPOB — Global Health Access Platform
### Interactive Design Prototype

> A multi-role UI prototype for the Society for Public Orientation and Better Living (SPOB) Global Health Access Platform. Built in React as a shareable design reference for the Week 1–4 design sprint.

---

## 🔗 Live Demo

**[View Prototype →](https://Adedhayor.github.io/spob-prototype)**

---

## 📋 What's Inside

This prototype covers all four user roles defined in the SPOB PRD, each with their own navigation and flows:

| Role | Screens |
|------|---------|
| **Beneficiary** | Dashboard · Device Catalog · Device Request Form · Financial Assistance · Telemedicine |
| **Provider** | Dashboard · Equipment Request (Nigeria) · Financial Assistance · Telemedicine |
| **Donor** | Dashboard · Campaign Progress · Device Donation Form |
| **Admin** | Review Queue · Case Detail Panel · Audit Log · Approve / Flag Actions |

### Key product rules enforced in the prototype

- 🚫 **Telemedicine blocked for U.S. users** — disabled at both navigation and screen level
- 🔒 **Provider payee required** before Financial Assistance can be submitted
- 📋 **Immutable audit log** visible on every admin case detail panel
- ✅ **Provider verification badge** required before payout actions are available
- 🌍 **Country-gated modules** — feature set changes based on region selected at onboarding

---

## 🗂 Project Structure

```
spob-prototype/
├── public/
├── src/
│   ├── App.jsx          # Full prototype — all screens and logic
│   └── main.jsx         # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Running Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/Adedhayor/spob-prototype.git
cd spob-prototype

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🌐 Deploying to GitHub Pages

### First-time setup

1. Create the repo on GitHub (public)
2. Update the `homepage` field in `package.json`:
   ```json
   "homepage": "https://Adedhayor.github.io/spob-prototype"
   ```
3. Run:
   ```bash
   npm run deploy
   ```

### Subsequent deploys

```bash
npm run deploy
```

Builds the project and pushes `dist/` to the `gh-pages` branch automatically.

---

## 🧭 How to Navigate the Prototype

1. **Splash screen** — pick a country (Nigeria unlocks Telemedicine; U.S. shows it blocked)
2. **Pick a role** — Beneficiary, Provider, Donor, or Admin
3. Use the **sidebar** to explore screens
4. Use **"Switch View"** (top right) to jump between roles

---

## 🎨 Design System

- **Fonts:** DM Serif Display (headings) · Plus Jakarta Sans (body)
- **Colors:** Forest green · Amber accent · Cream background
- **Components:** Buttons · Badges · Forms · Tables · Upload zones · Audit logs · Stat cards · Device cards · Progress bars

---

## 📅 Sprint Context

| Week | Scope |
|------|-------|
| Week 1 | Beneficiary flows + Design System |
| Week 2 | Provider flows |
| Week 3 | Donor flows |
| Week 4 | Admin suite |

---

*Prototype only — not connected to any backend. All data is illustrative.*
