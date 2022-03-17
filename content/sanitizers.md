---
title: Sanitizers
category: Programming
tags: [C, C++, Dynamic Analysis]
date: 2018-03-05
---
[TOC]

# Sanitizers

## Address Sanitizer (and Leak Sanitizer)

Compile and link with the flag `-fsanitize=address`
It might be necessary to link with `-lasan` with older gcc/ld versions.

When linking shared libraries (dso's) the sanitizer run-time library (`libasan.so`) is not linked. This hapens only when executables are linked.
It can lead to problems with some linker flags. For example `-Wl,--no-undefined` or `-Wl,-z,defs` don't work with with sanitizer because the compiler
adds sanatizer related code into object files but the linker does not link the run-time library (leading to linker errors due to undefined symbols).

To solve this problem either don't use the mentioned linker flags or compile only files needed in executables (and not in shared libraries) with the sanatizer flag.

### Run-time flags

Flags for the sanitizers can be provided with the `ASAN_OPTIONS` and `LSAN_OPTIONS` environment variables. They take a colon (`:`) separated list and should be exported in the environment, before running a sanatized executable.

### Leak Sanitizer and Additional Checks

The Leak Sanitizer can be enabled in ASan by setting `ASAN_OPTIONS=detect_leaks=1`. This is not needed on Linux as it is enabled by default.

Find dynamic initialization order problems (only on Linux):
`ASAN_OPTIONS=check_initialization_order=1`

To find memory use after return add `ASAN_OPTIONS=detect_stack_use_after_return=1`.

To check for memory use after scope the compiler flag (not runtime oprion) `-fsanitize-address-use-after-scope` can be used.


### Symbolizing output

To see nice call stacks with readable symbols when the sanitizer finds a problem a symbolizer might be needed.

Add this to the sanitizer runtime flags:

`ASAN_OPTIONS=symbolize=1`

and the path to the symbolizer

`ASAN_SYMBOLIZER_PATH=/usr/local/bin/llvm-symbolizer`

also the compiler flag to not omit the frame pointer can help: `-fno-omit-frame-pointer`

### Preloading

In some cases the sanitizer library needs to be preloaded to an executable. Especially if other libraries are preloaded. Then the sanitizer library needs to be first in the list of preloaded libraries:

`LD_PRELOAD=libasan.so.3:libmylib.dso:$LD_PRELOAD ./myexecutable`

Note that the version of the sanitizer library (e.g. `libasan.so.3`) needs to be provided if there is no symbolic link `libasan.so` that points to the right version.

To find out the right library name (and the path) one can run
`ldd path/to/an/executable | grep libasan`
on an executable that was built with the `-fsanitize=address` flag

For debugging problems with `LD_PRELOAD` setting the environment variable `LD_DEBUG=libs` might help. It shows which DSO is loaded from which directory and the order of loading the DSO's.

### Custom Signal Handlers

If an executable uses custom signal handlers then the signal handlers of ASan need to be disabled:

`ASAN_OPTIONS="allow_user_segv_handler=1:handle_segv=0:handle_abort=0:handle_sigfpe=0"`

### Suppressions

To suppress detection of concrete leaks foud by LSan a suppression file can be provided

`LSAN_OPTIONS="suppressions=$(realpath lsan_suppressions.txt)"`

Example of `lsan_suppressions.txt`

    :::
    leak:FooBar
    leak:libmylibrary.so
    leak:myexecutable

There is also a similar suppression mechanism for ASan.

### Virtual Memory Max Map Count

When out of memory errors occur when using the address sanatizer it can be of help to increase
the number of virtual memory maps that a process can have.

    :::bash
    sysctl -w vm.max_map_count=1000000

The number of maps needs to be adjusted per use case (just experiment).

The setting is also available at `/proc/sys/vm/max_map_count`

See also: [Elasticsearch: Virtual memory](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)

### Docker

To run an sanitized executable in a docker container the argument `--cap-add SYS_PTRACE` needs to be added to the `docker run` command.

### Help and Debugging

It's possible to print debug information when using the sanitizer. Also the verbosity
of any output can be increased.

`ASAN_OPTIONS="verbosity=2:debug=1:help=1"`

For getting help 

`ASAN_OPTIONS="help=1"`
