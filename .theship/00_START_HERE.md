# 🚢 TheShip AI Developer Protocol

This repository is managed by **TheShip**. Follow this protocol to align your development with the active product specifications.

## ⚠️ READ-ONLY CONSTRAINTS
- **DO NOT** write, modify, delete, or overwrite any files in the `.theship/` directory (except checkboxes inside `tasks.md`).
- This folder acts as your **read-only source of truth** representing the PM directives and PRD.

## 📋 SYSTEMATIC WORKFLOW
1. **Fetch Latest Spec**: Sync the configuration files without changing your branch code:
   ```bash
   git fetch origin && git checkout origin/main -- .theship
   ```
2. **Understand the PRD**: Read `.theship/features/basic-backend-setup/01_PRD.md`.
3. **Execute Linearly**: Read `.theship/features/basic-backend-setup/02_TASKS.json` and follow the individual task instructions under `.theship/features/basic-backend-setup/tasks/` in strict sequential order.
4. **Inspect Reviews**: Check `.theship/features/basic-backend-setup/review.md` to fix any blocking comments raised in previous PR reviews.
5. **Update Kanban**: Mark task progress in `.theship/features/basic-backend-setup/tasks.md` using:
   - `[ ]` - Todo
   - `[/]` - In Progress
   - `[-]` - In Review
   - `[x]` - Done
   Commit and push your changes to synchronize status.
