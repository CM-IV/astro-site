---
draft: false
title: "Self Host Your Own Website Analytics with Umami"
snippet: "A simple JavaScript tracker used to keep up with the
  number of clicks for each link on the website"
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/umami2_IAg3WhLUA.webp?updatedAt=1667840164653",
    alt: "full stack web development",
  }
publishDate: "2022-11-07 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [umami, analytics, foss]
---

U﻿mami Analytics provides website owners with the ability to opt out of the Google Analytics walled garden. You can easily self-host the software on your own server in order to monitor a remotely deployed website somewhere else. In this article, I'll use the usual Docker-Compose method of spinning up the needed containers in order to run the software.

A﻿ll that is needed for the analytics to work on your website is one simple JavaScript tracker that you include within the headers of your website HTML. The code is open source, so there's no scary black box when it comes to how the code works.

H﻿ere's the yml file that will be used for the containers:

```yaml
version: "3"
services:
  umami:
    image: sparanoid/umami:postgresql-latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
      HASH_SALT: awget34rrq23rqawd456874
    depends_on:
      - db
    networks:
      - tunnel
    restart: always
  db:
    image: postgres:12-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: 902309waefhalkwn
    volumes:
      - ./schema.postgresql.sql:/docker-entrypoint-initdb.d/schema.postgresql.sql:ro
      - /mnt/storage/umami/db:/var/lib/postgresql/data
    networks:
      - tunnel
    restart: always
networks:
  tunnel:
    external: true
```

Y﻿ou'll notice here that I am using an external network called "tunnel". This allows me to expose the analytics dashboard to the outside internet thru a Cloudflare Tunnel. I am currently using that in conjunction with Cloudflare Access in order to secure the site and only allow a range of IP addresses access to it.

<img class="image" alt="umami-image-1" src="https://ik.imagekit.io/xbkhabiqcy9/img/umami2_IAg3WhLUA.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1667840164653" width={860} height={392} />
