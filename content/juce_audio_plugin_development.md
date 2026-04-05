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

# Resources

[WolfSound: JUCE Audio Plugin Development Course](https://www.wolfsoundacademy.com/juce)

[JUCE Documentation](https://docs.juce.com/master/index.html)

[JUCE Tutorials](https://juce.com/learn/tutorials/)
