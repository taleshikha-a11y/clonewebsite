# Mirats Quanto DIY - Clone (React + Vite + Tailwind CSS)

Exact 1:1 clone of the **Mirats Quanto DIY Platform** (`https://app.miratsquanto.com/`). Built with **React 19**, **Vite**, and **Tailwind CSS v3**, retaining the exact original styles, layout, vector graphics, and component architecture.

---

## 🚀 Quick Start

To run the development server locally:

```bash
# Navigate to the workspace
cd clonewebsite

# Install dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev
```

Visit the application locally in your browser at:
`http://localhost:5174/` (or port indicated in the terminal).

To build for production:
```bash
npm run build
```

---

## 📁 Clean & Organized Folder Structure

The project has been organized with zero unnecessary files:

```
clonewebsite/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Exact original SVGs, logos, and icons
│   │   ├── icons/          # Dashboard & survey category icons
│   │   └── logos/          # Mirats Quanto official vector logos
│   ├── components/         # Reusable core layout components
│   │   ├── Navbar.jsx      # Sticky top navbar with animated logo, nav links & profile dropdown
│   │   ├── MiratsAnimatedLogo.jsx # Interactive animated Mirats SVG logo
│   │   ├── WarningBar.jsx  # Workspace status banner
│   │   ├── NoData.jsx      # Empty state illustration
│   │   ├── PageWrapper.jsx # Responsive page container
│   │   └── LoginModal.jsx  # Interactive Mirats Auth SSO / Sign-in preview
│   ├── context/
│   │   └── GlobalContext.jsx # Central state management (surveys, groups, invoices, questions)
│   ├── pages/
│   │   ├── Dashboard/      # Complete DIY dashboard with charts, stats & tables
│   │   │   ├── Dashboard.jsx
│   │   │   └── components/ (WelcomeHeader, MetricsCards, QuickActions, PerformanceTrends,
│   │   │                    SurveyAnalytics, RecentActivity, MySurveys, MySurveyGroups,
│   │   │                    MyInvoices, MyQuestions)
│   │   ├── Survey/         # Quantitative & Qualitative survey explorer + Create modal
│   │   │   ├── Survey.jsx
│   │   │   └── components/ (AISurveyModal)
│   │   ├── SurveyGroup/    # Survey Group clustering & management
│   │   │   └── SurveyGroup.jsx
│   │   ├── Feasibility/    # Real-time audience feasibility & CPI pricing calculator
│   │   │   └── Feasibility.jsx
│   │   ├── Qualification/  # Screener & demographic pre-qualification library
│   │   │   └── Qualification.jsx
│   │   ├── Invoice/        # Invoices, billing statements & payment breakdown
│   │   │   └── Invoice.jsx
│   │   └── Profile/        # Account settings, webhooks, security keys & API credentials
│   │       └── Profile.jsx
│   ├── App.jsx             # React Router routing setup
│   ├── index.css           # Tailwind CSS directives & exact Mirats styling tokens
│   └── main.jsx            # React root mount
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🌟 Included Features & Pages

1. **Mirats Quanto DIY Top Navbar**:
   - Official SVG vector logos with dynamic hover morph animation (`MiratsAnimatedLogo`).
   - Sticky navigation tabs for Dashboard, Surveys, Survey Groups, Invoices & Billing, Feasibility, and Qualification Library.
   - User profile dropdown menu with direct links to account settings, sign out, and auth modal.

2. **Full DIY Dashboard**:
   - Personalized greeting & date summary (`WelcomeHeader`).
   - 5 Key KPI cards: Active Surveys, Total Completes, Reconciled IDs, Conversion Rate, and Pending Amount (`MetricsCards`).
   - Quick action shortcuts for survey launch, invoicing, and group management (`QuickActions`).
   - Multi-month trend comparisons via Chart.js (`PerformanceTrends`).
   - Throughput and quota health stacked bar analysis (`SurveyAnalytics`).
   - Real-time event log with status indicators (`RecentActivity`).
   - Live surveys table with progress bars (`MySurveys`).
   - Survey Groups and Invoices quick widgets (`MySurveyGroups`, `MyInvoices`, `MyQuestions`).

3. **Surveys Hub**:
   - Dual mode: Quantitative and Qualitative studies.
   - Status filters (`All`, `Live`, `Pending`, `Paused`, `Completed`).
   - Search bar filtering by project name, ID, or category.
   - CSV export capability.
   - Interactive **Create Survey Modal** supporting AI-driven RFP generation and manual configuration.

4. **Survey Groups Hub**:
   - Target market clustering for multi-country routing.
   - Active/Inactive toggle switches.
   - Modal to create and organize new groups.

5. **Feasibility & Pricing Calculator**:
   - Real-time parameter sliders for Sample Size ($N$), Length of Interview ($LOI$), and Incidence Rate ($IR$).
   - 7 Target Persona categories (Census, IT Decision Makers, HR, Finance, Marketing, C-Level, Non-Profit).
   - Dynamic CPI, total study cost, and turnaround estimation engine.

6. **Qualification Library**:
   - Standard demographic pre-screeners (Age, Gender, Household Income, IT Purchase Authority).
   - Question preview modal with interactive choice elements.
   - Custom screener question builder with category and option management.

7. **Invoices & Billing**:
   - Itemized financial statements with status badges (`Paid`, `Pending`).
   - Receipt viewer modal with cost breakdown and download trigger.

8. **Profile & Developer Settings**:
   - Collapsible settings sidebar.
   - Personal profile editor.
   - Finance & platform credits monitor.
   - Fraud protection & digital fingerprinting toggles.
   - S2S Postback webhook endpoint configuration.
   - Official redirect completion URLs (`/DIY/complete`, `/DIY/terminate`, etc.).
   - Live API Key and Secret Key copy tools.
