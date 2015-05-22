Title: Harmful C Functions and their replacements
Date: 2015-04-17
Category: Programming
Tags: C, C++
Status: draft


printf and the prefixes
=======================
The `printf` family of function are quite ...

* f: print to a `FILE` stream
* s: print to a  `char` buffer (string)
* sn: same as s but checks for buffer size
* v: takes a `va_list` istead `...`(ellipsis), can be combined with the other prefixes

So we get following functions

|                        | ellipsis             | va_list               |
|------------------------|----------------------|-----------------------|
| stdout                 | `printf`             | `vprintf`             |
| file                   | `fprintf`            | `vfprintf`            |
| char buffer            | <del>`sprintf`</del> | <del>`vsprintf`</del> |
| char buffer with size  | `snprintf`           | `vsnprintf`           |


OpenBSD
=======
The OpenBSD kernel library defines some additional functions that are safer than their counterparts in the standard library.

|                                 | C standard library | OpenBSD kernel library |
|---------------------------------|--------------------|------------------------|
| Copying string                  | strcpy             | strlcpy                |
| Applying (concatenating) string | strcat             | strlcat                |


C Std Library
=============

Buffer Overflows
----------------

15 C functions suffer buffer overflow problems:

| Original    | Replacement               | Problem   | Relevant in Embedded |
|-------------|---------------------------|-----------|:--------------------:|
| `gets`      | fgets()                   |           |         no           |
| cuserid()   | getlogin() or getpwuid()  |           |  Only Unix/Linux     |
| scanf()     |                           |           |                      |
| fscanf()    |                           |           |                      |
| sscanf()    |                           |           |                      |
| vscanf()    |                           |           |                      |
| vsscanf()   |                           |           |                      |
| vfscanf()   |                           |           |                      |
| sprintf()   |                           |           |                      |
| strcat()    |                           |           |                      |
| strcpy()    |                           |           |                      |
| streadd()   |                           |           |                      |
| strecpy()   |                           |           |                      |
| vsprintf()  |                           |           |                      |
| strtrns()   |                           |           |                      |


String Vulnerabilities
----------------------
8 C functions suffer from format string vulnerabilities:

| Original    | Replacement   | Problem   | Relevant in Embedded |
|-------------|---------------|-----------|:--------------------:|
| printf()    |               |           |                      |
| fprintf()   |               |           |                      |
| sprintf()   |               |           |                      |
| snprintf()  |               |           |                      |
| vprintf()   |               |           |                      |
| vfprintf()  |               |           |                      |
| vsprintf()  |               |           |                      |
| vsnprintf() |               |           |                      |
                                                                 
                                                                 

http://faq.cprogramming.com/cgi-bin/smartfaq.cgi?answer=1044652485&id=1043284385



References:

Functions:

http://randomascii.wordpress.com/2013/04/03/stop-using-strncpy-already/

http://stackoverflow.com/questions/1253053/cs-bad-functions-vs-their-good-alternatives

https://www.securecoding.cert.org/confluence/plugins/servlet/mobile#content/view/32047151

http://johnwilander.se/research_publications/licentiate_thesis.pdf

GCC:

http://blog.leafsr.com/2013/12/02/gcc-poison/

Visual Studio:

http://www.microsoft.com/en-us/download/details.aspx?id=24817

OpenBSD:
http://www.openbsd.org/cgi-bin/man.cgi?query=strlcat






memcpy


Function


Compiler


Notes

memcpy_s


Visual Studio


Checks if dest buffer has space for copying.
