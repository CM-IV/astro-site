---
draft: false
title: Self hosting large language models with Ollama
snippet: Locally deploy Ollama to interact with LLMs via API.
image:
  src: https://ik.imagekit.io/xbkhabiqcy9/img/ai_PNTw_pGos.webp?updatedAt=1701108962005
  alt: AI robot woman image
publishDate: 11/27/2023, 12:05 PM
category: Tutorials
author: CM-IV
tags:
  - how-to
  - LLM
  - Ollama
  - AI
---

**The following article shows how to use Docker for local AI model deployment. You can find the second article [here](/blog/2023-12-01-create-your-own-ai-helper-with-javascript) where I implement the client to interact with the AI.**

In the world of Artificial Intelligence, large language models have become increasingly popular in recent years. These powerful algorithms can understand and generate human-like text with remarkable accuracy, making them ideal for tasks such as translation, summarization, and question answering. However, due to their size and complexity, these models are often hosted on cloud computing services like Google Cloud Platform or Amazon Web Services, which can be expensive and time-consuming to set up.

But what if you could host a large language model locally? This would provide numerous benefits, including lower costs, faster response times, and increased privacy and security. However, there are challenges to overcome in order to successfully implement this technology.

Locally-hosted large language models (LLMs) have become increasingly popular in recent years due to their ability to process and analyze vast amounts of text data with high accuracy and efficiency. These LLMs can be trained on enormous datasets and fine-tuned for specific tasks, enabling a wide range of applications. In this article, we will explore some of the exciting things you can do with locally-hosted LLMs, including ingesting text files for data, image generation, question answering, and more.

One of the most significant advantages of hosting LLMs locally is that it allows for fast processing and analysis of large volumes of data without the need for external cloud services or high-bandwidth internet connections. This makes it an attractive option for organizations with sensitive data or in areas where access to the cloud may be limited due to connectivity issues.

A common use case of LLMs is for text analysis and information extraction. By ingesting large volumes of unstructured text, LLMs can extract insights, identify trends, and even predict future events with high accuracy. This makes it a valuable tool for industries such as finance, healthcare, and law where vast amounts of unstructured data need to be analyzed. For instance, in the legal industry, LLMs can help lawyers sift through massive volumes of court documents and identify key arguments or evidence much faster than traditional methods.

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/Ollama_eZgE8zpl7.webp?updatedAt=1701115771989" width={860} height={392} alt="photo 1" />

At this point, one of the simplest routes to take with local AI models is [Ollama](https://ollama.ai/). Very similar to how [Docker](https://www.docker.com/) works with containers, `Ollama` provides a nice modular way to work with local AI models. I'll start with the excellent [Zephyr 7B Beta](https://huggingface.co/HuggingFaceH4/zephyr-7b-beta) model from Huggingface - which is a fine-tuned version of the [Mistral 7B](https://huggingface.co/mistralai/Mistral-7B-v0.1) model. This model will be run locally on an old X79 Intel CPU with 64GBs of available RAM.

Provided you already have `Docker` setup and running on your machine with `docker-compose`, this process is very simple. As of today, version `0.1.11` is the latest where the following yaml file is what you need to start with `Ollama`:

```yml
version: "3.3"
services:
  ollama:
    volumes:
      - "/mnt/storage/ollama:/root/.ollama"
    ports:
      - "11434:11434"
    container_name: ollama
    image: ollama/ollama:0.1.11
```

A quick `ollama pull zephyr` command is all it takes to pull down the `Zephyr 7B Beta` model from the registry and get it on your machine. From this point, you can hit the [API endpoints](https://github.com/jmorganca/ollama/blob/main/docs/api.md) for completions and dealing with your models. In the next article, I'll implement a terminal client that interacts with this API in order to make inferences. It'll be a terminal helper called "Jeeves", like the butler. The client will simply make HTTP requests via this API and streaming JSON responses will be returned to the client for the user to see.

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/ollama-pic_jl5Owspnw.png?updatedAt=1701448024965" width={860} height={392} alt="photo 2" />

The `Zephyr 7B Beta` model is awesome in terms of its capability. Not too long ago, we couldn't even dream of having reliable small models to host on our own, but the tech is moving so fast that it's hard to keep up with. The folks at HuggingFace fine tuned the awesome `Mistral AI` model with publicly available data, so now the model is even more helpful.
