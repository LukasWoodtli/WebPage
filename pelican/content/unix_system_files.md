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

