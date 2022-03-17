---
title: FreeRTOS
category: Programming
tags: [Computer Science, OS, FreeRTOS, Embedded Systems]
date: 2017-06-16
---
This page contains some random notes for FreeRTOS.

See also: [FreeRtosExamples](https://github.com/LukasWoodtli/FreeRtosExamples)
and [FreeRtos](http://www.freertos.org/)

[TOC]

# Configuration

The configuration of the kernel is set in `FreeRTOSConfig.h`

`configTOTAL_HEAP_SIZE`: This must be enough space to allocate all 
tasks including the idle task. If the kernel does't start it could 
be that the heap is too small.

`vTaskStartScheduler()` returns only if there is *not* enough memory 
to create the idle task.


# Tasks

- Defined as free functions
    - Return type: `void`
    - Argument: `void *`
- Usally endless loop
- Will never exit (not allowed by kernel)
- A task function can be used to create multiple tasks
- It's possible to create a task from another task


## Task Stack and TCB

Each task has its own stack (allocated by the kernel when the 
task is created).

> The stack size is given in *number of words* and not number of bytes

The stack depth multiplied by the stack width must not be bigger than the maximum value that can be stored in a variable of type size_t.

The stack size of the idle task is defined by `configMINIMAL_STACK_SIZE`.

The scheduler maintains a *Task Control Block* (TCB) for each task.
Each TCB has the same size.

Creating a task results in two allocations (`pvPortMalloc()`):

- Task stack
- TCB

# Stack Overflow

FreeRTOS has multiple mechanisms that allow to handle and debug
stack overflows.

## High Water Mark

The function `uxTaskGetStackHighWaterMark()` returns the minumum
of avaliable stack space since the task has been started.

## Runtime Checks

There are runtime checks for stack overflow available.

- Checking at task switch
- Fill stack on creation with a pattern, check top of stack for the pattern

### Method 1

After a context switch the kernel checks that the stack pointer 
remains within the valid stack range.

This method is quick but can miss stack overflows that happen 
between context switches.

### Method 2

This method performes additional checks to the ones of method 1.

At task creation the stack is filled with a known pattern. The last 
20 bytes of the stack are checked for that pattern. If it was
overwritten a stack overflow occured.

This method is not as quick as method 1. But it will likely find 
most (if not all) stack overflows.

### Configuration

- Set the desired method with `configCHECK_FOR_STACK_OVERFLOW` (value `1` or `2`)
- Implement a hook function: `vApplicationStackOverflowHook()`

The hook function has the prototype:

    :::c
    void vApplicationStackOverflowHook(xTaskHandle *pxTask, signed char *pcTaskName);

Real recovery ofter a stack overflow is not possible.
Since since the *TCB* may be corrupted the data privided to the
hook function may be useless.

## Task States

Only the FreeRTOS kernel is allowed to change task state.

- Running
- Not running
    - Suspended
    - Ready
    - Blocked

Events and system calls can influence the scheduler for allowing
different tasks to run.

If more than one task of the same priority is able to run, the scheduler will switch each task in and out of the *Running* state, in turn.

## Task Priorities

Can be assigned a valu form `0` (lowest) to `configMAX_PRIORITIES - 1` (highest).

Priority can be changed after the scheduler has started but are never changed by the scheduler itself.

### Selecting Task Priority

Rule of thumb:

Tasks for hard real-time functionalities are assigned priorities above tasks for soft real-time functionalities.

#### Rate Monotonic Scheduling (RMS)

See [Wikipedia:Rate-monotonic scheduling](https://en.wikipedia.org/wiki/Rate-monotonic_scheduling)

Each task is assiged a unique static priority. The priorities are assigned according to the cycle duration of the task.

- Task with the highest execution frequency (shorter cycle) is assigned highest priority is assigned 
- Task with the lowest execution frequency is assigned lowest priority is assigned 

RMS maximizes the *schedulability* of an application.


## Blocking a Task

- A task can be blocked if it currently has nothing to do
- `vTaskDelay()` is usually called for a task to enter the blocked state
- `vTaskDelayUntil()` should be used when a *fixed* execution period is required (e.g. DSP)


## Idle Task Hook

It's possible to add a callback to the idle task.
It is called automatically once per iteration by the idle task loop.

Following rules must be followed:

- The hook function must never block or suspend itself
- If the application make use of `vTaskDelete()` the hook function needs to return to its caller within reasonable time

The idle task is responsible to clean up resources after a task has been deleted.

# Scheduler

The scheduler is executed after each time slice to select the next task.
A periodic (tick) interrupt is used for switching.

The tick interrupt frequency is set by `configTICK_RATE_HZ`.

To convert the number of ticks into milliseconds the constant
`portTICK_RATE_MS` can be used.


## Scheduling Algorithm

FreeRTOS uses a *fixed priority pre-emptive scheduling* algorithm. But it can be configured to use a
cooperative scheduling algorithm.

- Each task has a priority assigned
- Each task has a state
- Only one task is in running state
- The scheduler selects always the highest priority task (in *ready* state) to enter *running* state


# Synchronization

Tasks or ISRs send information to a queue or to a semaphore.
These synchronization events are used to signal asynchronous
activity.

- Semaphores: communicate events
- Queues: communicate events and data

## Queues

- Fixed number and size of data items
- FIFO
- Writing and reading: byte-for-byte copy
- Accessible from multiple tasks
    - multiple writers is common
    - multiple readers is not used often

## Semaphores

Handles to all types of semaphores are stored in variables
of type `xSemaphoreHandle`.

### Binary Semaphores

See [Wikipedia:Semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming))

- Unblock a task each time an IRQ occurs
- Synchronization of tasks with interrupts
- Deferring processing to handler task

Terminology:

- $P()$ operation: 'taking' a semaphore
- $V()$ operation: 'giving' a semaphore


API function `xSemaphoreGiveFromISR(..)`:

- All types of semapores *except recursive semaphores* can be
'given' with `xSemaphoreGiveFromISR()`.
- Output argument `pxHigherPriorityTaskWoken`:
    - if set to pdTRUE a context switch should be performed before ISR exits
    - this context switch needs to be done manually in ISR code
    - the scheduler will switch to the highes prioriy task (in ready state)

    
### Counting Semaphores

Use cases:

1. Counting events
    - Count value: difference between number of occured events and number of processed events
    - Created with an initial count value of zero
2. Resource management
    - Count value: indicates number of available resources
    - Created with an initial count value equal to number of available resources

    

# Critical Sections

FreeRTOS provides several mechanisms to implement mutual exclusion. But best is if resources are not shared and each resource is accessed only by one single task.

## Basic Critical Sections

Critical sections can be wrapped in calls to `taskENTER_CRITICAL()` 
and `taskEXIT_CRITICAL()`. This is a very rudimentary form of mutual exclusion.

- IRQs with priority above `configMAX_SYSCALL_INTERRUPT_PRIORITY` are still allowed to execute
- these interrupts are not allowed to call FreeRTOS API functions

Critical sections can be nested.

## Locking the Scheduler

The scheduler can be suspended by `vTaskSuspendAll()` and resumed 
by `xTaskResumeAll()`.

This protects the critical section only from access by other tasks.
It leaves interrupts enabled.

If an interrupt requests an context switch the request is performed
when the scheduler is resumed.

> Do not call FreeRTOS API functions while the scheduler is suspended

Locking the scheduler can be nested.

## Mutexs and Binary Semaphores

- Token that is associated to a shared resource
- Acquire the token before access to the resource is given
- After using the resource the token has to be released

Mutual exclusion: the semaphore must be returned
Synchronization: the semaphore is not returned (discarded)

# IRQs

Event processing:

1. Detect event
    - IRQs
    - polling
2. IRQs
    - how much processing in ISR
    - how much in main code
3. Communication of IRS to main code

> Only API functions and macros ending in `FromISR` or `FROM_ISR`
> are allowed to be called from interrupt service routines.


The Cortex-M3 allows up to 256 (8 bits) different interrupt priorities.

> *High* numeric priority numbers mean *low* interrupt priority.

There are CMSIS functions that provide access to the interrupt controller.

Interrupt priorities have nothing to do with task priorities.
Interrupt priorities are provided by the microcontoller architecture.

> Interrupts with higher priorites than 
> `configMAX_SYSCALL_INTERRUPT_PRIORITY` (lower value)
> must not call any FreeRTOS API functions



## IRQ Nesting

Interrupt nesting is achieved by setting
`configMAX_SYSCALL_INTERRUPT_PRIORITY` to a higher priority
(lower value) than `configKERNEL_INTERRUPT_PRIORITY`.


# Resources

Used interrupts on Cortex-M3:

- SysTick
- PendSV
- SVC

These interrupts are not available for the application.

Memory (typical sizes):

- Flash: 6 kB
- RAM: 300-500 bytes


## Reentrancy

A function that is safe to be called from multiple tasks or ISRs is reentrant.

Each task has its own stack and its own set of (pushed) registers. If a function only accesses data from its own stack and registers then it is reentrant.


# General

## Real-Time Requirements

Typically, applications of this type include a mix of both hard and soft real-time requirements


- Soft real-time requirements:
    - time deadline
    - but breaching deadline does not render the system useles
    - i.e. GUI (user interaction)
- Hard real-time:
    - time deadline
    - breaching the deadline: absolute failure of the system
    - i.e. security related code in cars
- Applications typically combine both types of real-time rocessing


## Coding Standard

FreeRTOS has its own coding standard.

### Data Types

`portBASE_TYPE`: Most efficient data type on the architecture

`portTickType`: Tick count value to specify block times (16-bit or 32-bit)

### Variable and Function Names

Variable Prefixes:

- `c`: char
- `s`: short
- `l`: long
- `x`: portBASE_TYPE and others (structs, handles ...)
- `u`: unsigend (combined with other prefixes)
- `p`: pointer (combined with other prefixes)

Function Names:

- Prefixed with return type and file where the function is defined.

Defines:

| Macro  | Value |
|--------|-------|
|pdTRUE  |   1   |
|pdFALSE |   0   |
|pdPASS  |   1   |
|pdFAIL  |   0   |

