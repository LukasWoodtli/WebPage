Title: Sanitizers
Category: Programming
Tags: C, C++, Dynamic Analysis
Date: 2018-03-05

# Sanitizers

## Address Sanitizer (and Leak Sanitizer)

Compile and link with the flag `-fsanitize=address`
It might be necessary to link with `-lasan` with older gcc/ld versions.


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


### Help and Debugging

It's possible to print debug information when using the sanitizer. Also the verbosity
of any output can be increased.

`ASAN_OPTIONS="verbosity=2:debug=1:help=1"`

For getting help 

`ASAN_OPTIONS="help=1"`
