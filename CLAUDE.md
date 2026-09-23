# MyBill — Project Documentation

## 1. Overview

| Item | Detail |
|---|---|
| Project name | MyBill |
| Project type | Desktop bookkeeping app (runs locally, no internet required) |
| Target platforms | Windows + macOS |
| Currency | Hong Kong Dollar (HK$) |
| Primary user | Personal daily expense tracking |

## 2. Core Requirements

1. **Record expenses**: record each expense with amount, time, category, note, etc.
2. **Two-level categories**: each expense belongs to a "primary category → subcategory".
3. **Cross-platform**: the same app runs on both Windows and Mac.

## 3. Expense Category Design (Two Levels)

| Primary | Subcategories |
|---|---|
| Food & Dining | Breakfast, Lunch, Dinner, Takeout, Snacks & Drinks, Dining Out |
| Transportation | Bus & Metro, Taxi, Fuel, Parking, Train, Flight |
| Shopping | Clothing & Bags, Electronics, Daily Necessities, Beauty & Skincare, Home Goods |
| Housing & Utilities | Rent, Water Bill, Electricity Bill, Gas Bill, Property Management, Repairs & Renovation |
| Entertainment | Movies & Shows, Games, Sports & Fitness, Travel, Pets |
| Health & Medical | Medicine, Outpatient, Hospitalization, Check-up, Dental & Eye Care |
| Education | Books, Courses & Training, Tuition, Stationery |
| Communication | Phone Bill, Broadband, Subscriptions |
| Gifts & Social | Red Packets & Gifts, Treats & Gifts, Support for Parents |
| Others | Others |

## 4. Expense Field Design (initial version, adjustable)

| Field | Required | Description |
|---|---|---|
| Amount | Yes | HKD, supports decimals |
| Primary category | Yes | Selected from the primary categories |
| Subcategory | Yes | Determined by the selected primary category |
| Date | Yes | Defaults to today, editable |
| Note | No | Free text |
| Payment method | No | WeChat / Alipay / Cash / Bank Card, etc. |

## 5. Core Pages (initial version)

1. **Record**: quickly record an expense.
2. **Bills**: view history by month and category.
3. **Category management**: add/remove primary and secondary categories.
4. **Statistics**: monthly summary and category breakdown.

## 6. Tech Stack

| Item | Choice |
|---|---|
| App framework | Electron + React ✅ (decided by the user: mature, stable, well-documented, clean UI, easy to maintain) |
| Language | JavaScript ✅ (decided by the user) |
| Data storage | SQLite local database ✅ (decided by the user: mature, stable, fast queries, easy to back up) |
| Database implementation | sql.js ✅ (decided by the user: no compilation, zero environment dependencies on Windows/Mac, no performance difference at this data scale) |
| UI component library | Ant Design ✅ (decided by the user: consistent, polished, fast to develop) |
| Routing | react-router-dom (the de facto React standard; no reasonable alternative) |
| Packaging | electron-builder (bundled with the electron-vite scaffold; Windows/Mac in one) |
| Charting | ECharts ✅ (decided by the user: the most mainstream and stable, good Chinese docs, no compatibility pitfalls) |
| i18n | react-i18next ✅ (decided by the user: Traditional/Simplified/English, category names are trilingual too) |

## 6-2. Development Progress

| Step | Content | Status |
|---|---|---|
| Step 1 | Project scaffolding (electron-vite + React + AntD) | ✅ Done |
| Step 2 | Database design and data layer (sql.js) | ✅ Done |
| Step 3 | UI features (record / bills / categories / statistics / pie chart) | ✅ Done |
| Step 4 | i18n (Traditional/Simplified/English + trilingual categories + Octopus) | ✅ Done |
| Step 5 | Local testing | ✅ Done (user confirmed "perfect") |
| Step 6 | Package Windows installer | ✅ Done (dist/MyBill-1.0.0-setup.exe); macOS version pending a Mac |

## 7. ⚠️ Important Agreement (must be followed throughout the project)

The user of this project **does not know programming** and is a first-time Claude Code user. Therefore:

1. **All technical decisions must be made by the user.** For any technical choice (tech stack, framework, library, tool, data storage method, UI implementation, packaging, etc.), Claude **must**:
   - List at least 2-3 options;
   - Explain each option in plain, easy-to-understand language (what it is, pros, cons, what it suits);
   - Give Claude's own recommendation and reasoning;
   - **Let the user make the final decision — never make technical choices unilaterally.**

2. **Explain in plain language**: avoid jargon; use everyday analogies when needed.

3. **Features**: feature designs may be proposed proactively, but must also be explained clearly and confirmed by the user before implementation.

## 8. Future Extensions (not implemented yet, recorded only)

- Income records
- Monthly / annual report export (Excel)
- Budget management
- Data backup and restore
