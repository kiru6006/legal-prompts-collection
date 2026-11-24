# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - MASTER MAKEFILE
# ==============================================================================

include make/common.mak
include make/python.mak
include make/frontend.mak
include make/data.mak
include make/deploy.mak

# Master targets
.PHONY: all test lint validate build

all: data-build front-build pages-prep
	@echo -e "$(COLOR_BOLD)$(COLOR_GREEN)Build pipeline finished successfully!$(COLOR_RESET)"

lint: py-lint front-lint
	@echo -e "$(COLOR_GREEN)All linters passed.$(COLOR_RESET)"

test: py-test front-test
	@echo -e "$(COLOR_GREEN)All tests passed.$(COLOR_RESET)"

validate: data-validate py-typecheck front-typecheck
	@echo -e "$(COLOR_GREEN)Validation passed.$(COLOR_RESET)"

build: data-build front-build pages-prep
	@echo -e "$(COLOR_GREEN)Application build completed.$(COLOR_RESET)"
