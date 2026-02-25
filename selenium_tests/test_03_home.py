"""
Module 3: Home / Landing Page Automation
Project: CampusThrift (Campus Connect Hub)
Automates: Hero section, categories, features, testimonials, FAQ, navigation
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

BASE_URL = "https://campus-connect-hub-neon.vercel.app"


class TestHomePage(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument("--start-maximized")
        options.add_argument("--disable-notifications")
        options.add_argument("--disable-blink-features=AutomationControlled")
        cls.driver = webdriver.Chrome(options=options)
        cls.wait = WebDriverWait(cls.driver, 20)
        cls.driver.get(BASE_URL)
        cls.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))

    @classmethod
    def tearDownClass(cls):
        time.sleep(2)
        cls.driver.quit()

    def _reload_home(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))

    def test_01_page_title_present(self):
        title = self.driver.title
        self.assertTrue(len(title) > 0, f"Title is empty")
        print(f"[PASS] test_01_page_title_present (title='{title}')")

    def test_02_hero_heading_visible(self):
        self._reload_home()
        hero = self.driver.find_element(By.XPATH, "//h1[contains(text(),'Buy')]")
        self.assertTrue(hero.is_displayed())
        print("[PASS] test_02_hero_heading_visible")

    def test_03_browse_marketplace_button(self):
        self._reload_home()
        btn = self.driver.find_element(By.XPATH, "//a[contains(text(),'Browse Marketplace')]")
        self.assertTrue(btn.is_displayed())
        print("[PASS] test_03_browse_marketplace_button")

    def test_04_night_market_button_hero(self):
        self._reload_home()
        btn = self.driver.find_element(By.XPATH, "//a[contains(text(),'Night Market')]")
        self.assertTrue(btn.is_displayed())
        print("[PASS] test_04_night_market_button_hero")

    def test_05_category_cards_present(self):
        self._reload_home()
        heading = self.driver.find_element(By.XPATH, "//h2[contains(text(),'Browse by Category')]")
        self.assertTrue(heading.is_displayed())
        cards = self.driver.find_elements(
            By.XPATH,
            "//h3[contains(text(),'Books') or contains(text(),'Electronics') "
            "or contains(text(),'Furniture') or contains(text(),'Clothing') "
            "or contains(text(),'Food') or contains(text(),'Other')]"
        )
        self.assertGreaterEqual(len(cards), 4)
        print(f"[PASS] test_05_category_cards_present ({len(cards)} found)")

    def test_06_why_campusthrift_section(self):
        self._reload_home()
        section = self.driver.find_element(By.XPATH, "//h2[contains(text(),'Why CampusThrift')]")
        self.assertTrue(section.is_displayed())
        print("[PASS] test_06_why_campusthrift_section")

    def test_07_features_listed(self):
        self._reload_home()
        for feature in ["College-Only Access", "Lightning Fast", "Within Campus"]:
            el = self.driver.find_element(By.XPATH, f"//h3[contains(text(),'{feature}')]")
            self.assertTrue(el.is_displayed(), f"Feature '{feature}' not found")
        print("[PASS] test_07_features_listed")

    def test_08_testimonials_section(self):
        self._reload_home()
        heading = self.driver.find_element(By.XPATH, "//h2[contains(text(),'What Students Say')]")
        self.assertTrue(heading.is_displayed())
        print("[PASS] test_08_testimonials_section")

    def test_09_faq_section_present(self):
        self._reload_home()
        heading = self.driver.find_element(By.XPATH, "//h2[contains(text(),'Frequently Asked')]")
        self.assertTrue(heading.is_displayed())
        print("[PASS] test_09_faq_section_present")

    def test_10_get_started_cta(self):
        self._reload_home()
        cta = self.driver.find_element(By.XPATH, "//a[contains(text(),'Get Started Free')]")
        self.assertTrue(cta.is_displayed())
        print("[PASS] test_10_get_started_cta")


if __name__ == "__main__":
    unittest.main(verbosity=2)
