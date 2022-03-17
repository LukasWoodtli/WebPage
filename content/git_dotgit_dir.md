---
title: Dot Git Directory
date: 2017-06-29
category: Programming
tags: [Git, Version Control]
---

Some notes about the contents of the `.git` directory that resides in the root of a git repository.

- `config` file: contains project-specific configurations
- `info/exclude` file: ignore patterns in addition to `.gitignore` files but not tracked
- `hooks` directory: client- or server-side hook scripts
- `HEAD` file: points to the currently checked out branch
- `objects` directory: stores the content of the git database
- `refs` directory: stores pointers to commit objects (branches)
- `index` file: staging area information
- `description` file: only used by the GitWeb program


For submodules the directory is in the `.git` directory of the main repository ("supermodule").

The `.git` directory of a repository can be shown with `git rev-parse --git-dir`
