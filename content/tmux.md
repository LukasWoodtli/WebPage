Title: tmux
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]

# Prefix Key

The prefix key combination needs to be pressed before any command for tmux (when tmux is running).

By default the `PREFIX` is: `CTRL + b`


# Sessions

| Command                  | Function                |
|--------------------------|-------------------------|
| `tmux new -s <name>`     | Create a named session  |
| `tmux ls`                | List current sessions   |
| `tmux a`                 | Attach to last session  |
| `tmux a -t <name>`       | Attach to named session |
| `tmux kill-session -t <name>` | Kill named session |


## Additional Flags for `tmux new`

- `-d`: Create in background (detached)
- `-n <name>`: Name the first windows


# Windows

Like tabs in browser.

| Command        | Function                   |
|----------------|----------------------------|
| `PREFIX c`     | Create a new window        |
| `PREFIX ,`     | Rename current window      |
| `PREFIX n`     | Move to next window        |
| `PREFIX p`     | Move to previous window    |
| `PREFIX <num>` | Move to window by index    |
| `PREFIX f`     | Find named window          |
| `PREFIX w`     | Show menu with all windows |
| `PREFIX &`     | Close current window       |


# Panes

| Command        | Function                   |
|----------------|----------------------------|
| `PREFIX %`     | Split pane vertically      |
| `PREFIX "`     | Split pane horizontally    |
| `PREFIX o`     | Cycle through panes        |
| `PREFIX ←`, `PREFIX ↑`, `PREFIX →`, `PREFIX ↓`| Navigate around panes|
| `PREFIX x`     | Close current pane         |


## Pane Layouts

There are following layouts:

- `even-horizontal`
- `even-vertical`
- `main-horizontal`
- `main-vertical`
- `tiled

Cycle through layouts: `PREFIX SPACEBAR`
