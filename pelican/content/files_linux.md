Title: Files and File descriptors on Linux
Category: Programming
Tags: Computer Science, OS, Linux
Date: 2016-06-03
Modified: 2016-06-03


Files on Linux

Some information on this page is taken from [here](http://openbook.rheinwerk-verlag.de/linux_unix_programmierung/Kap02-001.htm) (German).

[Here](http://www.usna.edu/Users/cs/aviv/classes/ic221/s15/lec/21/lec.html) is another good resource (English).

# Process Control Block (PCB)

Contains the information about a process.

- C struct `task_struct`
- Pointer to code section (text)
- Pointer to data section
- State: running, ready, blocked, terminated
- Instruction pointer (IP): next instruction to execute
- Saved registers
- Memory information: pages
- Scheduler information
    - Priority
    - Pointer to scheduler queue
- Table with open file descriptors hold by this process

# File Table
- 1 entry for each open file
- different processes can point to the same entry
- Entry:
    - number of i-nodes
    - position pointer
    - mode (read, write, append...)
    - pointer to v-node table

# v-node Table

- i-node information
    - copied to v-node table when file is opened
    - owner
    - rights
    - user/group ids
    - number of links
- file information
- file size
- functions (file system dependent)

# File Descriptors

File descriptors are unique ID's (ints) that identify an open file.

3 descriptors are reserved by the system in `<unistd.h>`:

| Constant      | Number | Meaning         |
|---------------|--------|-----------------|
| STDIN_FILENO  | 0      | Standard input  |
| STDOUT_FILENO | 1 	 | Standard output |
| STDERR_FILENO | 2 	 | Standard error  |

The number can differ but the given ones are common.

Functions that return a file descriptor (e.g. `open(...)`or `creat(...)`) return `-1` if en error occurred.

# File Types

There are 6 different file types in Linux:

- Regular files
- Directories
- Device files
- Sockets
- Pipes (named Pipes and FIFOs)
- Links (Soft- and Hardlinks)


