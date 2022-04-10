---
title: Macro Magic in C and C++
date: 2015-05-15
category: Programming
tags: [C, C++]
---

Macro Tricks
============

Stringification
---------------
The `#` operator allows to create a string out of a macro parameter. With the 'stringize' trick any defined constant can be converted into a string literal.

```c
#define stringize(s) _stringize(s)
#define _stringize(s) #s
#define IMPORTANT_CONST 4
```

If you'd use the 'stringize' operator `#` directly in a macro you won't get the intended string:

```c
_stringize(IMPORTANT_CONST)
```
would lead to:

```c
"IMPORTANT_CONST"
```

That's why there is another macro calling the first one:

```c
stringize(IMPORTANT_CONST)
```

is replaced to:

```c
stringize(4)  
```

which leads to:

```c
_stringize(4)  
```

and finally:

```c
"4"  
```

Concatenation
-------------

With the `##` operator in a preprocessor macro it's possible to combine two tokens.

```c
#define CREATE_ID(name) ID_##name

CREATE_ID(IMPORTANT_THING)
```

```c
ID_IMPORTANT_THING
```


Further Reading
---------------
There is a good explanation in the GCC online docs:
[Macros](https://gcc.gnu.org/onlinedocs/cpp/Macros.html#Macros)
