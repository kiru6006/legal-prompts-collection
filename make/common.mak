# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - COMMON MAKE DEFINITIONS
# ==============================================================================

SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

# Paths
ROOT_DIR := $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST)))))/..
CONFIG_DIR := $(ROOT_DIR)/config
SCRIPTS_DIR := $(ROOT_DIR)/scripts
CONTENT_DIR := $(ROOT_DIR)/content
PUBLIC_DIR := $(ROOT_DIR)/public
SRC_DIR := $(ROOT_DIR)/src
DOCS_DIR := $(ROOT_DIR)/docs
DIST_DIR := $(ROOT_DIR)/dist

# Python Environment
VENV ?= $(ROOT_DIR)/.venv
PYTHON := $(VENV)/bin/python3
PIP := $(VENV)/bin/pip
PYTEST := $(VENV)/bin/pytest
RUFF := $(VENV)/bin/ruff
MYPY := $(VENV)/bin/mypy

# Node Environment
NPM := npm
NODE := node

# Colors for terminal output
COLOR_RESET := \033[0m
COLOR_BOLD := \033[1m
COLOR_GREEN := \033[32m
COLOR_BLUE := \033[34m
COLOR_YELLOW := \033[33m
COLOR_CYAN := \033[36m
COLOR_RED := \033[31m

.PHONY: help
help:
	@echo -e "$(COLOR_BOLD)$(COLOR_CYAN)Claude Legal Skills Workbench - Command Center$(COLOR_RESET)"
	@echo -e "Usage: make $(COLOR_YELLOW)<target>$(COLOR_RESET)"
	@echo ""
	@echo -e "$(COLOR_BOLD)Core Targets:$(COLOR_RESET)"
	@echo -e "  $(COLOR_GREEN)all$(COLOR_RESET)             Install dependencies, validate content, run tests, and build web app"
	@echo -e "  $(COLOR_GREEN)dev$(COLOR_RESET)             Start local frontend development server"
	@echo -e "  $(COLOR_GREEN)clean$(COLOR_RESET)           Remove build artifacts, caches, and temp directories"
	@echo ""
	@echo -e "$(COLOR_BOLD)Content & Data Targets (make/data.mak):$(COLOR_RESET)"
	@echo -e "  $(COLOR_GREEN)data-sync$(COLOR_RESET)       Fetch or verify pinned upstream repository (.upstream)"
	@echo -e "  $(COLOR_GREEN)data-build$(COLOR_RESET)      Compile canonical skills.json & manifest.json"
	@echo -e "  $(COLOR_GREEN)data-validate$(COLOR_RESET)   Validate content schema and references against upstream"
	@echo -e "  $(COLOR_GREEN)data-report$(COLOR_RESET)     Generate catalogue coverage and drift reports"
	@echo ""
	@echo -e "$(COLOR_BOLD)Python Targets (make/python.mak):$(COLOR_RESET)"
	@echo -e "  $(COLOR_GREEN)py-install$(COLOR_RESET)      Create virtual environment and install Python dependencies"
	@echo -e "  $(COLOR_GREEN)py-lint$(COLOR_RESET)         Run ruff checks and formatting"
	@echo -e "  $(COLOR_GREEN)py-typecheck$(COLOR_RESET)    Run mypy type checker"
	@echo -e "  $(COLOR_GREEN)py-test$(COLOR_RESET)         Run pytest test suite"
	@echo ""
	@echo -e "$(COLOR_BOLD)Frontend Targets (make/frontend.mak):$(COLOR_RESET)"
	@echo -e "  $(COLOR_GREEN)front-install$(COLOR_RESET)   Install Node.js dependencies"
	@echo -e "  $(COLOR_GREEN)front-lint$(COLOR_RESET)      Run ESLint / Prettier"
	@echo -e "  $(COLOR_GREEN)front-typecheck$(COLOR_RESET) Run tsc type checking"
	@echo -e "  $(COLOR_GREEN)front-test$(COLOR_RESET)      Run Vitest test suite"
	@echo -e "  $(COLOR_GREEN)front-build$(COLOR_RESET)     Build production bundle into dist/"
	@echo ""
	@echo -e "$(COLOR_BOLD)Deployment Targets (make/deploy.mak):$(COLOR_RESET)"
	@echo -e "  $(COLOR_GREEN)pages-prep$(COLOR_RESET)      Prepare and verify dist/ for GitHub Pages deployment"
	@echo -e "  $(COLOR_GREEN)pages-preview$(COLOR_RESET)   Locally preview the production build"
