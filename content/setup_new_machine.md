Title: Setup a new Machine
Category: Programming
Tags: Tools, Cheat Sheet, Unix, Linux

Some notes on what to do to setup a new machine for my development projects.

# Linux

- Create new user with given (fixed) `uid` and `gid`
    - only when needed for NFS
- Setup `/etc/fstab` for NFS mounts
- Setup `/etc/exports` and `/etc/samba/smb.conf` for exported mounts
- Install:
    - with package manager: mc tmux vim zsh ranger docker kate gcc clang make cmake python3 doxygen graphviz cgdb docker git htop icdiff meld direnv
    - fzf: use git and install script (otherwithe key bindings are not setup properly)
- Restore keys in `~/.ssh/`
- Restore shell config files (.bashrc, .zshrc, .commonrc?) and oh-my-zsh
- Restore `vim` config (github)
- Restore `tmux` config (github)
- Resore `.gitconfig`, set `git config --global --add user.useConfigOnly true` (https://collectiveidea.com/blog/archives/2016/04/04/multiple-personalities-in-git)

