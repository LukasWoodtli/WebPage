Title: Enums in C and C++
Date: 2015-04-16

Enums in C and C++ are a very simple construct. It’s just a collection of identifiers that have (usually) distinctive values. 
By default the values increase by one in the stated order. But the values can defined by the programmer.
Even if enums are a simple language construct there are special precautions that need to be taken when using them:

- Is a enum continuous (i.e. can I iterate over it?)
- Have the enum values meaning outside of my software or module
- what is the size (in Bytes) of an enum variable

Iterating over enums
====================

Be careful if you iterate over an enum. If the enum is not continuously defined your code is probably doing some things you don’t want it to do.
For exampe:

    :::c
    typedef enum
    {
      VAL_1 = 10,
      VAL_2 = 15,
      VAL_3 = 20,
      VAL_NB
    } my_enum_t;
    
    int main()
    {
      int enum_var;
      for (enum_var = VAL_1; enum_var < VAL_NB; ++enum_var)
      {
        printf("%i\n",enum_var);
      }
    }

`printf` is called 11 times with the values 10 to 20. That’s usually not what we want.

So what is the solution? Don’t iterate over enums that have fixed values assigned. If you have to do it there is a trick calles **X Macros** 
that I’ll cover in another post.

There is one exception. You can assign a value to the first enum type:

    :::c
    typedef enum
    {
        VAL_1 = 10,
        VAL_2,
        VAL_3,
        VAL_NB
    } my_enum_t;

If you call the same loop as above you’ll get calls to `printf` with the values:

> 10 (VAL_1), 11 (VAL_2) and 12 (VAL_3).


Enums with fixed values
=======================
If you don’t need to iterate over your enum it’s usually a good practice to assign a defined value to your enum fields. This is even mandatory if your enum has a meaning across your software (or module) or even different versions of the same software. Add defined values to your enums if:

- the value can be saved to a file
- the value is sent (or received) over a physical interface
- the value is needed in an other software (or library…) or a different version of the same software (i. e. feature release)

But if you do so, don’t iterate over your enum!

If you serialize/deserialize your values (i.e. save into a file, send over an interface) be careful about the enum size and the endianness of 
the used platform.

Size and endianness
===================
The size (and endianness) of a enum variable depends on the compiler and on the target platform. So if you write platform independent code (and you should always do that) take care of this.
There are some language extension in different compilers to address this topic. For example in Visual Studio:

    :::c
    typedef enum : uint8_t
    { VAL_1, VAL2, /* … */, VAL_NB} my_enum_t;

For platform independent code you can do: `#define ENUM_AS_UINT8 : uint8_t`

Romable values
==============
Another use of enums is mainly used in embedded systems development. In embedded systems you are often concerned that a constant is stored in the program flash. Otherwise it has to be loaded from RAM at runtime (and even stored there at start time). The usual way is to use defines. 
But they are not really type safe. So for int-types it’s possible to use enums. If your compiler(s) support it you can even use anonymous enums.

Advanced enum constructs (C++11, Qt)
====================================
C++11 introduces the enum class. And Qt some extensions for enums (Q_ENUMS) that I’ll not cover here. If you can use one of this advanced enum construct then do it!

Conclusion
==========
- If you have to iterate over your enum: don’t add explicit values to your enum, but add and {identifier}_NB value to the end (or something similar) to check when the iteration is finished
- If your enum value is meaningful (serialization…): assign a defined value and take care about endianness and size of the enum variables
- Use (anonymous) enums to make values Romable
- Use an advanced enum type (C++11, Qt) if you can
- If you need fixed enum values and you want to iterate over the values you need two enums. Use X Macros for it (there is going to be a feature post on that)

References
==========
[http://en.wikipedia.org/wiki/Endianness]  
[http://stackoverflow.com/questions/7147008/the-usage-of-anonymous-enums]  
