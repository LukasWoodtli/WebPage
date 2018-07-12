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
| `PREFIX d`               | Detach from a running session |
| `PREFIX :`               | Enter command mode      |

## The Target Flag (`-t`)

Commands can be provided directly to tmux as arguments. To specify the
target session for the command the flag `-t <session-name>` is used.

Examples:

- `tmux split-window -v -t mysession`


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

| Command     | Function                      |
|-------------|-------------------------------|
| `PREFIX %`  | Split pane vertically         |
| `PREFIX "`  | Split pane horizontally       |
| `PREFIX o`  | Cycle through panes           |
| `PREFIX ←`, `PREFIX ↑`, `PREFIX →`, `PREFIX ↓`| Navigate around panes|
| `PREFIX x`  | Close current pane            |
| `PREFIX q`  | Show number of each pane      |
| `PREFIX z`  | Maximize/resize pane (toggle) |

## Pane Layouts

There are following layouts:

- `even-horizontal`
- `even-vertical`
- `main-horizontal`
- `main-vertical`
- `tiled`

Cycle through layouts: `PREFIX SPACEBAR`

# Config

- Personal config file: `~/.tmux.conf`
- Reload file: `source-file <file-name>`
- Bind commands to keys: `bind [-nr] <key> <command0> \; <command1> ...`
    - `-n`: Don't use `PREFIX`
    - `-r`: Command may repeat (hold key)
    - Separate commands by `\;`

