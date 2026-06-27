@echo off
cd /d "%~dp0"
if not exist .venv python -m venv .venv
.venv\Scripts\pip install -q selenium pytest
.venv\Scripts\pytest -v %*
