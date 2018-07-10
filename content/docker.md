Title: Docker
Category: Programming
Tags: Linux, OS
Date: 2018-03-19

These notes are mainly taken from
[What You Need to Know about Docker](https://www.packtpub.com/packt/free-ebook/what-you-need-know-about-docker).

[TOC]

# Setup

Start the daemon (on Fedora): `sudo systemctl start docker`

Start the daemon on boot (on Fedora): `sudo systemctl enable docker`

Run as user:

First create a docker group:

`sudo groupadd docker`

Then add the actual user to that group:

`sudo usermod -aG docker $USER`

After that log out and log in again.

# Images and Containers

## List Images

Command: `docker images`

Columns:

- `REPOSITORY`: name of the repository on the Docker Hub
- `TAG`: the tag (version) of the image
- `IMAGE ID`: first 12 digits of the unique (64 bit) image ID
- `CREATED`: the creation date
- `SIZE`: size of the image


## Search Images

Command: `docker search <image-name>`

Columns:

- `NAME`: name of the repository
- `DESCRIPTION`: Small description
- `STARS`: Showing how many people like the repository
- `OFFICIAL`: If it has been approved by the Docker team
- `AUTOMATED`: If the build is automanted (on Docker Hub)


## Pull Images

Command: `docker pull <image-name>`

## Remove Images

Command: `docker rmi <image-id>`

or: `docker rmi <image-name>:<tag>`


## Run Image

Command: `docker run [flags] <image-name>:<tag> [command]`

Flags:

- `-i`: interactive shell
- `-t`: pseudo tty
- `-d`: run as daemon
- `-p <host_port>:<container_port>`: map ports

If the interactive (`-i`) flag is provided a command sould be executed.
This will override the default command that is run when the container is started.

A random name is assigned to the image.

Example: `docker run -i -t fedora:latest /bin/bash`


## Execute Command in running Container

Command `docker exec [flags] <image-name>:tag [command]`

- `-i`: interactive shell
- `-t`: pseudo tty
- `-d`: run as daemon
- `-w`: use working directory


## Detach from running Container

`CTRL`+`p` `CTRL`+`q`


## Show Running Images

Command: `docker ps`

To show also containers that are not running: `docker ps -a`


## Logs

Command: `docker logs <container-id-or-name>`


## Stopping Containers

Shutdown the container:

Command: `docker stop <container-id-or-name>`


Force quit the container:

Command: `docker kill <container-id-or-name>`


## Renaming Containers

Command: `docker rename <old-name> <new-name>`

## Getting Information from Containers

Command: `docker stats <container-name>`

Command: `docker top <container-name>`


## Removing Containers

Command: `docker rm <container-name>`

# Registries

There are three kinds of registries:

- Docker Hub: Hosted registry service by Docker
- Docker Trusted Registry: Hosted or on premise (backend maintained by Docker)
- Docker Registry: For running own Docker registry

# Docker Machine

## Create Machines

Create and manage machines running Docker.

Example (creating a VirtualBox machine running Docker): `docker-machine create -d virtualbox node1`

## List Machines

Command: `docker-machine ls`

Columns:

- `NAME`: node name
- `ACTIVE`: docker commands are run on the active node
- `DRIVER`: which driver is used (e.g. virtualbox)
- `STATE`: if it's running
- `URL`: its URL
- `SWARM`: if it's part of a Docker Swarm cluster
- `DOCKER`: version of Docker
- `ERRORS`: any errors that occurred

## Restart a Node

Commmand: `docker-machine restart <node-name>`


# Dockerfile

## Instructions

- `FROM`: The base image for this Docker image (`scratch` for empty base image).
- `MAINTAINER`: Responsible maintainer  (name and e-mail).
- `RUN`: Install packages and run other commands.
- `ADD`: Add files or folders to the Docker image. URLs can be provided. Automatically unpack or untar a compressed files.
- `COPY`: Same as `ADD` but without URL handling or unpacking/untarring.
- `EXPOSE`: Expose ports from the image to the outside world.
- `LABEL`: Additional information (version number, text ...). Each label add a layer to the image.
- `CMD`: Execute commands and keep the container alive.
- `ENTRYPOINT`: Similar to `CMD`. Can be used in conjunction with `CMD`.
- `USER`: Specify which username to use. Influences `RUN`, `CMD` and `ENTRYPOINT` instructions that follow in the Dockerfile.
- `WORKDIR`: Specify the directory where to execute instructions. Influences `RUN`, `CMD` and `ENTRYPOINT` instructions that follow in the Dockerfile
- `ONBUILD`: Used if image is used as base in another Dockerfile. Executed as first statement after `FROM`. Use in conjunction with `ADD` or `RUN`.

## Label Informations

Command: `docker inspect <image-id>`

## Best Practices

- Use a `.dockerignore` file.
- Install only necessary packages.
- Limit the number of layers. Every `RUN` command adds a layer.
- Execute only one process per container.


# Docker build

`docker build -t <docker-hub-username>/<repository-name> <directory>`

or

`docker build -f <path-do-dockerfile> -t <repository>:<tag>`


`<repository>`: repository name prefixed by Docker Hub username

## The `.dockerignore` file

This file can be used to exclude files and folders from being sent to the Docker daemon for the build. It should be placed in the same
folder as the `Dockerfile`.
