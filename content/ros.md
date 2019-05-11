Title: Robot Operating System (ROS)
Category: Mechanics
Tags: Cheat Sheet, Robotics

> Currently I'm using *Melodic Morenia*.

[TOC]

# `rosbash`

> There is `tab`-completion for almost everything

## Load ROS Environment

For Bash:

    :::bash
    source /opt/ros/melodic/setup.bash

or Zsh:

    :::zsh
    source /opt/ros/melodic/setup.zsh

## Commands

| Command                       | Function                |
|-------------------------------|-------------------------|
| `rosls <package_name>`        | List package content    |
| `roscd <package_name>`        | Go to package directory |


# `rospack`

| Command                       | Function                |
|-------------------------------|-------------------------|
| `rospack list`                | List installed packages |
| `rospack find <package-name>` | Search for a package    |

Each package is defined by a package directory that contains a manifest
file called `package.xml`.

Package executables are not stored in the package directory.
They are placed in a separate standardized directory hierarchy.

# The Master (`roscore`)

- `roscore` starts the master. There are no command line arguments.

# Nodes

## Start a node with

    :::bash
    rosrun <package-name> <executable-name>

- `package-name`: the name of the node's package
- `executable-name`: the executable name in that package

## Commands for handling Nodes

| Command                    | Function                          |
|----------------------------|-----------------------------------|
| `rosnode list`             | Print the runnung nodes           |
| `rosnode info <node-name>` | Inspect a running node            |
| `rosnode kill <node-name>` | Stop and remove a running node    |
| `rosnode cleanup`          | Remove killed nodes from the list |


## Topics and Messages

| Command                      | Function                                           |
|------------------------------|----------------------------------------------------|
| `rostopic list`              | Print all topics currently published or subscribed |
| `rostopic list -v`           | Print also publishers and subscribers              |
| `rostopic echo <topic>`      | Print data published on a topic                    |
| `rostopic info <topic>`      | Print message type, publishers and subscribers     |
| `rostopic type <topic>`      | Get the message type published on a topic          |
| `rosmsg show <msg-type>`     | Get the fields of a message type                   |
| `rostopic pub <topic> <msg-type> -- <args>` | Publish on a topic (use `TAB` completion to get a template message) |


# Checking for Problems

- `roswtf`: Perform sanity checks for the running ROS system

# References

- [A Gentle Introduction to ROS](https://cse.sc.edu/~jokane/agitr/)
