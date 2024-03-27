---
draft: false
title: "Locally host your own code repositories with lightweight Gitea"
snippet: "Gitea is a tiny alternative to GitHub written in Go, I'll show you how to use it."
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/gitea_59262IRyj.webp?updatedAt=1652312437020",
    alt: "full stack web development",
  }
publishDate: "2022-05-11 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [gitea, homelab, code-repo]
---

[Gitea](https://gitea.io/en-us/) is called "Git with a cup of tea", since it is written in Go, lightweight, and fast. It can run anywhere the code can be compiled for, in our case though it can run wherever a Docker container can be run.

<img class="image" alt="gitea-image-1" src="https://ik.imagekit.io/xbkhabiqcy9/img/gitea_59262IRyj.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1652312437020" width={860} height={392} alt="Whoogle Search Image" />

Gitea has a [page](https://gitea.com/gitea/awesome-gitea#user-content-devops) in their documentation discussing the different integrations available. I prefer to use the [Woodpecker](https://github.com/woodpecker-ci/woodpecker) CI system with Gitea, and I was able to follow their excellent [documentation](https://woodpecker-ci.org/docs/intro) when setting it up. I know there is not a whole lot of information out there when in comes to Woodpecker, so in a later article I will discuss setting up TLS encryption on your own VPN mesh network for both Gitea and Woodpecker CI.

```yaml
version: "3"

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:1.16.7
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST={DB_CONTAINER_NAME}:{DB_PORT}
      - GITEA__database__NAME={DB_NAME}
      - GITEA__database__USER={DB_USER}
      - GITEA__database__PASSWD={DB_PASS}
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
    depends_on:
      - db

  db:
    image: postgres:9.6
    restart: always
    environment:
      - POSTGRES_USER={DB_USER}
      - POSTGRES_PASSWORD={DB_PASS}
      - POSTGRES_DB={DB_NAME}
    networks:
      - gitea
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

Above is the docker-compose file for setting up Gitea on prem. The Gitea image here is the latest version, `1.16.7`. The environment variables here that are used in the Gitea container coincide with the variables used to spin up the Postgres database. Using Postgres is not a necessity, but it is what I am most familiar with.

It is important to note, that the external SSH listening address for the host is 222. Later on, we'll have to deal with that inside of the Gitea config file in order to properly get SSH addresses whenever we want to clone a respository.
