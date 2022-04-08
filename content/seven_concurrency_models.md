---
title: Seven Concurrency Models in Seven Weeks
category: Programming
tags: [Computer Science, Design Patterns, Lisp, OOP, OS]
---

This page collects notes taken from
[Seven Concurrency Models in Seven Weeks When Threads Unravel by Paul Butcher](https://pragprog.com/book/pb7con/seven-concurrency-models-in-seven-weeks)

Some of my examples are [here](https://github.com/LukasWoodtli/SevenConcurrencyModelsInSevenWeeks)

[TOC]

# Chapter 1 Introduction

## Concurrent or Parallel?

### Related but Different

*"A concurrent program has multiple logical threads of control. These threads may or may not run in parallel."*

*"A parallel program potentially runs more quickly than a sequential program by executing different parts of the computation simultaneously (in parallel). It may or may not have more than one logical thread of control."*

*"[...] concurrency is an aspect of the problem domain — your program needs to handle multiple simultaneous (or near-simultaneous) events."*

*"Parallelism [...] is an aspect of the solution domain — you want to make your program faster by processing different portions of the problem in parallel."*

*"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."*


### Beyond Sequencial Programming

*"[...] traditional threads and locks don't provide any direct support for parallelism."*

*"[...] concurrent programs are often nondetermistic - they will give different results depending on the precise timing of events."*

*"Parallelism [...] doesn't necessarily imply nondetermism"*


### Data Parallelism

*"Data-parallel (sometimes called SIMD [...]) architectures are capable of performing the same operations on a large quantity of data in parallel."*

# Chapter 2 Threads and Locks

## The Simplest Thing That Could Possibly Work

*"[Threads] also provide almost no help to the poor programmer, making programs very difficult to get right in the first place and even more difficult to maintain."*


## Day 1: Mutual Exclusion and Memory Models

*"[There is something very] basic you need to worry about when dealing with shared memory - the Memory Model."*

### Creating a Thread

*"Threads communicate with each other via shared memory."*

### Mysterious Memory

- *"The compiler is allowed to statically optimize your code by reordering things."*
- *"The JVM is allowed to dynamically optimize your code by reordering things."*
- *"The hardware you're running on is allowed to optimize performance by reordering things."*

*"Sometimes effects don't become visible to other threads at all."*

### Memory Visibility

*"The Java memory model defines when changes to memory made by one thread become visible to another thread.""*

*"An important point that's easily missed is that both threads need to use synchronization. It's not enough for just the thread making changes to do so."*

### Multiple Locks

*"Deadlock is a danger whenever a thread tries to hold more than one lock. Happily, there is a simple rule that guarantees you will never deadlock - always acquire locks in a fixed, global order."*


### The Perils of Alien Methods

*"avoid calling alien methods while holding a lock"*


### Day 1 Wrap Up

*"[...] three primary perils of threads and locks - race conditions, deadlock and memory visibility [...]
rules that help us avoiding them:"*

- *"Synchronize all access to shared variables."*
- *Both the writing and the reading threads need to use synchronization."*
- *Acquire multiple locks in a fixed, global order."*
- *Don't call alien methods while holding a lock."*
- *Hold locks for the shortest possible amount of time."*


## Day 2: Beyond Intrinsic Locks

*"Intrinsic locks are convenient but limited."*

- *"There is no way to interrupt a thread that's blocked as a result of trying to acquire an intrinsic lock."*
- *"There is no way to time out while trying to acquire an intrinsic lock."*
- *"There's exactly one way to acquire an intrinsic lock: a synchronized block."*

Synchronized block:

    :::java
    synchronized ​(object) {    
      // use shared resources
    } 

*"This means that lock acquisition and release have to take place in the same method and have to be strictly nested."*

*"Note that declaring a method as `synchronized` is just syntactic sugar for surrounding the method's body with the following:"*

    :::java
    ​synchronized ​(this) {​ 
        // method body
    }

*"ReentrantLock allows us to transcend these restrictions by providing explicit lock and unlock methods instead of using synchronized ."*

    :::java
    ​Lock ​lock = ​new ReentrantLock ​();
    lock.lock();
    try ​{
        // use shared resources​ 
    } finally {
        lock.unlock();
    }

### Hand-over-Hand Locking

*"Hand-over-hand locking is an alternative in which we lock only a small portion of the list, allowing other threads unfettered access as long as they're not looking at the particular nodes we've got locked."*


### Condition Variables

*"Concurrent programming often involves waiting for something to happen. [...] This type of situation is what condition variables are designed to address."*

    :::java
    ​ReentrantLock lock = new ReentrantLock ​();
    Condition condition = lock.newCondition();
    
    lock.lock();
    try {
        while (!condition is true)
            condition.await();
        // use shared resources
    } finally {
        lock.unlock();
    }


*"A condition variable is associated with a lock, and a thread must hold that lock before being able to wait on the condition. Once it holds the lock, it checks to see if the condition that it's interested in is already true. If it is, then it continues with whatever it wants to do and unlocks the lock. If, however, the condition is not true, it calls `await`, which **atomically** unlocks the lock and blocks on the condition variable."*

*"An operation is atomic if, from the point of view of another thread, it appears to be a single operation that has either happened or not - it never appears to be halfway through."*


*"When another thread calls `signal` or `signalAll` [on the condition variable] to indicate that the condition might now be true, `await` unblocks and automatically reacquires the lock. An important point is that when `await` returns, it only indicates that the condition might be true. This is why `await` is called within a loop - we need to go back, recheck whether the condition is true, and potentially block on `await` again if necessary."*

### Atomic Variables

*"Using an atomic variable instead of locks has a number of benefits. First, it's not possible to forget to acquire the lock when necessary."*

*"Second, because no locks are involved, it's impossible for an operation on an atomic variable to deadlock."*

*"atomic variables are the foundation of non-blocking, lock-free algorithms, which achieve synchronization without locks or blocking."*

> *If you think that programming with locks is tricky, then just wait until you try writing lock-free code.*

#### What About Volatile?

*"Java allows us to mark a variable as `volatile`. Doing so guarantees that reads and writes to that variable will not be reordered."*

*"valid use cases for `volatile` variables are rare. If you find yourself considering `volatile`, you should probably use one of the `java.util.concurrent.atomic` classes instead."*

In C++ `volatile` has a different meaning. It indicates that the read of a variable is not allowed to be optimized out. This is important for reading memory mapped I/O or memory mapped registers and similar use cases.

### Day 2 Wrap-Up

*"[With `ReentrantLock` and `java.util.concurrent.atomic`] threads can do the following:*

- *"Be interrupted while trying to acquire a lock"*
- *"Time out while acquiring a lock"*
- *"Acquire and release locks in any order [Danger! Dead locks!]"*
- *"Use condition variables to wait for arbitrary conditions to become true"*
- *"Avoid locks entirely by using atomic variables"*

## Day 3: On the Shoulders of Giants

#### How Large Should My Thread Pool Be? 

*"The optimum number of threads will vary according to the hardware [...], whether your threads are IO or CPU bound, what else the machine is doing at the same time, and a host of other factors. [...] a good rule of thumb is that for computation-intensive tasks, [to have] approximately the same number of threads as available cores. Larger numbers are appropriate for IO-intensive tasks. Beyond this rule of thumb, your best bet is to create a realistic load test and break out the stopwatch."*

#### Why a Blocking Queue?

*"As well as blocking queues, `java.util.concurrent` provides `ConcurrentLinkedQueue`, an unbounded, wait-free, and nonblocking queue. That sounds like a very desirable set of attributes [for the producer-consumer pattern]. The issue is that [...] if the producer runs faster than the consumer, the queue will get larger and larger."*

*"The beauty of the producer-consumer pattern is that it allows us not only to produce and consume values in parallel, but also to have multiple producers and/or multiple consumers."*

*"Unfortunately, synchronized collections don't provide atomic read-modify-write methods, so this isn't going to help us. If we want to use a `HashMap`, we're going to have to synchronize access to it ourselves."*

*"Happily, we're not beaten yet. `ConcurrentHashMap` in `java.util.concurrent` looks like exactly what we need. Not only does it provide atomic read-modify-write methods, but it's been designed to support high levels of concurrent access (via a technique called lock striping)."*

*"Instead of put, we're now using a combination of `putIfAbsent` and `replace`."*

*"Here's the documentation for `putIfAbsent`: If the specified key is not already associated with a value, associate it with the given value. This is equivalent to"*

    :::java
    if (!map.containsKey(key))
        return map.put(key, value);
    else
        return ​ map.get(key);

*"except that the action is performed atomically."*

*"And for `replace`: Replaces the entry for a key only if currently mapped to a given value. This is equivalent to"*

    :::java
    if (map.containsKey(key) && map.get(key).equals(oldValue)) {
        map.put(key, newValue);
        return true;
    } else
        return false;
        
*"except that the action is performed atomically."*


### Day 3 Wrap-Up

#### What We Learned in Day 3

*"the facilities provided by `java.util.concurrent` [make] programs safer and more efficient by doing the following:"*

- *"Using thread pools instead of creating threads directly"*
- *"Creating simpler and more efficient listener-management code with `CopyOnWriteArrayList`"*
- *"Allowing producers and consumers to communicate efficiently with `ArrayBlockingQueue`"*
- *"Supporting highly concurrent access to a map with `ConcurrentHashMap`"*

### Wrap-Up

#### Weaknesses

*"Threads and locks provide no direct support for parallelism [...] they can be used to parallelize a sequential algorithm, but this has to be constructed out of concurrent primitives, which introduces the specter of nondeterminism."*

*"threads and locks support only shared-memory architectures. If you need to support distributed memory (and, by extension, either geographical distribution or resilience), you will need to look elsewhere."*

#### The Elephant in the Room

*"[...] what makes multithreaded programming difficult is not that writing it is hard, but that **testing it is hard**. It's not the pitfalls that you can fall into; it's the fact that you don't necessarily know whether you've fallen into one of them."*

#### Maintenance

*"It's one thing to make sure that everything's synchronized correctly, locks are acquired in the right order, and no foreign functions are called with locks held. It's quite another to guarantee that it will remain that way after twelve months of maintenance by ten different programmers."*

*"if you can't reliably test for threading problems, you can't reliably refactor multithreaded code."*

*"think very carefully about our multithreaded code. And then when we've done that, think about it very carefully some more."*

#### Other Languages

*"the general principles we covered in this chapter are broadly applicable. The rules about using synchronization to access shared variables; acquiring locks in a fixed, global order; and avoiding alien method calls while holding a lock are applicable to any language with threads and locks."*

*"a memory model was added to the C11 and C++ 11 standards."*

### Additional Notes

#### Race Condition

A race condition is the behavior of a software system where the output is dependent on the sequence or timing of other uncontrollable events. It becomes a bug when events do not happen in the order the programmer intended.

#### Memory Visibility

The memory model defines when changes to memory made by one thread become visible to another thread.

#### Deadlocks & Livelocks

Deadlock is a danger whenever a thread tries to hold more than one lock. 
Happily, there is a simple rule that guarantees you will never deadlock - always acquire locks in a fixed, global order.


# Chapter 3 Functional Programming

*"In contrast to an imperative program, which consists of a series of statements that change global state when executed, a **functional program** models computation as the evaluation of expressions. Those expressions are built from pure mathematical functions that are both first-class (can be manipulated like any other value) and side effect-free. It's particularly useful when dealing with concurrency because the lack of side effects makes reasoning about thread safety much easier."*

## If It Hurts, Stop Doing It

*"Functional programs have no mutable state, so they cannot suffer from any of the problems associated with shared mutable state."*

## Day 1: Programming Without Mutable State

### It's Good to Be Lazy

*"Sequences in Clojure are lazy - elements of a lazy sequence are generated only when they're needed."*

*Realizing* a (lazy) sequence means to fully evaluate it.

*"One final aspect of lazy sequences is that not only do we not need to generate the elements at the end of a sequence until we need them (which might be never), but we can discard the elements at the front if we've finished with them (if we don't "hold on to our head")."*


## Day 2: Functional Parallelism

### Reducers

*"A reducer is a recipe that describes how to reduce a collection. The normal version of `map` takes a function and a (possibly lazy) sequence and returns another (possibly lazy) sequence"*

*"A reducible isn't a directly usable value - it's just something that can subsequently be passed to `reduce` [or `into`, which uses `reduce` internally]"*


*"A reducer [...], returns a recipe for creating a result - a recipe that isn't executed until it's passed to either `reduce` or `fold`. This has two primary benefits:*

- *It's more efficient than a chain of functions returning lazy sequences, because no intermediate sequences need to be created.*
- *It allows fold to parallelize the entire chain of operations on the underlying collection."*


## Day 3: Functional Concurrency

### Same Structure, Different Evaluation Order

*"Functional languages have a much more declarative feel [than OOP or procedual languages (imperative)]."*

### Futures

*"A future takes a body of code and executes it in another thread. Its return value is a future object."*

*"We can retrieve the value of a future by dereferencing it with either `deref` or the shorthand `@`"*

*"Dereferencing a future will block until the value is available (or realized)."*

### Promises

*"A promise is very similar to a future in that it's a value that's realized asynhronously and accessed with `deref` or `@`, which will block until it's realized. The difference is that creating a promise does not cause any code to run - instead its value is set with deliver."*

A promse can be used to pass a result from one thread to another one.


## Wrap-Up

### Weaknesses

*"Many people expect that functional code will be less efficient than its impertive equivalent. Although there are performance implications for some types of problem, the penalty is likely to be less than you fear. And any small performance hit is likely to be more than worth it for the payoff of increased robustness and scalability."*


# Chapter 4 The Clojure Way - Separating Identity from State

## Day 1: Atoms and Persistent Data Structures

### Atoms

*"An atom is an atomic variable [...]  (in fact, Clojure's atoms are built on top of `java.util.concurrent.atomic`)."*

### Persistent Data Structures

*"Persistence in this case doesn't have anything to do with persistence on disk or within a database. Instead it refers to a data structure that always preserves its previous version when it's modified, which allows code to have a consistent view of the data in the face of modifications."*

*"Persistent data structures behave **as though** a complete copy is made each time they're modified."*

*"The implementation is much more clever than that and makes use of structure sharing."*

### Identity or State?

*"Persistent data structures are invaluable for concurrent programming because once a thread has a reference to a data structure, it will see no changes made by any other thread. Persistent data structures separate identity from state."*

*"A variable in an imperative language complects (interweaves, interconnects) identity and state - a single identity can only ever have a single value, making it easy to lose sight of the fact that **the state is really a sequence of values over time**. Persistent data structures separate identity from state - if we retrieve the current state associated with an identity, that state is immutable and unchanging, no matter what happens to the identity from which we retrieved it in the future."*

### Retries

*"Atoms can be lockless - internally they make use of the `compareAndSet` method in `java.util.concurrent.AtomicReference`.
That means that they're very fast and don't block. [...] But it also means that `swap!` needs to handle the case where the value of the atom has been changed by another thread in between it calling the function to generate a new value and it trying to change that value."*

*"If that happens, `swap!` will retry. It will discard the value returned by the function and call it again with the atom's new value. [...] This means that it's essential that the function passed to `swap!` has no side effects"*

### Day 1 Wrap-Up

*"Because functional data structures are persistent, changes made by one thread will not affect a second thread that already has a reference to that data structure."*

*"This allows us to separate identity from state, recognizing the fact that the state associated with an identity is really a sequence of values over time."*

## Day 2: Agents and Software Transactional Memory

### Agents

*"An **agent** is similar to an atom in that it encapsulates a reference to a single value"*

*"If multiple threads call send concurrently, execution of the functions passed to send is serialized: only one will execute at a time. This means that they will not be retried and can therefore contain side effects."*


#### Is an Agent an Actor?

*"An agent has a value that can be retrieved directly with `deref`. An actor encapsulates state but provides no direct means to access it."*

*"An actor encapsulates behavior; an agent does not"*

*"Actors provide sophisticated support for error detection and recovery."*

*"Actors can be remote [distributed]."*

*"Composing actors can deadlock"*


#### Waiting for Agent Actions to Complete

*"Clojure provides the `await` function, which blocks until all actions dispatched from the current thread to the given agent(s) have completed."*


#### Error Handling

*"Like atoms, agents also support both validators and watchers."*

*"Once an agent experiences an error, it enters a **failed** state by default, and attempts to dispatch new actions fail. We can find out if an agent is failed (and if it is, why) with `agent-error`, and we can restart it with `restart-agent`"*


### Software Transactional Memory

*"**Refs** are more sophisticated than atoms and agents, providing software transactional memory (**STM**)"*

#### Transactions

 *"STM transactions are atomic, consistent, and isolated [but not durable]"*

*"Everything within the body of `dosync` constitutes a single transaction."*

#### Multiple Refs

*" If the STM runtime detects that concurrent transactions are trying to make conflicting changes, one or more of the transactions will be retried. This means that, as when modifying an atom, **transactions should not have side effects**."*


#### Safe Side Effects in Transactions

*"Agents are transaction aware"*

*"If you use `send` to modify an agent within a transaction, that send will take place only if the transaction succeeds. Therefore, if you want to achieve some side effect when a transaction succeeds, using `send` is an excellent way to do so."*


#### What's with the Exclamation Marks?

 *"Clojure uses an exclamation mark to indicate that functions [...] are **not transaction-safe**."*

### Shared Mutable State in Clojure

*"An **atom** allows you to make synchronous changes to a single value - synchronous because when `swap!` returns, the update has taken place. Updates to one atom are not coordinated with other updates."*

*"An **agent** allows you to make asynchronous changes to a single value - asynchronous because the update takes place after `send` returns. Updates to one agent are not coordinated with other updates."*

*"**Refs** allow you to make synchronous, coordinated changes to multiple values."*

### Day 2 Wrap-Up

- *"Atoms enable independent, synchronous changes to single values.*
- *Agents enable independent, asynchronous changes to single values.*
- *Refs enable coordinated, synchronous changes to multiple values."*

## Day 3: In Depth

### Atoms or STM?

*"Atoms enable independent changes to single values, whereas refs enable coordinated changes to multiple values."*

*"whenever we need to coordinate modifications of multiple values we can either use multiple refs and coordinate access to them with transactions or collect those values together into a compound data structure stored in a single atom"*

*"Experienced Clojure programmers tend to find that atoms suffice for most problems, as the language's functional nature leads to minimal use of mutable data"*

#### What Is Loop/Recur?

*"The `loop` macro defines a target that recur can `jump` to"*


## Wrap-Up

### Final Thoughts

*"Clojure has found a good balance between functional programming and mutable state, allowing programmers with experience in imperative languages to get started more easily than they might in a pure functional language. And yet it does so while retaining most of functional programming's benefits, in particular its excellent support for concurrency."*


## Additional Notes

###  Atom

- Create: `(atom <initial-val>)`
- Read: `(defef <agent>)` (or `@`)
- Update (with function): `(swap! <atom> <fn> <args>)`
- Set value: `(reset! <atom> <value>`

### Agent 

- Writes are serialized, no retries occur
- Create: `(agent <initial-val>)`
- Read: `(defef <agent>)` (or `@`) 
- Update (with function): `(send <agent> <update-fn> <args>)`
- Wait for completion: `(await <agent>)`

### Refs

- Software Transactional Memory
- Modification only possible in transaction: `(dosync <...>)`
- Create: `(ref <initial-val>)`
- Read:`(defef <ref>)` (or `@`)
- Update (with function): `(alter <ref> <update-fn> <args>)`
- Set value: `(ref-set <ref> <val>)`
- Protect ref from modification by other transaction: `(ensure <ref>)`


# Chapter 5 Actors

*"The actor model [...] targets both shared- and distributed-memory architectures, facilitates geographical distribution, and provides especially strong support for fault tolerance and resilience."* 

## More Object-Oriented than Objects

*"Actor programming [...] retains mutable state but avoids sharing it."*

## Day 1: Messages and Mailboxes

### Mailboxes are Queues

*"Messages are sent **asynchronously**. Instead of being sent directly to an actor, they are placed in a mailbox"*

*"Actors are **decoupled** - actors run at their own speed and don't block when sending messages."*

*"An actor runs concurrently with other actors but handles messages sequentially, in the order they were added to the mailbox"*

*"We only have to worry about concurrency when sending messages. "*

## Day 2: Error Handling and Resilience

### Supervising a Process

*"A supervisor, a system process that monitors one or more worker processes and takes appropriate action if they fail."*

### The Error-Kernel Pattern


*"A software system's error kernel is the part that must be correct if the system is to function correctly. Well-written programs make this error kernel as small and as simple as possible"*

*"This leads to a hierarchy of error kernels in which risky operations are pushed down toward the lower-level actors"*


### Let It Crash!

*"Actor programs tend to avoid defensive programming and subscribe to the "let it crash" philosophy"*

*"This has multiple benefits, including these:*

- *Our code is simpler and easier to understand, with a clear separation between 'happy path' and fault-tolerant code.*
- *Actors are separate from one another and don’t share state, so there’s little danger that a failure in one actor will adversely affect another. In particular, a failed actor’s supervisor cannot crash because the actor it’s supervising crashes.*
- *As well as fixing the error, a supervisor can log it so that instead of sweeping problems under the carpet, we become aware of them and can take remedial action."*


## Day 3: Distribution

*"Sending a message to an actor on another machine is just as easy as sending it to one running locally."*

### What Is a Restart Strategy?

*"If a single worker fails, a supervisor using the one-for-all strategy will stop and restart all its workers (even those that didn’t fail). A supervisor using a one-for-one strategy, by contrast, will only restart the failed worker."*

### Day 3 Wrap-Up

*"Elixir allows us to create clusters of nodes. An actor on one node can send messages to an actor running on another in exactly the same way as it can to one running locally. As well as allowing us to create systems that leverage multiple distributed computers, it allows us to recover from the failure of one of those computers. "*


## Wrap-Up

*"We can think of actors as the logical extension of object-oriented programming to the concurrent world. Indeed, you can think of actors as more object-oriented than objects, with stricter message passing and encapsulation."*

### Strengths

#### Messaging and Encapsulation

*"Actors do not share state"*

*"We need only worry about concurrency when considering message flows between actors."*

*"An actor can be tested in isolation and, as long as our tests accurately represent the types of messages that might be delivered and in what order, we can have high confidence that it behaves as it should. And if we do find ourselves faced with a concurrency-related bug, we know where to look - the message flows between actors."*

#### Fault Tolerance

*"Fault tolerance is built into actor programs from the outset. This enables not only more resilient programs but also simpler and clearer code (through the "let it crash" philosophy)."*

#### Distributed Programming

*"It allows an actor program to scale to solve problems of almost any size."*

*"It allows us to address problems [with] geographical distribution"*

*"Distribution is a key enabler for resilient and fault-tolerant systems. "*


### Weaknesses

*"Actors are still susceptible to problems like deadlock plus a few failure modes unique to actors (such as overflowing an actor’s mailbox)."*

*"Actors provide no direct support for parallelism. Parallel solutions need to be built from concurrent building blocks, raising the specter of nondeterminism. "*


# Cahpter 6: Communicating Sequential Processes

## Communication Is Everything

*"CSP focuses on the channels over which they are sent. Channels are first class [...] can be independently created, written to, read from, and passed between processes."*

## Day 1: Channels and Go Blocks

### Channels

*"A channel is a thread-safe queue - any task with a reference to a channel can add messages to one end, and any task with a reference to it can remove messages from the other."*

### Buffering

*"By default, channels are synchronous (or unbuffered) - writing to a channel blocks until something reads from it"*

### Closing Channels

*"[Channels] can be closed with `close!`. Reading from an empty closed channel returns `nil`, and writing to a closed channel silently discards the message. [...] writing `nil` to a channel is an error."*


### What - No Automatically Growing Buffer?

*"[There ]three types of buffer provided by `core.async` as standard - blocking, dropping, and sliding. It would be quite possible to create one that simply grows as it needs to accommodate more messages. So why isn’t this provided as standard?"*

*"The reason is the age - old lesson that, whenever you have an "inexhaustible" resource, sooner or later you will exhaust it."*

*"Better to think about how you want to handle a full buffer today and nip the problem in the bud."*


### Go Blocks

#### The Problem with Blocking

*"State and concurrency really don't mix."*

*"Go blocks provide an alternative that gives us the best of both worlds—the efficiency of event-driven code without having to compromise its structure or readability. They achieve this by transparently rewriting sequential code into event-driven code under the hood."*


#### Inversion of Control

*" Code within a `go` block is transformed into a state machine. Instead of blocking when it reads from or writes to a channel, the state machine *parks*, relinquishing control of the thread it’s executing on. When it’s next able to run, it performs a state transition and continues execution, potentially on another thread. "*

*"This represents an inversion of control, allowing the `core.async` runtime to efficiently multiplex many `go` blocks over a limited thread pool."*


#### What Happens If I Block in a Go Block?

*"If you call a blocking function, such as `<!!`, in a go block, you will simply block the thread it happens to be running on."*


#### Go Blocks Are Cheap

*"Because (unlike threads) go blocks are cheap, we can create many of them without running out of resources."*

### Day 1 Wrap-Up

#### What We Learned in Day 1

*"The twin pillars of `core.async` are channels and go blocks:*

- *By default, channels are synchronous (unbuffered)—writing to a channel blocks until something reads from it.*
- *Alternatively, channels can be buffered. [Full buffers can] block, discard the oldest value (sliding buffer), or discard the most recently written value (dropping buffer).*
- *Go blocks utilize inversion of control to rewrite sequential code as a state machine."*

### Wrap-Up

#### Strength

*"In an actor program, the medium of communication is tightly coupled to the unit of execution - each actor has precisely one mailbox. In a CSP program, by contrast, channels are first class and can be independently created, written to, read from, and passed between tasks."*

#### Weaknesses

*"[Compared to actors two topics are missing:] distribution and fault tolerance. Although there’s nothing whatsoever to stop CSP-based languages from supporting both, historically neither has had the same level of focus and support as either has had within actor-based languages"*

*"CSP programs are susceptible to deadlock and have no direct support for parallelism. Parallel solutions need to be built from concurrent building blocks, raising the specter of nondeterminism."*

#### Final Thoughts

*"The actor community has concentrated on fault tolerance and distribution, and the CSP community on efficiency and expressiveness."*


# Chapter 7: Data Parallelism

## Day 1: GPGPU Programming

### Graphics Processing and Data Parallelism

*"Data parallelism can be implemented in many different ways. We'll look briefly at a couple of them: pipelining and multiple ALUs."*


#### A Confused Picture

*"To achieve their performance, real-world GPUs combine pipelining and multiple ALUs with a wide range of other techniques."*

*"OpenCL targets multiple architectures by defining a C-like language that allows us to express a parallel algorithm abstractly. Each different GPU manufacturer then provides its own compilers and drivers that allow that program to be compiled and run on its hardware."*


#### Work-Items

*"Typically, if each task performs too little work, your code performs badly because thread creation and communication overheads dominate."*

*"OpenCL work-items, by contrast, are typically very small."*

*"Your task as a programmer is to divide your problem into the smallest work-items you can. The OpenCL compiler and runtime then worry about how best to schedule those work-items on the available hardware so that that hardware is utilized as efficiently as possible."*

#### Kernels

*"We specify how each work-item should be processed by writing an OpenCL kernel."*

*"To create a complete program, we need to embed our kernel in a host program that performs the following steps:*

- *Create a context within which the kernel will run together with a command queue.*
- *Compile the kernel.*
- *Create buffers for input and output data.*
- *Enqueue a command that executes the kernel once for each work-item.*
- *Retrieve the results."*

### Day 1: Wrap-Up

#### What We Learned in Day 1

*"OpenCL parallelizes a task by dividing it up into work-items."*

*"We specify how each work-item should be processed by writing a kernel. "*

*"To execute a kernel, a host program [is needed]."*


## Day 2: Multiple Dimensions and Work-Groups

### Platform Model

*"An OpenCL platform consists of a host that’s connected to one or more devices. Each device has one or more compute units, each of which provides a number of processing elements"*


*"Work.items execute on processing elements. A collection of work-items executing on a single compute unit is a work-group. The work-items in a work-group share local memory"*


### Memory Model

*"A work-item executing a kernel has access to four different memory regions:*

- Global memory
- Constant memory (global)
- Local memory: local to work-groop used for communication between work-items
- Private memory: private to a work-item

### Wrap-Up

#### Strength

*"Data parallelism is ideal whenever you’re faced with a problem where large amounts of numerical data needs to be processed."*

#### Weaknesses

*"Optimizing an OpenCL kernel can be tricky, and effective optimization often depends on understanding underlying architectural details"*

*"For some problems, the need to copy data from the host to the device can dominate execution time, negating or reducing the benefit to be gained from parallelizing the computation."*

# Chapter 8 The Lambda Architecture

## Day 1: MapReduce

### What We Learned in Day 1

*"Hadoop is a MapReduce system that does the following:"

- *It splits input between a number of mappers, each of which generates key/value pairs.*
- *These are then sent to reducers, which generate the final output (typically also a set of key/value pairs).*
- *Keys are partitioned between reducers such that all pairs with the same key are handled by the same reducer."*

## Day 2: The Batch Layer

### Data Is Better Raw

*"Immutability and parallelism are a marriage made in heaven."*

### Can We Generate Batch Views Incrementally?

*"Much of the power of the Lambda Architecture derives from the fact that we can always rebuild from scratch if we need to."*

### Almost Nirvana

*"Because it only ever operates on immutable raw data, the batch layer can easily exploit parallelism. Raw data can be distributed across a cluster of machines, enabling batch views to be recomputed in an acceptable period of time even when dealing with terabytes of input."*

*"The immutability of raw data also means that the system is intrinsically hardened against both technical failure and human error. Not only is it much easier to back up raw data, but if there’s a bug, the worst that can happen is that batch views are temporarily incorrect-we can always correct them by fixing the bug and recomputing them."*

### Day 2 Wrap-Up

#### What We Learned in Day 2

*"Information can be divided into raw data and derived information. Raw data is eternally true and therefore immutable. The batch layer of the Lambda Architecture leverages this to allow us to create systems that are*

- *highly parallel, enabling terabytes of data to be processed;*
- *simple, making them both easier to create and less error prone;*
- *tolerant of both technical failure and human error; and*
- *capable of supporting both day-to-day operations and historical reporting and analysis."*

*"The primary drawback of the batch layer is latency, which the Lambda Architecture addresses by running the speed layer alongside."*

## Day 3: The Speed Layer

*"The batch layer of the Lambda Architecture solves all the problems we identified with traditional data systems, but it does so at the expense of latency."*

*"As new data arrives, we both append it to the raw data that the batch layer works on and send it to the speed layer. The speed layer generates real-time views, which are combined with batch views to create fully up-to-date answers to queries."*

### Designing the Speed Layer

*"The speed layer only needs to handle that portion of our data that hasn’t already been handled by the batch layer."*
