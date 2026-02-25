"""
Shared test configuration for all Selenium modules.
All modules import credentials from here so registration → login → marketplace flow works.
"""

import time

# Unique email per test run so registration doesn't clash with existing accounts
TIMESTAMP     = int(time.time())
TEST_NAME     = "Selenium Tester"
TEST_EMAIL    = f"selenium_test_{TIMESTAMP}@college.edu"
TEST_PASSWORD = "Test@1234"

BASE_URL = "https://campus-connect-hub-neon.vercel.app"
