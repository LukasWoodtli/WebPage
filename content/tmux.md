Title: tmux
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]

# Prefix Key

The prefix key combination needs to be pressed before any command for tmux (when tmux is running).

By default the `PREFIX` is:

`CTRL + b`


# Sessions

| Commands                 | Function                |
|--------------------------|-------------------------|
| `tmux new -s <name>`     | Create a named session  |
| `tmux ls`                | List current sessions   |
| `tmux a`                 | Attach to last session  |
| `tmux a -t <name>`       | Attach to named session |
| `tmux kill-session -t <name>` | Kill named session |


## Additional Flags for `new`

- `-d`: Create in background (detached) 
- `-n <name>`: Name the first windows


# Windows

Like tabs in browser.

| Commands       | Function                   |
|----------------|----------------------------|
| `PREFIX c`     | Create a new window        |
| `PREFIX ,`     | Rename current window      |
| `PREFIX n`     | Move to next window        |
| `PREFIX p`     | Move to previous window    |
| `PREFIX <num>` | Move to window by index    |
| `PREFIX f`     | Find named window          |
| `PREFIX w`     | Show menu with all windows |
| `PREFIX &`     | Close current window       |


