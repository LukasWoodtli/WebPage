Title: Unix Directory Structure
Category: Programming
Tags: Computer Science, OS, Linux, Unix
Date: 2016-09-30
Modified: 2016-09-30


# Linux

| Directory    | Content                                                       |
|--------------|---------------------------------------------------------------|
| `/bin/`      | Essential commands and programs                               |
| `/sbin/`     | System binaries: mainly system administration programs        |
| `/boot/`     | Files for bootloader                                          |
| `/dev/`      | Device files                                                  |
| `/usr/`      | System utilities (Unix System Resources)                      |
| `/opt/`      | Optional software: mainly for users                           |
| `/etc/`      | System configuration files                                    |
| `/home/`     | User home directories                                         |
| `/root/`     | Root home directory                                           |
| `/tmp/`      | Temporary files, deleted at reboot                            |
| `/kernel/`   | The operating system                                          |
| `/srv/`      | Data for services                                             |
| `/var/`      | Variable files (logs)                                         |
| `/usr/lib/`  | Precompiled libraries (shared objects)                        |
| `/lib/`      | Precompiled libraries (shared objects)                        |
| `/media/`    | Removable devices are mounted here                            |
| `/mnt/`      | Temporary filesystems are mounted here                        |
| `/proc/`     | Virtual file system with live kernel information              |

Any directory ending with `bin/` contains binary executable files (or links to them)
