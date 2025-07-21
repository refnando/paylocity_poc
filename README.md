
# Paylocity Benefits – Automated Testing (UI + API)

This project contains automated **UI** and **API** tests for the Paylocity Benefits platform using [Playwright](https://playwright.dev/). It is structured using the **Page Object Model (POM)** for UI and request context abstraction for API testing.

---

## 🚧 API Authentication Issue

Currently, API requests return a `403 Forbidden` response when using only the `Authorization: Basic ...` header. This is because the API requires **antiforgery tokens** and **session cookies** which are typically provided by a browser session.

### 🔧 Action Required from Backend Team

To enable full API automation, one of the following is needed:

#### ✅ Option 1 – Backend Support for API Auth

Please provide one of:

- A **long-lived Bearer token**
- A **reusable JWT**
- An **API key** that **bypasses antiforgery validation**

#### 🔄 Option 2 – Allow Session Reuse from UI

If Option 1 is not possible, we need:

- A login endpoint or flow to programmatically retrieve:
  - `.AspNetCore.Cookies`
  - `.AspNetCore.Antiforgery`
- Confirmation that these cookies are sufficient to authenticate API calls

---

## 🧪 Running the Tests

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. ⚙️ Configure your `.env` file

Create a `.env` file in the root:

```env
API_BASE_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod
AUTH_TOKEN=Basic your_base64_token_here
```

If testing with captured cookies:

```env
SESSION_COOKIE=.AspNetCore.Cookies=...
ANTIFORGERY_COOKIE=.AspNetCore.Antiforgery=...
```

> 🔐 You can capture these from browser DevTools or Postman.

---

### 3. ▶️ Run UI Tests

```bash
# All tests
npm run test

# Only UI tests
npm run test:ui

# Open UI test runner
npx playwright test --ui
```

Tags are supported:

```bash
npm run test:smoke
npm run test:regression
```

---

### 4. 🧪 Run API Tests

```bash
# All API tests
npx playwright test tests/api-employees.test.spec.ts

# Debug API test with auth
npx playwright test tests/debug-auth.test.ts
```

---

## 🗂 Project Structure

```
├── pages/                       # Page Object Model (UI)
├── tests/                       # Test specs
│   ├── api-employees.test.ts   # API endpoint tests
│   ├── dashboard.test.ts       # UI tests
│   └── debug-auth.test.ts      # Auth diagnostics
├── utils/
│   └── apiContext.ts           # Centralized request context for API
├── .env
├── package.json
├── playwright.config.ts
└── README.md
```

---

## 👥 Maintainers

Please contact QA if clarification is needed or if tokens/headers must be updated.
