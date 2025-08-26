---
title: Setup a new Machine
category: Programming
tags: [Tools, Cheat Sheet, Unix, Linux]
---
Some notes on what to do to setup a new machine for my development projects.

# Linux

- Install:
    - with package manager: `sudo apt install mc vim zsh docker gcc clang make cmake ninja-build python3 doxygen graphviz cgdb docker git htop icdiff meld direnv xdg-utils ripgrep etckeeper picocom batcat fd-find`
    - Editor: code/codium (Snap)
    - `fzf`: use git and install script (otherwithe key bindings are not setup properly)
    - `batcat`: Use alias (`alias bat="batcat"`, already in `.zshrc`)
    - `fd-find`: Use softlink (`ln -s $(which fdfind) ~/.local/bin/fd `)
    - `nvm`: https://github.com/nvm-sh/nvm#installing-and-updating
    - Oh My Zsh: https://ohmyz.sh/
    - Powerlevel10k theme (including fonts): https://github.com/romkatv/powerlevel10k#get-started
- Restore keys in `~/.ssh/`
- Restore shell config files (`.bashrc`, `.zshrc`) and oh-my-zsh
- Restore `vim` config (github)
- Resore `.gitconfig`, set `git config --global --add user.useConfigOnly true` (https://collectiveidea.com/blog/archives/2016/04/04/multiple-personalities-in-git)
