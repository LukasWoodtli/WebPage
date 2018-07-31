Title: tmux
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]

# Prefix Key

The prefix key combination needs to be pressed before any command for tmux (when tmux is running).

By default the `PREFIX` is: `CTRL + b`


# Sessions

| Key Binding              | Function                |
|--------------------------|-------------------------|
| `tmux new -s <name>`     | Create a named session  |
| `tmux ls`                | List current sessions   |
| `tmux a`                 | Attach to last session  |
| `tmux a -t <name>`       | Attach to named session |
| `tmux kill-session -t <name>` | Kill named session |
| `PREFIX d`               | Detach from a running session |
| `PREFIX :`               | Enter command mode      |


Commands can be provided directly to tmux as arguments or can be entered
in command line (`PREFIX :`).

Commands:

- Check if a session is running: `has-session`
    - `-t`: Target session

## The Target Flag (`-t`)

 To specify the target session, window and pane for a command the flag `-t <session-name>:<window-id>.<pane-id>` is used.

- `<session-name>`: The name of the session
- `<window-id>` and `<pane-id>` (optional): id number of window or pane

Examples:

- `tmux split-window -v -t mysession`


## Additional Flags for `tmux new`

- `-d`: Create in background (detached)
- `-n <name>`: Name the first windows


# Windows

Like tabs in browser.

| Key Binding    | Function                   |
|----------------|----------------------------|
| `PREFIX c`     | Create a new window        |
| `PREFIX ,`     | Rename current window      |
| `PREFIX n`     | Move to next window        |
| `PREFIX p`     | Move to previous window    |
| `PREFIX <num>` | Move to window by index    |
| `PREFIX f`     | Find named window          |
| `PREFIX w`     | Show menu with all windows |
| `PREFIX &`     | Close current window       |


Commands:

- Create window: `new-window`
    - `-n`: name
    - `-t`: Target session
- Change to a window: `select-window `
    - `-t`: Target session and window

# Panes

| Key Binding | Function                      |
|-------------|-------------------------------|
| `PREFIX %`  | Split pane vertically         |
| `PREFIX "`  | Split pane horizontally       |
| `PREFIX o`  | Cycle through panes           |
| `PREFIX ←`, `PREFIX ↑`, `PREFIX →`, `PREFIX ↓`| Navigate around panes|
| `PREFIX x`  | Close current pane            |
| `PREFIX q`  | Show number of each pane      |
| `PREFIX z`  | Maximize/resize pane (toggle) |


Commands:

- Create new pane: `split-window`
    - `-v` or `-h`: vertically or horizontally
    - `-p` Percent of split
    - `-t` Target


## Pane Layouts


Command: `select-layout -t <session> <layout-type>`

There are following layout types:

- `even-horizontal`
- `even-vertical`
- `main-horizontal`
- `main-vertical`
- `tiled`

Cycle through layouts: `PREFIX SPACEBAR`


# Buffers

`vi` mode needs to be activated for these commands (`setw -g mode-keys vi`)

| Key Binding (vi) | Function                      |
|------------------|-------------------------------|
| `PREFIX` `[`     | Enter Copy mode               |
| `ENTER`          | Leave Copy mode               |
| `h`,`j`,`k`,`l`  | Move curse (like in `vi`)     |
| `w`,`b`          | Move word forward/backward    |
| `CTRL`+`b`, `CTRL`+`f` | Page-up, page-down      |
| `g`, `G`         | Jump to top/bottom of buffer  |
| `?`              | Search backward in buffer     |
| `/`              | Search forward in buffer      |
| `n`, `N`         | Jump to next/previous search result |
| `SPACE`          | Select text (move around for selection |
| `ENTER`          | Copy selected text            |
| `PREFIX` `]`     | Paste copied text (top of paste buffer stack) |
| `PREFIX` `=`     | Show all copied buffers for selection |

Commands:

- Copy visible content of pane: `capture-pane`
- Show the content of paste buffer: `show-buffer`
- Store the content of paste buffer in a file: `save-buffer <file-name>`
- tmux maintains a stack of paste buffers:
    - Paste buffer 0: `PREFIX` `]`
    - Show all buffers in stack: `list-buffers`
    - Choose buffer to paste: `choose-buffer`



# Send Shell Commands

Shell commands can be sent to tmux:

`tmux send-keys -t <session-name>:<window-id>.<pane-id> '<command>' C-m`

Arguments and Flags:

- `-t`: Target
- `<command>`: Can be any shell command
- `C-m`: Carriage return (enter, `CTRL`-`M`)


# Config

- Personal config file: `~/.tmux.conf`
- A custom config file can be supplied when tmux is started
    - `tmux -f <file-name>`
    - add `source-file ~/.tmux.conf` as first line to get settings from default file
- Reload file: `source-file <file-name>`
- Bind commands to keys: `bind [-nr] <key> <command0> \; <command1> ...`
    - `-n`: Don't use `PREFIX`
    - `-r`: Command may repeat (hold key)
    - Separate commands by `\;`


# See Also

[Tmuxinator](https://github.com/tmuxinator/tmuxinator)

