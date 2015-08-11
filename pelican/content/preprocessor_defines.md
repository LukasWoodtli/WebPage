Title: Preprocessor Defines
Date: 2015-08-1
Category: Programming
Tags: C, C++

Preprocessor Defines
====================

This page lists commonly used preprocessor defines for C/C++


Programming Language
--------------------

| Language | Define        |
|----------|---------------|
| C++      | `__cplusplus` |
| C 99     | `__STDC__`    |


Compiler
--------

| Compiler      | Define      |
|---------------|-------------|
| GNU           | `__GNUC__`  |
| Visual Studio | `_MSC_VER_` |


Processor
---------

| Processor      | Defines                           |
|----------------|-----------------------------------|
| x86            |`_M_IX86`, `__INTEL__`, `__i386__` |
| x86-64         |`_M_X64`, `__x86_64__`             |
| IA64           |`_IA64__`                          |


Endianness
----------

| Byte Order      | Define              |
|-----------------|--- -----------------|
| Little Endian   | `__LITTLE_ENDIAN__` |
| Big Endian      | `__BIG_ENDIAN__`    |


OS
--

| OS              | Defines                               |
|-----------------|---------------------------------------|
| Windows 32 bit  | `_WIN32`, `__WINDOWS__`               |
| Windows 64 bit  | `_WIN64`, `_WIN32`                    |
| Linux 32 bit    | `__unix__`, `__linux__`               |
| Linux 64 bit    | `__unix__`, `__linux__`, `__LP64__`   |
| BSD             | `__unix__`, `__BSD__`, `__FREEBSD__`  |
| OS X            | `__APPLE__`, `__DARWIN__`, `__MACH__` |


Debugging
---------

| Purpose                  | Defines  |
|--------------------------|----------|
| Visual Studio Debug Code | `_DEBUG` |
| Disable assert()         | `NDEBUG` |


Qt
==

Qt has it's own preprocessor defines: [Global Qt Declarations](http://doc.qt.io/qt-5/qtglobal.html)

Endianness
----------


| Byte Order    | Define            |
|---------------|-------------------|
| Little Endian | `Q_LITTLE_ENDIAN` |
| Big Endian    | `Q_BIG_ENDIAN`    |

`Q_BYTE_ORDER` is set to either `Q_LITTLE_ENDIAN` or `Q_BIG_ENDIAN`.

Compiler
--------

| Compiler                                       | Define      |
|------------------------------------------------|-------------|
| GNU C++ (and clang?)                           | `Q_CC_GNU`  |
| Microsoft Visual C/C++ or Intel C++ for Windows| `Q_CC_MSVC` |
| Intel C++ (Linux, Windows)                     | `Q_CC_INTEL`|

There are a lot more defines for different compilers.

OS
--
| OS                                          | Define         |
|---------------------------------------------|----------------|
| Android                                      `Q_OS_ANDROID`  |
| BSD 4.4                                      `Q_OS_BSD4`     |
| Cygwin                                       `Q_OS_CYGWIN`   |
| OS X, iOS, Darwin                            `Q_OS_DARWIN`   |
| FreeBSD                                      `Q_OS_FREEBSD`  |
| iOS                                          `Q_OS_IOS`      |
| Linux                                        `Q_OS_LINUX`    |
| OS X, iOS (not OSS Darwin)                   `Q_OS_MAC`      |
| NetDSB                                       `Q_OS_NETBSD`   |
| OpenDSB                                      `Q_OS_OPENBSD`  |
| OS X                                         `Q_OS_OSX`      |
| QNX Neutrino                                 `Q_OS_QNX`      |
| Any UNIX BSD/SYSV system                     `Q_OS_UNIX`     |
| 32-bit and 64-bit Windows (not Windows CE)   `Q_OS_WIN32`    |
| 64-bit Windows                               `Q_OS_WIN64`    |
| All supported Windows                        `Q_OS_WIN`      |
| Windows CE                                   `Q_OS_WINCE`    |
| Windows Phone 8                              `Q_OS_WINPHONE` |
| Windows Runtime                              `Q_OS_WINRT`    |


There are a lot more defines for supported OS's by Qt.

Processors
----------

| Processor                      | Defines                                                         |
|--------------------------------|-----------------------------------------------------------------|
| Intel x86 (32-bit, 64-bit)     | `Q_PROCESSOR_X86`                                               |
| Intel x86 (32-bit)             | `Q_PROCESSOR_X86_32`                                            |
| Intel x86 (64-bit)             | `Q_PROCESSOR_X86_64`                                            |
| Inel IA64 (Itanium, Itanium 2) | `Q_PROCESSOR_IA64`                                              |
| ARM (V5, V6, V7)               | `Q_PROCESSOR_ARM` (defined on all ARM architectures)            |
| ARMv5                          | `Q_PROCESSOR_ARM_V5`                                            |
| ARMv6                          | `Q_PROCESSOR_ARM_V6`, `Q_PROCESSOR_ARM_V5`                      |
| ARMv7                          | `Q_QPROCESSOR_ARM_V7, `Q_PROCESSOR_ARM_V6`, `Q_PROCESSOR_ARM_V5`|
| AVR 32                         | `Q_PROCESSOR_AVR32`                                             |

There are a lot more defines for supported processors by Qt.
