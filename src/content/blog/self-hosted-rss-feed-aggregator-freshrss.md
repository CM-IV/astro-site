---
draft: false
title: "Self-hosted RSS feed aggregator FreshRSS"
snippet: "Self host your own RSS feed aggregator to pool from the sources of
  information that you prefer"
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/rust_LPgHm4Gho.webp?updatedAt=1679671463190",
    alt: "full stack web development",
  }
publishDate: "2022-11-22 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [rss, homelab, foss]
---

_FreshRSS_ is my preferred way of gathering all my information sources into one big feed so that I can stay up to date without having to visit a bunch of different pages. There is also an Android app called _Fluent Reader_ that I have downloaded and it keeps me from opening a browser up to grab those RSS feeds.

After first creating the docker-compose.yml file and starting up the container(s), you'll be greeted with this login page. After logging in/creating an account, you'll be able to curate RSS feeds to your liking. They will all aggregate to the front page and will be filterable. You can categorize the RSS feeds that you create by going into the subscription management menu. I have categories for the various GNU+Linux and homelab news feeds that I'm interested in. There's also an option to import/export feature where you can bring in other RSS feeds with JSON or OPML files.

<img alt="freshRSS image 2" width={860} src="https://ik.imagekit.io/xbkhabiqcy9/img/Screenshot_2022-11-22_at_08-22-03__103__Main_stream___FreshRSS_aPkF2Ujbb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669126940053" />

There's also a cool metrics dashboard that collects various information regarding the RSS feed entries. Total entries and entries per category are graphed out and displayed on the dashboard.

<img alt="freshRSS image 3" width={860} src="https://ik.imagekit.io/xbkhabiqcy9/img/Screenshot_2022-11-22_at_08-33-42_Statistics___FreshRSS_l_87zWnH2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669127639979" />

Here is the related docker-compose.yml file so that you can self host the program yourself:

```yaml
---
version: "2.1"
services:
  freshrss:
    image: lscr.io/linuxserver/freshrss:latest
    container_name: freshrss
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
    volumes:
      - ./config:/config
    ports:
      - 7080:80
    restart: unless-stopped
```
