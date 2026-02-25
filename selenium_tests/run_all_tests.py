"""
Master test runner for CampusThrift Selenium Suite
Runs all 4 modules in order and prints a final summary.

Usage:
  python run_all_tests.py
"""

import unittest
import sys
import time

# ── import test modules ────────────────────────────────────────────────────────
from test_01_registration       import TestRegistrationPage
from test_02_login              import TestLoginPage
from test_03_home               import TestHomePage
from test_04_marketplace_search import TestMarketplaceSearch

MODULES = [
    ("Module 1 – Registration Page",    TestRegistrationPage),
    ("Module 2 – Login Page",           TestLoginPage),
    ("Module 3 – Home Page",            TestHomePage),
    ("Module 4 – Marketplace / Search", TestMarketplaceSearch),
]

SEPARATOR = "=" * 65

def run_module(label, test_class):
    print(f"\n{SEPARATOR}")
    print(f"  {label}")
    print(SEPARATOR)
    loader = unittest.TestLoader()
    suite  = loader.loadTestsFromTestCase(test_class)
    runner = unittest.TextTestRunner(verbosity=2, stream=sys.stdout)
    result = runner.run(suite)
    return result

if __name__ == "__main__":
    start = time.time()
    all_results = []

    for label, cls in MODULES:
        result = run_module(label, cls)
        all_results.append((label, result))

    elapsed = time.time() - start

    # ── Final summary ──────────────────────────────────────────────────────────
    print(f"\n{SEPARATOR}")
    print("  FINAL REPORT")
    print(SEPARATOR)
    total_run = total_fail = total_err = 0
    for label, r in all_results:
        status = "✅ PASS" if r.wasSuccessful() else "❌ FAIL"
        print(f"  {status}  {label}  "
              f"(run={r.testsRun}, fail={len(r.failures)}, err={len(r.errors)})")
        total_run  += r.testsRun
        total_fail += len(r.failures)
        total_err  += len(r.errors)

    print(SEPARATOR)
    print(f"  Total: {total_run} tests | {total_fail} failures | "
          f"{total_err} errors | {elapsed:.1f}s")
    print(SEPARATOR)

    sys.exit(0 if total_fail == 0 and total_err == 0 else 1)
