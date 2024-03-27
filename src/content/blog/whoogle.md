---
draft: false
title: "Ditch big tech  browsers, self-host Whoogle instead!"
snippet: "Whoogle is a browser that you can spin up in a docker container to run from your own on-prem hardware."
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/screen1_Rh72vadpii.webp?updatedAt=1651842962323",
    alt: "full stack web development",
  }
publishDate: "2022-05-05 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [whoogle, homelab, browser, docker]
---

According to their [GitHub page](https://github.com/benbusby/whoogle-search) Whoogle Search is a self-hosted, ad-free, and privacy respecting metasearch engine. When Whoogle Search is used, you can still get Google search results as if you used their browser. The neat aspect of it is that you are actually using a search engine without JavaScript tracking and cookies.

It is simple to set up and get running, and I will demonstrate this by running Whoogle with Docker. There is a docker-compose file within their code repository, I will use it for this quick demo.

```yaml
version: "2.4"

services:
  whoogle-search:
    image: ${WHOOGLE_IMAGE:-benbusby/whoogle-search}
    container_name: whoogle-search
    restart: unless-stopped
    pids_limit: 50
    mem_limit: 256mb
    memswap_limit: 256mb
    ports:
      - 5000:5000
```

This is a simpler version of the docker-compose file that is listed in the repo, but this is all you need for the main websearch functionality. I will also show you how to set Whoogle Search as the default search engine in the Firefox browser. Once the docker container is up and runnning, you will see this page:

<img class="image" alt="whoogle-image-1" src="https://ik.imagekit.io/xbkhabiqcy9/img/screen1_Rh72vadpii.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651842962323" width={860} height={392} alt="Whoogle Search Image" />

In order to add Whoogle Search to the list of search engines to add in the settings, you need to click on the URL search bar and you will see a magnification glass icon.

<img alt="whoogle-image-2" src="https://ik.imagekit.io/xbkhabiqcy9/img/screen2_gK9Woxan-.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651842962398" width={860} height={392} alt="Whoogle Search Image 2" />

Once you click on that icon, you can go into the Firefox search settings and add Whoogle as the default search engine.
