# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - DATA & CONTENT TARGETS
# ==============================================================================

.PHONY: data-sync data-build data-validate data-report

UPSTREAM_REPO := https://github.com/anthropics/claude-for-legal.git
UPSTREAM_DIR := $(ROOT_DIR)/.upstream
UPSTREAM_CONF := $(CONFIG_DIR)/upstream.yaml

data-sync:
	@echo -e "$(COLOR_BLUE)==> Synchronising upstream pinned repository...$(COLOR_RESET)"
	@if [ ! -d "$(UPSTREAM_DIR)" ]; then \
		echo "Cloning $(UPSTREAM_REPO) into $(UPSTREAM_DIR)..."; \
		git clone --depth=1 $(UPSTREAM_REPO) $(UPSTREAM_DIR); \
	else \
		echo "Upstream mirror exists at $(UPSTREAM_DIR). Checking commit..."; \
	fi
	@python3 $(SCRIPTS_DIR)/check_upstream.py --source $(UPSTREAM_DIR) --config $(UPSTREAM_CONF)

data-build:
	@echo -e "$(COLOR_BLUE)==> Compiling canonical skills catalogue...$(COLOR_RESET)"
	@mkdir -p $(PUBLIC_DIR)/data
	python3 $(SCRIPTS_DIR)/build_skills.py \
		--source $(UPSTREAM_DIR) \
		--overlays $(CONTENT_DIR)/overlays \
		--india $(CONTENT_DIR)/india \
		--legislation $(CONTENT_DIR)/legislation \
		--case-studies $(CONTENT_DIR)/case-studies \
		--workflows $(CONTENT_DIR)/workflows \
		--learning $(CONTENT_DIR)/learning \
		--glossary $(CONTENT_DIR)/glossary \
		--output $(PUBLIC_DIR)/data/skills.json \
		--manifest $(PUBLIC_DIR)/data/manifest.json

data-validate:
	@echo -e "$(COLOR_BLUE)==> Validating compiled catalogue against content schema...$(COLOR_RESET)"
	python3 $(SCRIPTS_DIR)/validate_content.py --input $(PUBLIC_DIR)/data/skills.json

data-report:
	@echo -e "$(COLOR_BLUE)==> Generating coverage and drift metrics reports...$(COLOR_RESET)"
	python3 $(SCRIPTS_DIR)/generate_report.py \
		--input $(PUBLIC_DIR)/data/skills.json \
		--output-dir $(DOCS_DIR)/reports
