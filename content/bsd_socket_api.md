---
title: BSD Socket API
category: Programming
tags: [Computer Science, OS, Linux]
date: 2025-05-12
---

![Socket Sequence Diagram](/images/bsd_socket_api/bsd_socket_api.png)

# Functions

- `socket()`: Create socket descriptor
- `bind()`: Associate socket with a local IP address and port
- `listen()`: Put connection-oriented socket in waiting mode
- `accept()`: Wait for next connection from client
- `connect()`: Connect from client to server
- `read()`, `recv()`, `recvfrom()`, `recvmsg()`: Read requests
- `write()`, `send()`, `sendto()`, `sendmsg()`: Write response
- `close()`: Close network connection
- `shutdown()`: Close (half-close) network connection
- `getsockopt()`, `setsockopt()`: Get and change socket settings

Inspired by [Stack Overflow](https://stackoverflow.com/a/27017691)
