# MeanStack Microservices Project

Welcome to the MeanStack Microservices Project! This project demonstrates a streamlined software development process using a 3-tier microservice-based approach. It leverages Docker, GitHub, and Docker Hub to accelerate development cycles.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Overview

In the fast-paced realm of software development, where innovation is constant and timelines are tight, this project provides a solution to accelerate development cycles. It demonstrates the synergy of Docker Compose, MongoDB, Express.js, Nginx, and a web interface to create a highly efficient and modular application architecture.

## Project Structure

The project is structured into three main components:

1. **mongo-db:** Manages the MongoDB database.
2. **app-server:** Implements the business logic using Node.js and Express.js.
3. **web-server:** Serves as the web interface with Angular.

Each component has its own directory with a Dockerfile and associated source code.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tallgray/MeanStack.git


2. Create the Docker network and volume NFS directory:

   ```bash
   docker network create -d macvlan --subnet=10.220.0.0/24 --gateway=10.220.0.1 --ip-range=10.220.0.64/27 -o parent=eth0 LAN

   mkdir /mnt/nas/nfs-1/volumes/${PROJECT}_mongo-db
* The Docker network values for subnet, gateway, ip-range and parent should be customized to match your local environment and host machine. Using the bash command 'ip a' on your Docker host will help you to locate these specifics.
* The ${PROJECT} refers to the dotenv file variable, but this will not be read into the Docker host bash shell. So, you will need to define it to match the name of your project root folder. When cloning this repo, it will be named 'MeanStack'.
* If you do not have an NFS service that is mounted to the Docker host, you may remove the 'volumes:' definition sections from the Docker Compose YAML file. This will result in the mongo-db container no longer having persistent storage and therefore the database will be deleted each time the container is stopped or recreated.

3. Navigate to the project directory:

   ```bash
   cd MeanStack

4. Update the .env file with your project-specific variables:
   ```bash
   nano .env

5. Build and start the project using Docker Compose:
   ```bash
   docker-compose up -d --build