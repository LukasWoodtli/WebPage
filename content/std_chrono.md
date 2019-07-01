Title: Notes on std::chrono
Category: Programming
Tags: C++

There is a good documentaion at [cppreference.com](https://en.cppreference.com/w/cpp/header/chrono)

# General

- Use `duration::count()` only for legacy code and debugging
- Use explicit casts (`duration_cast` and `timepoint_cast`) only when precission loss is required
    - lossless conversions are implicit
    - `duration_cast` truncates towards zero

# Clocks

- `system_clock`:
    - wall Clock
    - calendar
- `steady_clock`:
    - stop watch
    - for timing measurements
- `high_resolution_clock`:
    - usually a type alias to one of the other two types

# Date

- Main type `year/month/day`:
- errors are either
    - caught at compile time or
    - can be detected at runtime with `.ok()` (needs to be done by user!)

