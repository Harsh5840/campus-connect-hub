# CampusThrift – Selenium Automation Tests

A complete Selenium test suite covering all **4 evaluation modules**:

| File | Module |
|------|--------|
| `test_01_registration.py` | Registration Page |
| `test_02_login.py` | Login Page |
| `test_03_home.py` | Home / Landing Page |
| `test_04_marketplace_search.py` | Marketplace – Search (core feature) |
| `run_all_tests.py` | Master runner (runs all 4 at once) |

---

## Prerequisites

1. **Python 3.8+** installed
2. **Google Chrome** installed
3. **ChromeDriver** matching your Chrome version → https://chromedriver.chromium.org/downloads

---

## Setup

```bash
# 1. Go into the selenium_tests folder
cd selenium_tests

# 2. Install dependencies
pip install -r requirements.txt
```

---

## Configuration

Before running, open **`test_02_login.py`** and **`test_04_marketplace_search.py`** and set:

```python
VALID_EMAIL    = "your_registered_email@college.edu"
VALID_PASSWORD = "YourPassword"
```

Make sure the **frontend is running** at `http://localhost:3000`:

```bash
# From /frontend
npm run dev
```

And the **backend** is running too (login/register require the API).

---

## Running Tests

### Run all 4 modules together
```bash
cd selenium_tests
python run_all_tests.py
```

### Run a single module
```bash
python test_01_registration.py
python test_02_login.py
python test_03_home.py
python test_04_marketplace_search.py
```

---

## Test Coverage

### Module 1 – Registration (5 tests)
- Page loads with correct heading
- All form fields visible (name, email, password, confirm-password)
- Password mismatch shows error toast
- Successful registration shows success toast / redirects
- "Sign in" link navigates to `/login`

### Module 2 – Login (8 tests)
- Page loads with "Welcome back" heading
- Email & password fields visible
- Google sign-in button visible
- Empty form blocked (HTML5 required)
- Invalid credentials → error toast
- Valid credentials → redirect to `/marketplace`
- "Sign up" link navigates to `/signup`
- "Forgot password?" link visible

### Module 3 – Home Page (10 tests)
- Page title check
- Hero heading ("Buy · Sell · Rent · Night Market")
- Browse Marketplace / Night Market / Post Item buttons
- 4+ category cards rendered
- "Why CampusThrift?" features section
- All 3 feature titles listed
- Testimonials section visible
- FAQ accordion opens / closes
- "Get Started Free" CTA navigates to `/signup`

### Module 4 – Marketplace / Search (10 tests)
- Login flow + redirect to `/marketplace`
- Marketplace heading visible
- Search bar present and accepts typing
- Category filter dropdown opens and selects "Books & Notes"
- Sort dropdown opens and selects "Price: Low to High"
- "Buy" tab active by default
- "My Listings" tab clickable
- "Rent Requests" tab clickable
- "Sell Item" button navigates to `/sell`
- "Night Market" button visible
