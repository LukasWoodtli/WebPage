---
title: Audio Plugin Development
category: Programming
tags: [C++, Computer Science]
---
# Digital Audio Processing

## Sampling Rate and Sampling Period

$$f_s = \frac{1}{T_s}$$

with:

- $f_s$: Sampling rate in $Hz$
- $T_s$: Sampling period in $s$

## Samples and Frames

A frame is a list of a sample for each channel at a given time.

## Block/Buffer

A block is a number of consecutive samples for each channel for the same time.

Sometimes this is called a buffer. But that term is used for different things, too.

## Samples per Block

This term is ambiguous:

- frames in a block
- samples in a channel in a block

## Buffer length calculations

### Duration

$\textnormal{duration} = \textnormal{number of frames} / \textnormal{sampling rage}$

umber of frames: number of samples in a single channel of the buffer

# Audio Plugin Architecture

Editor: GUI
Processor: DSP audio processing code

## Processor

Initialization of the processor:

1. `createPluginFilter()`
2. `prepareToPlay()` 
  - can be called multiple times
3. `processBlock()`
  - called for each block providing the buffer to process
  - MIDI messages are also provided
  - called many times per second
  - needs to finish on time
  - can still be called when playback is stoppend

Closing the plugin:

1. `releaseResources()`
2. destructor called

## Editor

- Can be opened and closed by user.
- Plugin needs to work even when there is no editor.
- No audio related code in editor!

# Real-Time Audio Processing

## Audio Thread

### Don'ts

- Memory allocation and deallocation 
  - Be cautious about hidden allocations, e.g. in `std::string`, `std::vector`, `push_back()`, ...
  - Copy assignment and copy construction of objects
  - Make allocations in `prepareToPlay()` and deallocations in `releaseResources()`
- Also other system calls must be avoided (unbounded execution time)
- Don't take a lock
  - use `std::atomic<T>` and assure that it's lock-free with `static_assert(std::atomic<T>::is_always_lock_free)`
  - or other lock-free data structures
- No multithreading
- No file and network I/O
- Don't log
- No algorithms with unpredictable (or bad) worst case execution time
- Be careful with 3rd-party code


# Audio Buffer

The `juce::AudioBuffer` class is a thin wrapper around arrays of samples. It has a template argument for the underlying type for samples (e.g. `float`).

Member functions:

- `getNumSamples()`: number of samples per channel in the buffer (number of frames)
- `getNumChannels()`: number of channels in the buffer
. `getSample(..)` and `setSample(..)`: for getting or setting a specific sample
- `getWritePointer(int channelNumber)` and `getArrayOfWritePointers()`: for working with pointers to the arrays
- ...

## Channel- vs. Frame-wise Processing

### Channel-wise iteration

```cpp
// generate time/position dependant state
for(const auto channel: iota(0, buffer.getNumChannels())) {
  for(const auto frame: iota(0, buffer.getNumSamples())) {
    // use generated state without modifying
    // process(channel, frame)
  }
}
```

Pros:

- Possible compiler optimizations
- SIMD compatible

Cons:

- potential duplicated state: additional memory usage

### Frame-wise iteration

```cpp
for(const auto frame: iota(0, buffer.getNumSamples())) {
  // state dependant on sample position (time)
  for(const auto channel: iota(0, buffer.getNumChannels())) {
    // process(channel, frame)
  }
}
```

Pros:

- easier to understand


# Resources

[WolfSound: JUCE Audio Plugin Development Course](https://www.wolfsoundacademy.com/juce)

[JUCE Documentation](https://docs.juce.com/master/index.html)

[JUCE Tutorials](https://juce.com/learn/tutorials/)
