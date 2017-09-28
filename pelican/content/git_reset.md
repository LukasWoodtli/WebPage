Title: Git Reset
Date: 2017-09-26
Category: Version Control
Tags: Git

The `git reset` command is not very easy and can be dangerous in some cases. The `git checkout` command does similar things.

This overview is taken from the [Pro Git](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified#_summary_8) book.

The meanings in the following tables are:

- **HEAD**: Means that either HEAD itself is moved or the branch that HEAD points to (REF)
- **Index** and **Workdir**: indicate what is changed by the command
- **Safe**: If the command can overwrite uncommited changes it is *not safe* (work can be lost)


# Commit Level

| Command                 | HEAD | Index | Workdir | Safe | Notes |
|-------------------------|------|-------|---------|------|-------|
| `reset --soft [commit]` | REF  |   ✗   |    ✗    |  ✓   |       |
| `reset [commit]`        | REF  |   ✓   |    ✗    |  ✓   |       |
| `reset --hard [commit]` | REF  |   ✓   |    ✓    |  *✘* | just replaces and overwrites files without waring  |
| `checkout <commit>`     | HEAD |   ✓   |    ✓    |  ✓   | merges files, aborts and warns in case of conflicts| |


# File Level

| Command                    | HEAD | Index | Workdir | Safe | Notes |
|----------------------------|------|-------|---------|------|-------|
| `reset [commit] <file>`    |  ✗   |   ✓   |    ✗    |  ✓   |       |
| `checkout [commit] <file>` |  ✗   |   ✓   |    ✓    | *✘*  | would be same as `git reset --hard [branch] file` but this is not allowed |

 HEAD is never changed with this commands.

# Patch Option

Both commands, `git reset` and `git checkout` support the `--patch` option to allow to reset or checkout only part of changes.
