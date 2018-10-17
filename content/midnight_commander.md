Title: Midnight Commander
Date: 2018-06-05
Modified: 2018-06-05
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]


# Panels

| Keys      | Function                                            |
|-----------|-----------------------------------------------------|
| `ALT + u` | Swap panels                                         |
| `ALT + t` | Switch listing mode (full, brief, long ...)         |
| `ALT + i` | Show current directory in other panel (synchronize) |
| `ALT + ,` | Toggle layout between left-right and top-bottom     |


# Navigation

| Keys              | Function                             |
|-------------------|--------------------------------------|
| `CTRL + PgUp`     | Change to parent directory           |
| `ALT + o`         | Open selected directory (or parent directory if file is selected) in other panel |
| `ALT + SHIFT + h` | Show directory history               |
| `ALT + y`         | Open previous directory from history |
| `ALT + u`         | Open next directory from history     |


# Searching

- Search dialog: `ALT + ?`
- Quick search:
    - `ALT + s` (or `CTRL + s`)
    - use same shortcut jump to next match
    - wildcards (`*`, `?`) can be used


# File Selections

| Keys (Alternative) | Function                   |
|--------------------|----------------------------|
| `INS` (`CTRL + t`) | Select current file        |
| `+`                | Select files by pattern    |
| `\`                | Un-select files by pattern |
| `*`                | Reverse selection          |


# Shell

| Keys          | Function                                                                  |
|---------------|---------------------------------------------------------------------------|
| `ESC` `Tab`   | Shell completion, 2x for list of possibities, works also in dialog fields |
| `CTRL + O`    | Toggle between shell and `mc`                                             |
| `ALT + ENTER` | Copy current file name to shell                                           |


# Viewing and Editing

| Keys          | Function         |
|---------------|------------------|
| `F3`          | Internal viewer  |
| `SHIFT + F3`  | View raw content |
| `F4`          | Edit             |

The editor can be changed:

- Disable `Options > Configuration > Use internal edit`
- Set envronment variable `EDIT` to preferred editor


# Function Keys

The function keys (`F1` - `F10`) can be emulated by using `ESC + 1` - `ESC + 0`

# Wrapper Script (`mc-wrapper`)

The `mc-wrapper` script allows that the shell changes to the current directory when exiting `mc`.

It can be activated by setting an alias.

On Linux:

    :::bash
    alias mc='. /usr/libexec/mc/mc-wrapper.sh'

On macOS (homebrew):

    :::bash
     alias mc='. /usr/local/opt/midnight-commander/libexec/mc/mc-wrapper.sh'


# Terminal Emulator Settings

## GNOME Terminal (3.28.2)

- Disable `Edit > Preferences > General > Enable the menu accelerator key (F10 by default)`
- Change `Edit > Preferences > Shortcuts > Help > Contetns` to `Shift+Ctrl+F1`
- Change `Edit > Preferences > Shortcuts > Tabs > Switch to Previous Tab` to `Alt+Page Up`
- Change `Edit > Preferences > Shortcuts > Tabs > Switch to Next Tab` to `Alt+Page Down`


# References

- [Use Midnight Commander like a pro](http://klimer.eu/2015/05/01/use-midnight-commander-like-a-pro/)
- [MC Tutorial](http://www.trembath.co.za/mctutorial.html)
