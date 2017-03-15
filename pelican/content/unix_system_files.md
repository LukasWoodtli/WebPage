Title: Unix System Files
Category: Programming
Tags: Computer Science, OS, Linux, Unix
Date: 2017-03-06

# `/etc/passwd`

Contains user informations. The information fields are separated by a colon.

`user-name:password:UID:GID:info:home-dir:shell`

- `user-name`: The name that the user needs to log in.
- `password`: Usually the entry `x`, meaning that the password is saved in `/etc/shadow`.
- `UID`: The user-id (usually greater than 1000).
- `GID`: The group-id.
- `info`: Additional information such as the real name. Subfields separated by coma.
- `home-dir`: The home dir of the user.
- `shell`: The login-shell of the user (needs to be listed in `/etc/shells`).


# `/etc/shadow`

Saves the user password and related information. The file can be read only by root.

`name:password:DOC:minDay:maxDay:warn:deaktIn:deaktSince:unused`

- `name`: User name (same as in `/etc/passwd`).
- `password`: Encrypted password.
- `DOC`: Day of last change (number of days since 1.1.1970).
- `minDay`: Earliest possible day to change password.
- `maxDay`: Latest possible day to change password.
- `warn`: Number of days before `maxDay` that a warning occures.
- `deaktIn`: Day when password expires.
- `deaktSince`: Number of days since password expired.
- `unused`: For feature use.


# `/etc/group`

Stores informations about groups.

`groupName:password:groupId:member1,memger2,...`


- `groupName`: Name of the group.
- `password`: Usually `x`, meaning that the password is saved in `/etc/passwd`.
- `groupId`: Group ID (GID).
- `member1,memger2,...`: User names of the members of the group (comma separated).


# Network Files

- `/etc/services`: Services provided on the network, mapping of ports to processes (see `getservbyname()` and `getservbyport()`).
- `etc/networks`: Informations about connected networks (see `getnetbyname()` and `getnetbyaddr()`)
- `/etc/protocols`: Information about network portocols (see `getprotobyname()` and `getprotobynumber()`)
- `/etc/hosts`: Mapping from hostnames to IP's, mainly replaced by DNS (see `gethostbyname()` and `gethostbyaddr()`)


# `cron` Jobs

- The config file is usually: `/var/spool/cron`
- use `crontab -e` to edit the right file


# Shell


> Work in Progress


## System Settings

| Shell type              | System settings |
|-------------------------|-----------------|
| Interactive Login Shell | `/etc/profile`  |

## User Settings

| Shell type                    | Bourne Shell | Bash                        |
|-------------------------------|--------------|-----------------------------|
| Interactive Login Shell       | `~/.profile` | `~/.bash_profile`           |
| Interactive (Non-Login) Shell |              | `~/bashrc` (or `$BASH_ENV`) |

### Bash

For an *interactive login shell* the Bash searches for profile files in the following order:

1. `~/.bash_profile`
2. `~/.bash_login`
3. `~/.profile`

## References
[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)
[Bash shell startup files](http://cdwilson.us/articles/bash-shell-startup-files/)
[Bash Guide for Beginners](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_01.html)
[Shell-Programmierung](http://openbook.rheinwerk-verlag.de/shell_programmierung/shell_010_008.htm#RxxKap01000804004F0A1F024172)
