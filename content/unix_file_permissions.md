---
title: Unix File Permissions
category: Programming
tags: [Computer Science, OS, Linux, Unix]
---

# File Access Permissions (POSIX)

$$
\begin{matrix}
\left.\begin{matrix}
400 & r & - & - & - & - & - & - & - & -\\
200 & - & w & - & - & - & - & - & - & -\\
100 & - & - & x & - & - & - & - & - & -
\end{matrix}\right\} \text{Owner permissions}\\
\left.\begin{matrix}
040 & - & - & - & r & - & - & - & - & -\\
020 & - & - & - & - & w & - & - & - & -\\
010 & - & - & - & - & - & x & - & - & -
\end{matrix}\right\} \text{Group permissions}\\
\left.\begin{matrix}
004 & - & - & - & - & - & - & r & - & -\\
002 & - & - & - & - & - & - & - & w & -\\
001 & - & - & - & - & - & - & - & - & x
\end{matrix} \right\} \text{World permissions}
\end{matrix}
$$

# Additional Bits

Three additional bits with special meanings are available:

- `SUID` (4): Change the `UID` of the process to that of the owner of the file when the program is executed (only if file is executable)
- `SGID` (2): Like `SUID`, but change the `GID` of the process to that of the group of the file
- Sticky (1): For directory: restrict deletions so that one user cannot delete files that are owned by another user

SUID is used often. It gives non-root users a temporary privilege as superuser to perform a task (e.g. for `ping` which is owned by `root`).

The sticky bit is usually set on `/tmp` and `/var/tmp`.
