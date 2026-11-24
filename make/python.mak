# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - PYTHON TARGETS
# ==============================================================================

.PHONY: py-install py-lint py-lint-fix py-typecheck py-test

$(VENV):
	@echo -e "$(COLOR_BLUE)==> Creating virtual environment at $(VENV)...$(COLOR_RESET)"
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip setuptools wheel

py-install: $(VENV)
	@echo -e "$(COLOR_BLUE)==> Installing Python dependencies from requirements.txt...$(COLOR_RESET)"
	$(PIP) install -r $(ROOT_DIR)/requirements.txt

py-lint:
	@echo -e "$(COLOR_BLUE)==> Running Ruff linter on scripts/...$(COLOR_RESET)"
	@if [ -x "$(RUFF)" ]; then \
		$(RUFF) check $(SCRIPTS_DIR); \
	else \
		python3 -m ruff check $(SCRIPTS_DIR); \
	fi

py-lint-fix:
	@echo -e "$(COLOR_BLUE)==> Running Ruff auto-fix on scripts/...$(COLOR_RESET)"
	@if [ -x "$(RUFF)" ]; then \
		$(RUFF) check --fix $(SCRIPTS_DIR); \
		$(RUFF) format $(SCRIPTS_DIR); \
	else \
		python3 -m ruff check --fix $(SCRIPTS_DIR); \
		python3 -m ruff format $(SCRIPTS_DIR); \
	fi

py-typecheck:
	@echo -e "$(COLOR_BLUE)==> Running mypy type checking...$(COLOR_RESET)"
	@if [ -x "$(MYPY)" ]; then \
		$(MYPY) $(SCRIPTS_DIR); \
	else \
		python3 -m mypy $(SCRIPTS_DIR); \
	fi

py-test:
	@echo -e "$(COLOR_BLUE)==> Executing pytest test suite...$(COLOR_RESET)"
	@if [ -x "$(PYTEST)" ]; then \
		$(PYTEST) -v $(SCRIPTS_DIR)/tests; \
	else \
		python3 -m pytest -v $(SCRIPTS_DIR)/tests; \
	fi
