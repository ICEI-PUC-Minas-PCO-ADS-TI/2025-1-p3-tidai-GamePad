from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


def _go(driver, label):
    driver.find_element(By.XPATH, f"//nav//a[normalize-space()='{label}']").click()


def test_nav_to_news(driver, base_url):
    driver.get(base_url)
    _go(driver, "Notícias")
    WebDriverWait(driver, 5).until(lambda d: "/news" in d.current_url)


def test_nav_to_guia(driver, base_url):
    driver.get(base_url)
    _go(driver, "Guia")
    WebDriverWait(driver, 5).until(lambda d: "/guia" in d.current_url)


def test_nav_back_home(driver, base_url):
    driver.get(f"{base_url}/news")
    _go(driver, "Home")
    WebDriverWait(driver, 5).until(lambda d: d.current_url.rstrip("/") == base_url)
