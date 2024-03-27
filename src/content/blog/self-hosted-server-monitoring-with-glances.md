---
draft: false
title: "Self-hosted Server Monitoring with Glances"
snippet: "Use the provided docker-compose configuration file in order to
  setup monitoring for your homelab server"
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/Glances_11C2N31f8.webp?updatedAt=1665079251247",
    alt: "full stack web development",
  }
publishDate: "2022-10-06 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [glances, homelab, monitoring, docker]
---

Check out _Glances_ in order to monitor and keep track of your own homelab server. I'm running this instance behind a Caddy reverse proxy, and I can access it through a Tailscale VPN. The Caddy reverse proxy allows me to acquire TLS certificates for the VPN connection, even though they technically aren't needed.

This instance of Glances that is runnning a webserver will be used to supply data to an instance of _Dashy_ that I will make a post about in the future. That will be the cool frontend to this Glances data collection program.

<img class="image" alt="glanges-image-1" src="https://ik.imagekit.io/xbkhabiqcy9/img/Glances_11C2N31f8.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1665079251247" width={860} height={392} />

Below this image is the docker-compose yaml file that I am using in order to automate the docker container:

```yaml
version: "3.3"
services:
  nicolargo:
    restart: always
    ports:
      - "61208-61209:61208-61209"
    environment:
      - GLANCES_OPT=-w
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    pid: host
    image: docker.io/nicolargo/glances
```

This is all you'll need in order to get started collecting the data necessary for creating a cool dashboard that keeps track of different metrics for your homelab.
