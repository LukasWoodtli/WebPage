---
title: Robot Operating System (ROS)
category: Mechanics
tags: [Cheat Sheet, Robotics]
---
> Currently I'm using *Melodic Morenia*.

[TOC]

# `rosbash`

> There is `tab`-completion for almost everything

## Load ROS Environment

For Bash:

```bash
source /opt/ros/melodic/setup.bash
```

or Zsh:

```zsh
source /opt/ros/melodic/setup.zsh
```

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

## Start a node (`rosrun`)

```bash
rosrun <package-name> <executable-name>
```

- `package-name`: the name of the node's package
- `executable-name`: the executable name in that package


## Handle multiple nodes (`roslaunch`)

| Command                                       | Function                                 |
|-----------------------------------------------|------------------------------------------|
| `roslaunch <package-name> <launch-file-name>` | Launch nodes from launch file in package |
| `roslaunch <launch-file-path>` | Launch nodes from launch file given with full path      |


### Launch File Structure (XML Tags and Arguments)

- `<launch>`: Root element of launch file
- `<node name="listener" pkg="roscpp_tutorials" type="listener" output="screen" />`: A ROS node to be launched
    - `name`: Name of the node (free to choose)
    - `pkg`: The ROS package name containing the node executable
    - `type`: Type of the node in the package
    - `output`: Where to output log messages (`screen` or `log`)
- `<arg name="arg_name" default="default_value"/>`: Define arguments (variables)
    - `$(arg arg_name)`: Reference arguments
    - `roslaunch launch_file.launch arg_name:=value`: Provide arguments when running a launchfile
- `<include file="package_name"/>`: Include other launchfile
    - `$(find package_name)`: Find other package in workspace



Notes about how to writ launch files can be found at [roslaunch/XML](http://wiki.ros.org/roslaunch/XML) and
[Roslaunch tips for large projects](http://wiki.ros.org/ROS/Tutorials/Roslaunch%20tips%20for%20larger%20projects)


Flags:

- `-v`: Print verbose output
- `--screen`: Display output for all nodes in launch file


## Commands for handling Nodes

| Command                    | Function                          |
|----------------------------|-----------------------------------|
| `rosnode list`             | Print the running nodes           |
| `rosnode info <node-name>` | Inspect a running node            |
| `rosnode kill <node-name>` | Stop and remove a running node    |
| `rosnode cleanup`          | Remove killed nodes from the list |

# Communication and Data Sharing

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


## Parameters (`rosparam`)

| Command                         | Function                                            |
|---------------------------------|-----------------------------------------------------|
| `rosparam list`                 | Print a list of all parameters                      |
| `rosparam get <parameter-name>` | Ask for the value of a parameter                    |
| `rosparam get <namespace>`      | Ask for all values of all parameters in a namespace |
| `rosparam set <parameter-name> <value>` | Set the value of a parameter                |
| `rosparam set <namespace> <values>` | Set the values of parameters in a namespace using YAML |
| `rosparam dump <filename> <namespace>` | Save all parameters from a namespace in a YAML file |
| `rosparam load <filename> <namespace>` | Load all parameters from a YAML file into a namespace |


## Services

A *client* node sends a **request** to a *server* node and waits for a **response**.

| Command                          | Function                                            |
|----------------------------------|-----------------------------------------------------|
| `rosservice list`                | Get a list of currently active services             |
| `rosservice node <service-name>` | Print the node that offers a given service          |
| `rosservice info <service-name>` | Finding the data type of a service                  |
| `rossrv show <service-data-type-name>` | Show the data fields of the request and the response |
| `rosservice call <service-name> <request>` | Get a response from a service             |

- `rosservice`: interacting with services that are currently offered by a node
- `rossrv`: information about service data types

Information about writing services and clients in C++ can be found here
[Writing a Simple Service and Client (C++)](http://wiki.ros.org/ROS/Tutorials/WritingServiceClient(c++)).


## Topics, Messages and Services

|                 | Topics     | Services     |
|-----------------|------------|--------------|
| active entities | `rostopic` | `rosservice` |
| data types      | `rosmsg`   | `rossrv`     |


## Overview

|             | Topics                  | Services                              | Actions                                  | Parameters                 | Dynamic Reconfigure          |
|-------------|-------------------------|---------------------------------------|------------------------------------------|----------------------------|------------------------------|
| Description | Continuous data streams | Blocking call for processing requests | Non-blocking, preemptable, goal oriented | Global constant parameters | Local, changeable parameters |
| Application | One-way data flow       | Short triggers or calculations        | Task executions and robot actions        | Constant settings          | Tuning parameters            |
| Examples    | Sensor data, robot state | Trigger change, request state, compute quantity | Navigation, grasping, motion execution | Topic names, camera settings, calibration data, robot setup | Controller parameters |




# Bag files

| Command                                    | Function                                       |
|--------------------------------------------|------------------------------------------------|
| `rosbag record -O <filename> <topic-names>`| Record all messages of the given topics (stop with `Ctrl-C`) |
| `rosrun rosbag record -O <filename> <topic-names>` | Alternative to be used in launch files |
| `rosbag play <filename>`                   | Replay bag file                                |
| `rosrun rosbag play <filename>`            | Alternative to be used in launch files         |
| `rosbag info <filename>`                   | Inspect bag file                               |


Flags:

- `-j`: Compress bag files


# Workspaces and Packages

All packages belonging to one project should be placed in one workspace.

## Creating a Workspaces

```bash
mkdir -p <workspace-name>/src    # don't forget the `src` subdirectory
cd  <workspace-name>/
catkin build  # don't use catkin_make
source devel/setup.zsh
```

## Creating a Package

```bash
cd  <workspace-name>/src
catkin_create_pkg <package-name> [list of dependencies]
```

## Building a Workspace

```bash
cd  <workspace-name>/
catkin build  # don't use catkin_make
source devel/setup.zsh
```


## Configuring build in a Workspace

```bash
cd  <workspace-name>/
catkin config
source devel/setup.zsh
```


### Provide Arguments to CMake

```bash
catkin config --cmake-args -DCMAKE_BUILD_TYPE=Debug
```


## Running a Node from Workspace

A master is required to run before running any nodes.

```bash
cd  <workspace-name>/
source devel/setup.zsh
rosrun <package-name> <executable-name>
```

## Cleaning the Workspace

```bash
cd  <workspace-name>/
catkin clean --all
```


# Client Libraries

## Node Handles

| Node Handle      | C++ Code                              | Namespace for Topics    |
|------------------|---------------------------------------|-------------------------|
| Default (public) | `nh_ = ros::NodeHandle();`            | `/namespace/topic`      |
| Private          | `nh_private_ = ros::NodeHandle("~");` | `/namespace/node/topic` |
| Namespaced       | `nh_eth_ = ros::NodeHandle("eth");`   | `/namespace/eth/topic`  |

It's also possible to use global node handlers. But it is not recomended.


## Time Library

It's recomended to always use the ROS Time APIs (and not the standard library).

This allows to handle simulated time properly.

- `ros::Time`:

```cpp
ros::Time begin = ros::Time::now();
double secs = begin.toSec();
```

- `ros::Duration`:

```cpp
duration(0.5); // 0.5s
ros::Duration passed = ros::Time()::now() - begin;
```

- `ros::Rate`:

```cpp
ros::Rate rate(10); // 10Hz
```

If wall time is required, use `ros::WallTime`, `ros::WallDuration` and `ros::WallRate`

# URDF and Xacro

To generate an URFD file from a xacro file:

```bash
xacro input.xacro > output.urdf
```


Checking URDF files:

```bash
check_urdf file.urdf
```

Create graph for URDF:

```bash
urdf_to_graphiz file.urdf  # note the missing 'v' in graphiz
```


# Checking for Problems

- `roswtf`: Perform sanity checks for the running ROS system
- `rosnode info`: Get information about nodes
- `rostopic echo`: Show data published on a topic
- `rqt_graph`: Show nodes and topics as graphs
- `rviz`: Visualize data
- `rqt`: Generic GUI with a lot of plugins

# References

- [A Gentle Introduction to ROS](https://cse.sc.edu/~jokane/agitr/)
- [ROS Wiki](http://wiki.ros.org/)
