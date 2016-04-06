Title: Synchronization Primitives (Read-Modify-Write)
Category: Programming
Tags: Assembler
Date: 2015-03-17
Modified: 2015-03-17

# Read-Modify-Write



## Compare-And-Swap

> Todo

## Load-Link/Store-Conditional

This works:

    :::C
    load_link(R);

    // ...
    
    store_conditional(R,x); // ok!

But this fails:

    :::C
    load_link(R);

    // ...
    
    store_conditional(R,x); // possibly other thread (ok!)

    // ...

    store_conditional(R,x); // fails!

## Test and Set

Pseudo code:

    :::C
    // atomic
    test_and_set(V: mem_address): // V in {0,1}
        tmp := V
        V := 1
        return temp

Reset:

    :::C
    // normal write
    reset(V: mem_address):
        V := 1

## Generic RWM

Pseudo code:

    :::C
    rwm(V: mem_address, f: function) return value
        tmp := V
        V := f(V)
        return tmp


# Mutex (Shared Memory)

- Mainly asynchronous shared memory systems

- read/write: atomic but only either read or write at a time

- Mutex code

<!-- TODO:
 Enter -> Enter
 Enter -> Critical (at most 1 proc)
 Critical -> Exit
 Exit -> Remainder
 Remainder -> Enter

-->

Requirements:

1. At most one process in critical section
2. No deadlocks
    - if there is a process in the entry section then later there is a process (maybe an *other* one) in the critical section
3. No lockout (starving)
    - if there is a process in the entry section then later the *same* process is in the critical section
4. Unobstructed exit
    - no process is stuck in the exit section (no loops...)


General:

- 1 bit suffices for mutex without deadlock
- O(log(n)) bits needed for fairness
