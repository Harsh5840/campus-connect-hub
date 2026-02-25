"""
Module 1: Registration Page Automation
Project: CampusThrift (Campus Connect Hub)
Automates: UI element verification, form field interaction, navigation
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

BASE_URL = "https://campus-connect-hub-neon.vercel.app"


class TestRegistrationPage(unittest.TestCase):

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

    def _go_to_signup(self):
        self.driver.get(f"{BASE_URL}/signup")
        self.wait.until(EC.presence_of_element_located((By.ID, "name")))

    def test_01_page_loads_correctly(self):
        self._go_to_signup()
        heading = self.driver.find_element(By.XPATH, "//*[contains(text(),'Create your account')]")
        self.assertTrue(heading.is_displayed())
        print("[PASS] test_01_page_loads_correctly")

    def test_02_page_subtitle_visible(self):
        self._go_to_signup()
        desc = self.driver.find_element(By.XPATH, "//*[contains(text(),'Join your campus community')]")
        self.assertTrue(desc.is_displayed())
        print("[PASS] test_02_page_subtitle_visible")

    def test_03_all_fields_visible(self):
        self._go_to_signup()
        for field_id in ["name", "email", "password", "confirm-password"]:
            el = self.driver.find_element(By.ID, field_id)
            self.assertTrue(el.is_displayed(), f"Field '{field_id}' not visible")
        print("[PASS] test_03_all_fields_visible")

    def test_04_name_field_accepts_input(self):
        self._go_to_signup()
        name_field = self.driver.find_element(By.ID, "name")
        name_field.send_keys("Selenium Tester")
        self.assertEqual(name_field.get_attribute("value"), "Selenium Tester")
        print("[PASS] test_04_name_field_accepts_input")

    def test_05_email_field_accepts_input(self):
        self._go_to_signup()
        email_field = self.driver.find_element(By.ID, "email")
        email_field.send_keys("test@college.edu")
        self.assertEqual(email_field.get_attribute("value"), "test@college.edu")
        print("[PASS] test_05_email_field_accepts_input")

    def test_06_password_fields_are_masked(self):
        self._go_to_signup()
        pw = self.driver.find_element(By.ID, "password")
        cpw = self.driver.find_element(By.ID, "confirm-password")
        self.assertEqual(pw.get_attribute("type"), "password")
        self.assertEqual(cpw.get_attribute("type"), "password")
        print("[PASS] test_06_password_fields_are_masked")

    def test_07_submit_button_visible(self):
        self._go_to_signup()
        btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        self.assertTrue(btn.is_displayed())
        print("[PASS] test_07_submit_button_visible")

    def test_08_google_signup_button_visible(self):
        self._go_to_signup()
        btn = self.driver.find_element(By.XPATH, "//button[contains(text(),'Continue with Google')]")
        self.assertTrue(btn.is_displayed())
        print("[PASS] test_08_google_signup_button_visible")

    def test_09_sign_in_link_navigates_to_login(self):
        self._go_to_signup()
        self.driver.find_element(By.LINK_TEXT, "Sign in").click()
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_09_sign_in_link_navigates_to_login")

    def test_10_empty_form_stays_on_page(self):
        self._go_to_signup()
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
        time.sleep(1)
        self.assertIn("/signup", self.driver.current_url)
        print("[PASS] test_10_empty_form_stays_on_page")


if __name__ == "__main__":
    unittest.main(verbosity=2)
