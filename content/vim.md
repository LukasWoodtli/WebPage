Title: vim
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

[TOC]

# Modes

| Key   | Mode   |
|-------|--------|
| `i`   | Insert |
| `ESC` | Normal |


# Verbs

| Command | Meaning |
|-----|-------------|
| `d` | delete      |
| `c` | change      |
| `y` | yank (copy) |
| `v` | visually select (`V` for line) |


# Modifiers

| Modifier | Meaning     |
|----------|-------------|
| `i`      | inside      |
| `a`      | around      |
| *number* | e.g.: `1`, `2`, `10`    |
| `t`      | search (stop before it) |
| `f`      | search (stop on it)     |
| `/`      | find regex              |


# Nouns

| Noun        | Meaning   |
|-------------|-----------|
| `w`         | word      |
| `s` or  `)` | sentence  |
| `p` or `}`  | paragraph |
| `t` | tag (HTML/XML)    |
| `b` | block (programming) |

These key can also be used for navigation.

# Navigation

| Key | Movement  |
|-----|-----------|
| `h` | ← (left)  |
| `j` | ↓ (down)  |
| `k` | ↑ (up)    |
| `l` | → (right) |

> Hint: `j` looks like an arrow pointing down

# Editing

| Key  | Action                         |
|------|--------------------------------|
| `x`  | Delete (cut) char under cursor |
| `dd` | Delete (cut) current line      |
| `p`  | Paste                          |


# Help

- `:help [command]`: Get help (without command: general help)

# See Also

[Learn Vim Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
[Learn Vim For the Last Time](https://danielmiessler.com/study/vim/)
