Title: Arrays in C and C++
Category: Programming
Tags: C, C++
Date: 2015-07-15
Modified: 2015-07-15

Arrays are simple but quite powerful constructs in C/C++.
They are merely a representation of consecutive data in memory.

They don't contain any meta data (like size). But since they are
stored in memory in such a simple manner processors can handle
them very efficiently.

    :::cpp
    //     rows  columns
    //        |  |   
    //        v  v   
    char data[3][2]={{0,1},
                     {2,3},
                    {4,5}};

The values of the array `data` are stored row for row in memory:

> 0,1,2,3,4,5

An other possibility to see it is that multi-dimensional arrays in
C/C++ are arrays of arrays.

So `data` is like an array (with size *3*) of arrays of char (with size *2*).

[Here](http://stackoverflow.com/a/2565310) is a good explanation.

The same applies to more than 2 dimensions:

    :::cpp
    //     rows  columns
    //        |  |   
    //        v  v   
    char data[2][3]={{0,1},
                     {2,3},
                    {4,5}};
