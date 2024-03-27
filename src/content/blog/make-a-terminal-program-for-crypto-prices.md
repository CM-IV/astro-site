---
draft: false
title: "A crypto price fetcher in the terminal with Rust"
snippet: "A demonstration of Rust's serde crate"
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/Monero_-MUpsURqgkn.webp?updatedAt=1637523223793",
    alt: "full stack web development",
  }
publishDate: "2023-03-09 11:39"
category: "Tutorials"
author: "CM-IV"
tags: [rust, crypto, prices]
---

I have been learning Rust lately and soaking it up like a sponge. I figured one day, why not make a simple terminal application that fetches price data from the public [Kraken](https://www.kraken.com/) REST API. In the process of making this program, I'll show off using one of my favorite error handling crates to simplify things.

The crates needed for this program are as follows:

```toml
[dependencies]
color-eyre = "0.6.2"
reqwest = { version = "0.11.13", features = ["json"] }
serde = { version = "1.0.152", features = ["derive"] }
serde_json = "1.0.91"
tokio = { version = "1.24.1", features = ["full"] }

```

`Color-eyre` handles error reports for me in a colorful way, so I tend to go with it whenever I'm not using the `Anyhow` crate. `Color-eyre` stays consistent with error reports and help to improve the already excellent Rust compiler in its errors. The `reqwest` crate is listed here with json functionality since that is the shape of the data we are working with here. `Reqwest` is the HTTP client that handles the work for us when it comes to communicating with the REST API. I'm going to be using the `tokio` crate along with it as the asynchronous runtime, meaning we won't have to use the synchronous blocking client that `reqwest` provides already.

The `serde` and `serde_json` crates are very important for this project, since without them I cannot serialize/de-serialize data to and from JSON. Today, I'll be using these crates in order to work with a typed Rust data structure (struct). This will ensure that the data conforms to a particular structure and shape in order to get the work done and ensure that once the program is compiled that there are no errors. `Serde_json` is used alongside `reqwest` so that any valid JSON value is assigned to a variable. Afterwards, with `serde` the data is then taken from that variable and given a shape of struct `Ticker`. The value is interpreted as an instance of the type `Ticker` via `serde`.

```rust
use color_eyre::eyre::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Ticker {
    a: Vec<String>,
    b: Vec<String>,
    c: Vec<String>,
    v: Vec<String>,
    p: Vec<String>,
    t: Vec<i32>,
    l: Vec<String>,
    h: Vec<String>,
    o: String,
}

#[tokio::main]
async fn main() -> Result<()> {

    color_eyre::install()?;

    let data: serde_json::Value = reqwest::Client::new()
        .get("https://api.kraken.com/0/public/Ticker?pair=XMRUSD")
        .send()
        .await?
        .json()
        .await?;

    let ticker: Ticker = serde_json::from_value(data["result"]["XXMRZUSD"].clone())?;

    ...
```

Once this has taken place, getting the price information we want about the best cryptocurrency is a simple affair. I access the zero element of the vector that is of type `Ticker` and then convert that to a 64-bit float value. This value is what is returned to the user via `println!()`.

```rust
    let xmr_data = ticker.a[0].to_string();

    let money = xmr_data.parse::<f64>()?;

    println!("Monero's value for today is: ${:#?}", money);

    Ok(())

}
```
