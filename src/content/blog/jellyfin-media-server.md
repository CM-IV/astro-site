---
draft: false
title: "Learn how to self-host a media center with Jellyfin."
snippet: "Use Jellyfin to serve your media, essentially creating your own cloud."
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/jellyphoto_xYsVvBvpC.webp?updatedAt=1639177501919",
    alt: "full stack web development",
  }
publishDate: "2021-12-10 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [jellyfin, homelab, media]
---

[Jellyfin](https://jellyfin.org/) software media system hands you the reigns of your entertainment and media consumption.
Streaming to any device is possible, using your own files on the server. Built and maintained by an awesome team of volunteers, Jellyfin goes above and beyond any closed-source media system. You can serve photos, music, videos, and even
watch live television if you wanted to.

This post will show you, the reader, how to set up a local
Jellyfin media server in order to give you back control of
your media. There are a myriad of [clients](https://jellyfin.org/clients/) that you can use to consume that media self-hosted on your server - anything from a Chromecast to an app on your Android phone. There are no central Jellyfin servers that collect your user data, the only server is the one that you own that serves up your media.

Jellyfin is "free software" as in "free speech". Licensed under the GNU GPL, you will always be able to modify it and distribute it as long as your version is free. Jellyfin NEEDS
support from the open source community, so checkout their [contribution guide](https://jellyfin.org/contribute/) for more information.

You can use this docker-compose file to spin up your own instance of Jellyfin:

```
---
version: "3.7"
services:
  jellyfin:
    image: lscr.io/linuxserver/jellyfin
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
    volumes:
      - /mnt/storage/jellyfin/config:/config
      - /mnt/storage/jellyfin/tvshows:/data/tvshows
      - /mnt/storage/jellyfin/movies:/data/movies
      - /mnt/storage/jellyfin/music:/data/music
      - /mnt/storage/jellyfin/books:/data/books
      - /mnt/storage/jellyfin/photos:/data/photos
    ports:
      - 8096:8096
    restart: unless-stopped
```

The above docker-compose file is what you'd need to start the media server up.
The image is already there to be used for us, and below that in the environment
variables we set the PGID and PUID (for me it's 1000). In the volumes section,
you map out each of the different volumes that you want to use as storage
for each of the different forms of media along with a config folder. I chose to
map the ports to 8096 here.
