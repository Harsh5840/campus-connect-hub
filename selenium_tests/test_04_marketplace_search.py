"""
Module 4: Marketplace – Core Functionality (Search & Navigation)
Project: CampusThrift (Campus Connect Hub)
Automates: Auth-wall redirect, marketplace links, navigation from home page
"""

import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

BASE_URL = "https://campus-connect-hub-neon.vercel.app"


class TestMarketplaceSearch(unittest.TestCase):

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

    def test_01_marketplace_redirects_to_login(self):
        self.driver.get(f"{BASE_URL}/marketplace")
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_01_marketplace_redirects_to_login")

    def test_02_sell_page_redirects_to_login(self):
        self.driver.get(f"{BASE_URL}/sell")
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_02_sell_page_redirects_to_login")

    def test_03_night_market_redirects_to_login(self):
        self.driver.get(f"{BASE_URL}/night-market")
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_03_night_market_redirects_to_login")

    def test_04_login_page_email_after_marketplace_redirect(self):
        self.driver.get(f"{BASE_URL}/marketplace")
        self.wait.until(EC.url_contains("/login"))
        email = self.driver.find_element(By.ID, "email")
        self.assertTrue(email.is_displayed())
        print("[PASS] test_04_login_page_email_after_marketplace_redirect")

    def test_05_homepage_browse_marketplace_link(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        link = self.driver.find_element(By.XPATH, "//a[contains(text(),'Browse Marketplace')]")
        self.assertTrue(link.is_displayed())
        self.assertIn("/marketplace", link.get_attribute("href"))
        print("[PASS] test_05_homepage_browse_marketplace_link")

    def test_06_homepage_night_market_link(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        link = self.driver.find_element(By.XPATH, "//a[contains(text(),'Night Market')]")
        self.assertTrue(link.is_displayed())
        self.assertIn("/night-market", link.get_attribute("href"))
        print("[PASS] test_06_homepage_night_market_link")

    def test_07_homepage_post_item_link(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        link = self.driver.find_element(By.XPATH, "//a[contains(text(),'Post Item')]")
        self.assertTrue(link.is_displayed())
        self.assertIn("/sell", link.get_attribute("href"))
        print("[PASS] test_07_homepage_post_item_link")

    def test_08_homepage_explore_marketplace_cta(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        cta = self.driver.find_element(By.XPATH, "//a[contains(text(),'Explore Marketplace')]")
        self.assertTrue(cta.is_displayed())
        print("[PASS] test_08_homepage_explore_marketplace_cta")

    def test_09_browse_marketplace_click_goes_to_login(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        link = self.driver.find_element(By.XPATH, "//a[contains(text(),'Browse Marketplace')]")
        link.click()
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_09_browse_marketplace_click_goes_to_login")

    def test_10_explore_marketplace_click_goes_to_login(self):
        self.driver.get(BASE_URL)
        self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        cta = self.driver.find_element(By.XPATH, "//a[contains(text(),'Explore Marketplace')]")
        cta.click()
        self.wait.until(EC.url_contains("/login"))
        self.assertIn("/login", self.driver.current_url)
        print("[PASS] test_10_explore_marketplace_click_goes_to_login")


if __name__ == "__main__":
    unittest.main(verbosity=2)
