import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

BASE_URL = "http://localhost:5173"
API_URL = "http://localhost:5069"


@pytest.fixture
def driver():
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--window-size=1280,900")
    d = webdriver.Chrome(options=opts)
    d.implicitly_wait(5)
    yield d
    d.quit()


@pytest.fixture
def base_url():
    return BASE_URL


@pytest.fixture
def api_url():
    return API_URL
