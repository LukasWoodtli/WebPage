---
title: vim
category: Programming
tags: [Tools, Cheat Sheet, Unix, Linux]
---

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

## By Line or Character

| Key        | Movement          |
|------------|-------------------|
| `h`        | left              |
| `j`        | down              |
| `k`        | up                |
| `l`        | right             |
| `^` or `0` | beginning of line |
| `$`        | end of line       |

![move by line or char](images/vim/move_by_line_or_char.png)

> Hint: `j` looks like an arrow pointing down

## By Word

| Keys | Movement                                 |
|------|------------------------------------------|
| `w`  | next word                                |
| `W`  | next word, don't stop at punctuation     |
| `b`  | previous word                            |
| `B`  | previous word, don't stop at punctuation |

## By Page

| Keys      | Movement  |
|-----------|-----------|
| `ctl`-`f` | page down |
| `ctl`-`b` | page up   |

## Begin and End of Document

| Keys         | Movement   |
|--------------|------------|
| `gg` or `:1` | first line |
| `G`  or `:$` | last line  |

## Go to Line

| Keys                                        | Movement   |
|---------------------------------------------|------------|
| `<line-no>gg`, `<line-no>G` or `:<line-no>` | go to line |


# Editing

| Key         | Action                          |
|-------------|---------------------------------|
| `x` or `dl` | Delete (cut) char at cursor     |
| `X` or `dh` | Delete (cut) char before cursor |
| `dw`        | Delete (cut) word at cursor     |
| `db`        | Delete (cut) word before cursor |
| `dd`        | Delete (cut) current line       |
| `p`         | Paste                           |


# Help

- `:help [command]`: Get help (without command: general help)

# See Also

[Learn Vim Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
[Learn Vim For the Last Time](https://danielmiessler.com/study/vim/)
