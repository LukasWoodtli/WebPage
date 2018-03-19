Title: Docker
Category: Programming
Tags: Linux, OS
Date: 2018-03-19

These notes are mainly taken from
[What You Need to Know about Docker](https://www.packtpub.com/packt/free-ebook/what-you-need-know-about-docker).

# Docker

## Setup

Start the daemon (on Fedora): `sudo systemctl start docker`

Run as user:

First create a docker group:

`sudo groupadd docker`

Then add the actual user to that group:

`sudo usermod -aG docker $USER`

After that log out and log in again.

## Images

### List Images

Command: `docker images`

Columns:

- `REPOSITORY`: name of the repository on the Docker Hub
- `TAG`: the tag (version) of the image
- `IMAGE ID`: first 12 digits of the unique (64 bit) image ID
- `CREATED`: the creation date
- `SIZE`: size of the image


### Search Images

Command: `docker search <image-name>`

Columns:

- `NAME`: name of the repository
- `DESCRIPTION`: Small description
- `STARS`: Showing how many people like the repository
- `OFFICIAL`: If it has been approved by the Docker team
- `AUTOMATED`: If the build is automanted (on Docker Hub)


### Pull Images

Command: `docker pull <image-name>`

### Remove Images

Command: `docker rmi <image-id>`

or: `docker rmi <image-name>:<tag>`


### Run Image


Command: `docker run [flags] <image-name>:<tag> [command]`

Flags:

- `-i`: interactive shell
- `-t`: pseudo tty
- `-d`: run as daemon
- `-p <host_port>:<container_port>`: map ports

If the interactive (`-i`) flag is provided a command sould be executed.
This will override the default command that is run when the container is started.


Example: `docker run -i -t fedora:latest /bin/bash`


### Show Running Images

Command: `docker ps`

To show also containers that are not running: `docker ps -a`


### Logs

Command: `docker logs <container-id-or-name>`



