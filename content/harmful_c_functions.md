Title: Harmful C Functions and their replacements
Category: Programming
Tags: C, C++

[TOC]

# Pre- and postfixes for printf and scanf

There are quite a lot of functions in the `printf` and scanff amily. It might not be very clear when to use which of them.

Here is an explanation of the functions in the *Standard C Library*.

## Prefixes

Most prefixed define where the function reads (`scanf`) or wirtes (`printf`) data from or to:

- *no prefix*: use `STDIN` or `STDOUT`
- `f`: use a `FILE` stream
- `s`: use a `char` buffer (string)
- `sn`: same as s but checks for buffer size (only `printf`)
- `v`: takes a `va_list` instead `...` (ellipsis), can be combined with the other prefixes

## Postfix

The C11 standard introduced addtional functions with the `_s` postfix which do some checks on the data.

## Overview

### Output

So we get following `printf`-like functions:

| Output                 | ellipsis                   | va_list                     |
|------------------------|----------------------------|-----------------------------|
| `STDOUT`               | `printf`(`_s`)             | `vprintf`(`_s`)             |
| file                   | `fprintf(`_s`)`            | `vfprintf`(`_s`)            |
| char buffer            | <del>`sprintf`</del>(`_s`) | <del>`vsprintf`</del>(`_s`) |
| char buffer with size  | `snprintf`(`_s`)           | `vsnprintf`(`_s`)           |


The functions with `_s` postfix should be preferred if available (C11).

The `sprintf` and `vsprintf` functions should not be used since the can result in stack overflow. They are also
suffer from string vulnerability.

Use `snpritf` or `vsnprintf` instead. If possible with `_s` postfix.

And force null-termination manually [^1].

### Input

And we get following `scanf`-like functions:

| Input                  | ellipsis                  | va_list                    |
|------------------------|---------------------------|----------------------------|
| `STDIN`                | `scanf`(`_s`)             | `vscanf`(`_s`)             |
| file                   | `fscanf`(`_s`)            | `vfscanf`(`_s`)            |
| char buffer            | `sscanf`(`_s`)            | `vsscanf`(`_s`)            |


The functions with `_s` postfix should be preferred if available (C11).

And force null-termination manually [^1].

# OpenBSD

The OpenBSD kernel library defines some additional functions that are safer than their counterparts in the standard library.

|                                 | C standard library | OpenBSD kernellibrary |
|---------------------------------|--------------------|-----------------------|
| Copying string                  | `strcpy`           | `strlcpy`             |
| Applying (concatenating) string | `strcat`           | `strlcat`             |


# Replacements

These C functions suffer buffer overflow problems:

| Original    | Replacement                  |
|-------------|------------------------------|
| `gets()`    | `fgets()`                    |
| `cuserid()` | `getlogin()` or `getpwuid()` |
| `scanf()` family | See [^2] and [^3], use functions with `_s`postfix (C11) |
| `sprintf()` | `snprintf()`, use functions with `_s`postfix (C11)  |
| `vsprintf()`| `vsnprintf()`, use functions with `_s`postfix (C11) |
| `strcat()`  | `strncat()`                  |
| `strcpy()`  | `strncpy()`                  |
| `streadd()`, `strtrns()`, `strecpy()` ...| Check lengths of buffers or use standard library functions |
| `getwd()`   | `getcwd()`                   |

See also [^4]

# References

[^1]: [randomascii.wordpress.com](http://randomascii.wordpress.com/2013/04/03/stop-using-strncpy-already/)
[^2]: [stackoverflow.com](https://stackoverflow.com/questions/1621394/how-to-prevent-scanf-causing-a-buffer-overflow-in-c)
[^3]: [stackoverflow.com](https://stackoverflow.com/questions/9245682/in-c-what-is-a-safe-alternative-to-sscanf)
[^4]: [stackoverflow.com](http://stackoverflow.com/questions/1253053/cs-bad-functions-vs-their-good-alternatives)
