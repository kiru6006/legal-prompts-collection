# ==============================================================================
# CLAUDE LEGAL SKILLS WORKBENCH - FRONTEND TARGETS
# ==============================================================================

.PHONY: front-install front-lint front-typecheck front-test front-build dev

front-install:
	@echo -e "$(COLOR_BLUE)==> Installing Node.js packages...$(COLOR_RESET)"
	$(NPM) install

front-lint:
	@echo -e "$(COLOR_BLUE)==> Checking frontend code styles...$(COLOR_RESET)"
	$(NPM) run lint --if-present

front-typecheck:
	@echo -e "$(COLOR_BLUE)==> Running TypeScript compiler check...$(COLOR_RESET)"
	$(NPM) run typecheck --if-present

front-test:
	@echo -e "$(COLOR_BLUE)==> Executing Vitest tests...$(COLOR_RESET)"
	$(NPM) run test:unit --if-present

front-build:
	@echo -e "$(COLOR_BLUE)==> Building production bundle with Vite...$(COLOR_RESET)"
	$(NPM) run build

dev:
	@echo -e "$(COLOR_GREEN)==> Starting Vite development server...$(COLOR_RESET)"
	$(NPM) run dev
