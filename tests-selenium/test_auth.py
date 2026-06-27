from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def _click_btn(driver, label):
    btn = driver.find_element(By.XPATH, f"//button[normalize-space()='{label}']")
    btn.click()


def test_register_modal_opens(driver, base_url):
    driver.get(base_url)
    _click_btn(driver, "Registrar")
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='nome']"))
    )
    assert driver.find_element(By.CSS_SELECTOR, "input[name='email']")
    assert driver.find_element(By.CSS_SELECTOR, "input[name='senha']")
    assert driver.find_element(By.CSS_SELECTOR, "input[name='confirmarSenha']")


def test_login_modal_opens(driver, base_url):
    driver.get(base_url)
    _click_btn(driver, "Entrar")
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='email']"))
    )
    assert driver.find_element(By.CSS_SELECTOR, "input[name='senha']")
