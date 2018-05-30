Title: Macro Magic in C and C++
Date: 2015-05-15
Category: Programming
Tags: C, C++


Macro Tricks
============

Stringification
---------------
The `#` operator allows to create a string out of a macro parameter. With the stringize trick any defined constant can be converted into a string literal.

    :::C
    #define stringize(s) _stringize(s)
    #define _stringize(s) #s
    #define IMPORTANT_CONST 23

If you'd use the stingize operator `#` directly in a macro you won't get the intended string:

    :::C
    _stringize(IMPORTANT_CONST)

> "IMPORTANT_CONST"

Thats why there is an other macro calling the first one:

     stringize (IMPORTANT_CONST)

> stringize(4)  

> _stringize(4)  

> "4"  

Concatenation
-------------

With the `##` operator in a preprocessor macro it's possible to combine two tokens.

    :::C
    #define CREATE_ID(name) ID_##name
    
    CREATE_ID(IMPORTANT_THING)

> ID_IMPORTANT_THING


Further Reading
---------------
There is a good explanation in the GCC online docs:
[Macros](https://gcc.gnu.org/onlinedocs/cpp/Macros.html#Macros)


