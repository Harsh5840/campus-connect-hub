"""
Module 2: Login Page Automation
Project: CampusThrift (Campus Connect Hub)
Automates: UI element verification, form validation, navigation
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

BASE_URL = "https://campus-connect-hub-neon.vercel.app"


class TestLoginPage(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument("--start-maximized")
        options.add_argument("--disable-notifications")
        options.add_argument("--disable-blink-features=AutomationControlled")
        cls.driver = webdriver.Chrome(options=options)
        cls.wait = WebDriverWait(cls.driver, 20)

    @classmethod
    def tearDownClass(cls):
        time.sleep(2)
        cls.driver.quit()

    def _go_to_login(self):
        self.driver.get(f"{BASE_URL}/login")
        self.wait.until(EC.presence_of_element_located((By.ID, "email")))

    def test_01_page_loads_correctly(self):
        self._go_to_login()
        heading = self.driver.find_element(By.XPATH, "//*[contains(text(),'Welcome back')]")
        self.assertTrue(heading.is_displayed())
        print("[PASS] test_01_page_loads_correctly")

    def test_02_page_subtitle_visible(self):
        self._go_to_login()
        desc = self.driver.find_element(By.XPATH, "//*[contains(text(),'Sign in to your')]")
        self.assertTrue(desc.is_displayed())
        print("[PASS] test_02_page_subtitle_visible")

    def test_03_email_field_visible(self):
        self._go_to_login()
        email = self.driver.find_element(By.ID, "email")
        self.assertTrue(email.is_displayed())
        print("[PASS] test_03_email_field_visible")

    def test_04_password_field_visible(self):
        self._go_to_login()
        pw = self.driver.find_element(By.ID, "password")
        self.assertTrue(pw.is_displayed())
        self.assertEqual(pw.get_attribute("type"), "password")
        print("[PASS] test_04_password_field_visible")

    def test_05_email_accepts_input(self):
        self._go_to_login()
        email = self.driver.find_element(By.ID, "email")
        email.send_keys("test@college.edu")
        self.assertEqual(email.get_attribute("value"), "test@college.edu")
        print("[PASS] test_05_email_accepts_input")

    def test_06_password_accepts_input(self):
        self._go_to_login()
        pw = self.driver.find_element(By.ID, "password")
        pw.send_keys("TestPassword123")
        self.assertEqual(pw.get_attribute("value"), "TestPassword123")
        print("[PASS] test_06_password_accepts_input")

    def test_07_google_signin_button_visible(self):
        self._go_to_login()
        google_btn = self.driver.find_element(
            By.XPATH, "//button[contains(text(),'Continue with Google')]"
        )
        self.assertTrue(google_btn.is_displayed())
        print("[PASS] test_07_google_signin_button_visible")

    def test_08_submit_button_visible(self):
        self._go_to_login()
        btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        self.assertTrue(btn.is_displayed())
        print("[PASS] test_08_submit_button_visible")

    def test_09_empty_form_stays_on_page(self):
        self._go_to_login()
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
        time.sleep(1)
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_09_empty_form_stays_on_page")

    def test_10_signup_link_navigates(self):
        self._go_to_login()
        self.driver.find_element(By.LINK_TEXT, "Sign up").click()
        self.wait.until(EC.url_contains("/signup"))
        self.assertIn("/signup", self.driver.current_url)
        print("[PASS] test_10_signup_link_navigates")


if __name__ == "__main__":
    unittest.main(verbosity=2)
