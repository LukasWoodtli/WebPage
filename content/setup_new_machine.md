---
title: Setup a new Machine
category: Programming
tags: [Tools, Cheat Sheet, Unix, Linux]
---
Some notes on what to do to setup a new machine for my development projects.

# Linux

- Create new user with given (fixed) `uid` and `gid`
    - only when needed for NFS
- Setup `/etc/fstab` for NFS mounts
- Setup `/etc/exports` and `/etc/samba/smb.conf` for exported mounts
- Install:
    - with package manager: mc tmux vim zsh ranger docker code gcc clang make cmake ninja-build python3 doxygen graphviz cgdb docker git htop icdiff meld direnv xdg-utils ack
    - fzf: use git and install script (otherwithe key bindings are not setup properly)
    - nvm: https://github.com/nvm-sh/nvm#installing-and-updating
    - Oh My Zsh: https://ohmyz.sh/
    - Powerlevel10k theme (including fonts): https://github.com/romkatv/powerlevel10k#get-started
- Restore keys in `~/.ssh/`
- Restore shell config files (.bashrc, .zshrc, .commonrc?) and oh-my-zsh
- Restore `vim` config (github)
- Restore `tmux` config (github)
- Resore `.gitconfig`, set `git config --global --add user.useConfigOnly true` (https://collectiveidea.com/blog/archives/2016/04/04/multiple-personalities-in-git)

