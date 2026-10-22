---
name: github
allowed-tools: run_command, view_file, write_to_file, replace_file_content, grep_search, list_dir
description: "Manage GitHub repositories, pull requests, issues, releases, actions, and account resources using the GitHub CLI (`gh`) and GitHub MCP tools. Use when creating repos, managing remotes, opening PRs, checking CI runs, or administering GitHub."
---

# GitHub Management Skill

A streamlined, robust skill for managing GitHub repositories, branches, pull requests, issues, releases, and CI/CD workflows using both the GitHub CLI (`gh`) and the GitHub Model Context Protocol (MCP) server.

---

## 1. Authentication & Status Verification

Before performing operations, always check the current authentication status:

```bash
gh auth status
```

- If authenticated, note the active account and token scopes (`repo`, `read:org`, `workflow`, etc.).
- If not authenticated, prompt the user to log in:
  - Interactive web flow: `gh auth login -w`
  - Or with token: `gh auth login --with-token < token.txt`
  - Or by setting the `GITHUB_TOKEN` / `GH_TOKEN` environment variable.

---

## 2. Repository Management

### Create and Link a New Repository

To initialize and publish the current project to GitHub:

```bash
# 1. Initialize git if not already present
git init
git branch -M main

# 2. Add and commit files
git add .
git commit -m "feat: initial commit"

# 3. Create remote repository and push (choose public or private)
gh repo create <repo-name> --public --source=. --remote=origin --push
# Or for a private repository:
gh repo create <repo-name> --private --source=. --remote=origin --push
```

### Inspect or Clone Repositories

```bash
# View current repo info
gh repo view

# View repo in web browser
gh repo view --web

# Clone a remote repo
gh repo clone <owner>/<repo>
```

---

## 3. Pull Requests (`gh pr`)

- **List PRs**: `gh pr list --state open`
- **Create PR**: `gh pr create --title "feat: description" --body "Detailed PR notes" --base main`
- **View PR details / diff**:
  ```bash
  gh pr view <pr-number>
  gh pr diff <pr-number>
  ```
- **Check PR checks / CI status**: `gh pr checks <pr-number>`
- **Merge PR**:
  ```bash
  gh pr merge <pr-number> --squash --delete-branch
  ```

---

## 4. Issues (`gh issue`)

- **List open issues**: `gh issue list`
- **Create an issue**: `gh issue create --title "Bug title" --body "Reproduction steps"`
- **View an issue**: `gh issue view <issue-number>`
- **Close an issue**: `gh issue close <issue-number> --comment "Resolved in commit ..."`

---

## 5. Releases & Tags (`gh release`)

- **List releases**: `gh release list`
- **Create a release**:
  ```bash
  gh release create v1.0.0 --title "v1.0.0 Release" --notes "Release notes summary..."
  ```

---

## 6. GitHub Actions & CI Workflows (`gh run`)

- **List recent runs**: `gh run list --limit 5`
- **View run status / logs**: `gh run view <run-id> --log-failed`
- **Watch an active run**: `gh run watch <run-id>`

---

## 7. Model Context Protocol (MCP) Integration

When `@modelcontextprotocol/server-github` is active:
- Direct API calls can be dispatched for querying files, searching issues, creating branches, and reading PR diffs without spawning subshells.
- Verify token availability via `GITHUB_PERSONAL_ACCESS_TOKEN` in the environment configuration.

---

## Safety & Conventions

1. **Never force-push (`git push --force`)** to `main` or `master` branches.
2. **Always review diffs** before committing and pushing.
3. **Respect `.gitignore`** to ensure credentials, `.env*`, `node_modules`, `.next`, and build artifacts are never pushed to GitHub.
