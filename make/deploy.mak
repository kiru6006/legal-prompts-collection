# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - DEPLOYMENT TARGETS
# ==============================================================================

.PHONY: pages-prep pages-preview clean

pages-prep:
	@echo -e "$(COLOR_BLUE)==> Preparing dist/ directory for GitHub Pages...$(COLOR_RESET)"
	@if [ ! -d "$(DIST_DIR)" ]; then \
		echo -e "$(COLOR_RED)Error: dist/ does not exist. Run 'make front-build' first.$(COLOR_RESET)"; \
		exit 1; \
	fi
	@# Ensure .nojekyll exists for GitHub Pages
	@touch $(DIST_DIR)/.nojekyll
	@# Verify canonical data exists in distribution
	@if [ ! -f "$(DIST_DIR)/data/skills.json" ]; then \
		echo -e "$(COLOR_YELLOW)Warning: data/skills.json not in dist/ - copying from public/...$(COLOR_RESET)"; \
		mkdir -p $(DIST_DIR)/data && cp -r $(PUBLIC_DIR)/data/* $(DIST_DIR)/data/; \
	fi
	@echo -e "$(COLOR_GREEN)dist/ is ready for GitHub Pages deployment.$(COLOR_RESET)"

pages-preview:
	@echo -e "$(COLOR_BLUE)==> Starting local preview server for dist/...$(COLOR_RESET)"
	$(NPM) run preview

clean:
	@echo -e "$(COLOR_YELLOW)==> Cleaning build outputs and caches...$(COLOR_RESET)"
	rm -rf $(DIST_DIR)
	rm -rf $(ROOT_DIR)/node_modules/.vite
	rm -rf $(ROOT_DIR)/.pytest_cache
	rm -rf $(ROOT_DIR)/.mypy_cache
	rm -rf $(ROOT_DIR)/.ruff_cache
	find $(ROOT_DIR) -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@echo -e "$(COLOR_GREEN)Clean complete.$(COLOR_RESET)"
