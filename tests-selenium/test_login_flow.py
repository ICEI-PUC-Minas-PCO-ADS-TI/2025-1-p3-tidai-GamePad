import time
import urllib.request
import urllib.error
import json
import uuid

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def _register_via_api(api_url, nome, email, senha):
    body = json.dumps(
        {"nome": nome, "email": email, "senha": senha, "imgUser": "", "tipo": "user"}
    ).encode()
    req = urllib.request.Request(
        f"{api_url}/api/Usuarios",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise AssertionError(f"register failed {e.code}: {e.read().decode()}")


def test_login_after_register(driver, base_url, api_url):
    suffix = uuid.uuid4().hex[:8]
    email = f"sel_{suffix}@test.io"
    senha = "Pass123!"
    _register_via_api(api_url, f"sel_{suffix}", email, senha)

    driver.get(base_url)
    driver.find_element(By.XPATH, "//button[normalize-space()='Entrar']").click()
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='email']"))
    )
    driver.find_element(By.CSS_SELECTOR, "input[name='email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "input[name='senha']").send_keys(senha)
    driver.find_element(
        By.XPATH, "//form//button[@type='submit']"
    ).click()

    WebDriverWait(driver, 8).until(
        lambda d: "Bem-vindo" in d.page_source
        or not d.find_elements(By.CSS_SELECTOR, "input[name='senha']")
    )
