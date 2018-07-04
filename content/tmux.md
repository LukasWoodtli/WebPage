Title: tmux
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]

# Prefix Key

The prefix key combination needs to be pressed before any command for tmux (when tmux is running).

By default the prefix is:

`CTRL + b`


# Sessions

| Commands             | Function                | Additional Flags                     |
|----------------------|-------------------------|--------------------------------------|
| `tmux new -s <name>` | Create a named session  | `-d` Create in background (detached) |
| `tmux ls`            | List current sessions   |                                      |
| `tmux a`             | Attach to last session  |                                      |
| `tmux a -t <name>`   | Attach to named session |                                      |
