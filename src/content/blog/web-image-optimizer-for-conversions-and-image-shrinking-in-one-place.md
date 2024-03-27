---
draft: false
title: "Web Image Optimizer for conversions and image shrinking in one place"
snippet:
  "Use Web Image Optimizer to convert your jpg/png images to WebP or shrink your
  large image files down to manageable sizes while maintaining the image quality
  that you want.


  Web Image Optimizer is an ElectronJS desktop app that does its image processing calculations with NodeJS in the backend of the app, effectively keeping good security practices in mind."
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/hashnode-gate_OQ4pis-ar.webp?updatedAt=1679671463222",
    alt: "full stack web development",
  }
publishDate: "2022-08-05 11:39"
category: "Showcase"
author: "CM-IV"
tags: [web-image-optimizer, software, electron]
---

So I got tired of having to visit separate websites whenever I wanted to convert my images into WebP format and optimize them into smaller sizes. I started to look into ElectronJS for making a desktop app that would tackle this problem for me.

At the time I was already familiar with using ViteJS in my web stack tool-box, so I searched through GitHub to see if there was a way to use it on the frontend of an ElectronJS application. I love using ViteJS during development since it greatly speeds things up for me, not to mention CRA is over 5 years old at this point.

<img class="image" alt="web-image-optimizer-1" src="https://ik.imagekit.io/xbkhabiqcy9/img/wio_r0nJDt3jS.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1659720463963" width={860} height={392} alt="Web Image Optimizer Photo 1" />

Pictured above is the UI of the application with Bulma CSS styling. I chose to use PreactJS as the frontend framework in order to keep the overall amount of JavaScript there at a reasonable level.

The code to Web Image Optimizer can be found on my GitHub page in case you, dear reader, would like to clone it locally to your machine. You can download both the Linux AppImage or the Windows Setup executable from the downloads section on my website. Make sure to compare the sha512 checksum with the one that is provided.

There are modals that pop up after the process of image conversion/optimization is completed. If there is an error, a red modal appears. If you try to convert an image that is large, like over 100MB for instance, then it will take a bit for the green success modal to appear.
