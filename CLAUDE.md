# CLAUDE.md - TheShip System Rules for Claude Code

This project uses TheShip for tracking specifications and engineering tasks.

## ⚠️ CRITICAL RULES
1. **Read-Only Directory**: The `.theship/` directory is **read-only**. You MUST NOT delete, modify, or overwrite any PRD, guide, task data, or review files (except checking off task boxes inside `tasks.md`).
2. **Single Source of Truth**: Treat `.theship/features/basic-backend-setup/01_PRD.md` as the absolute source of truth. Do not invent requirements outside of it.
3. **Strict Task Sequence**: Implement tasks in the exact order listed in `02_TASKS.json`. Read the corresponding detail file `tasks/{index}-{task_slug}.md` for each task.

## 🛠️ WORKFLOW FOR ACTIVE WORK
- **Fetch Specs**: Run `git fetch origin && git checkout origin/main -- .theship` to fetch updates.
- **Review Feedback**: Always check if `review.md` exists. If there is a review file with `REQUEST CHANGES` or `[BLOCKING]` issues, prioritize fixing them before starting new tasks.
- **Progress Tracking**: Update status in `tasks.md` by changing checkboxes:
  - `[ ]` -> `[/]` when starting a task.
  - `[/]` -> `[x]` when the task is verified and complete.
  Commit and push to sync.
