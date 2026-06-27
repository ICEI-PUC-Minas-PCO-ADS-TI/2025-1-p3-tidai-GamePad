from selenium.webdriver.common.by import By


def test_home_loads(driver, base_url):
    driver.get(base_url)
    assert "GamePad" in driver.title or driver.find_element(By.TAG_NAME, "nav")


def test_navbar_has_links(driver, base_url):
    driver.get(base_url)
    text = driver.find_element(By.TAG_NAME, "nav").text
    assert "Home" in text
    assert "Notícias" in text
    assert "Guia" in text
