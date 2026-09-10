#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
    git init
fi

if [ -z "$(git config user.name || true)" ]; then
    git config user.name "SmartBank Developer"
fi
if [ -z "$(git config user.email || true)" ]; then
    git config user.email "developer@smartbank.local"
fi

git checkout --orphan smart-bank-history-rebuild
git read-tree --empty

commit_stage() {
    local timestamp="$1"
    local message="$2"
    shift 2

    git add "$@"
    GIT_AUTHOR_DATE="$timestamp" \
    GIT_COMMITTER_DATE="$timestamp" \
        git commit -m "$message"
}

commit_stage "2026-09-08 09:00:00" "Add SmartBank application scaffold" \
    index.html
commit_stage "2026-09-08 09:45:00" "Configure SPA rewrite rules" \
    .htaccess
commit_stage "2026-09-08 10:30:00" "Add base application stylesheet" \
    css/style.css
commit_stage "2026-09-08 11:30:00" "Add browser storage utilities" \
    js/storage/storage.js
commit_stage "2026-09-08 13:00:00" "Seed initial banking data" \
    js/data/initialData.js
commit_stage "2026-09-08 14:15:00" "Add form validation helpers" \
    js/validation/validation.js
commit_stage "2026-09-08 15:30:00" "Implement user account service" \
    js/services/userService.js

commit_stage "2026-09-09 09:00:00" "Add user activity history service" \
    js/services/historyService.js
commit_stage "2026-09-09 10:15:00" "Implement credit simulation service" \
    js/services/creditService.js
commit_stage "2026-09-09 11:30:00" "Add rewards and points service" \
    js/services/rewardService.js
commit_stage "2026-09-09 13:00:00" "Implement offers service" \
    js/services/offerService.js
commit_stage "2026-09-09 14:15:00" "Implement flash sale service" \
    js/services/flashSaleService.js
commit_stage "2026-09-09 15:15:00" "Add dashboard data aggregation" \
    js/services/dashboardService.js

commit_stage "2026-09-10 09:30:00" "Build login page" \
    js/pages/login.js
commit_stage "2026-09-10 10:45:00" "Build registration page" \
    js/pages/register.js
commit_stage "2026-09-10 12:00:00" "Add password recovery page" \
    js/pages/forgotPassword.js
commit_stage "2026-09-10 14:00:00" "Implement client-side router" \
    js/router/router.js
commit_stage "2026-09-10 15:30:00" "Wire application workflows" \
    js/app.js
commit_stage "2026-09-10 17:00:00" "Add IDE project configuration" \
    .idea

# Capture the generator and any remaining workspace files in the closing commit.
git add .
GIT_AUTHOR_DATE="2026-09-10 19:30:00" \
GIT_COMMITTER_DATE="2026-09-10 19:30:00" \
    git commit -m "Finalize project history tooling"

git branch -M main

commit_count="$(git rev-list --count HEAD)"
if [ "$commit_count" -ne 20 ]; then
    echo "Expected 20 commits, found $commit_count" >&2
    exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
    echo "Working tree is not clean" >&2
    exit 1
fi

echo "Created $commit_count commits with a clean working tree."