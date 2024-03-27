---
draft: false
title: Gzip file compression with Rust
snippet: I'll show you how to compress multiple files into a single archive with the 'flate2' crate
image:
  src: https://ik.imagekit.io/xbkhabiqcy9/img/_DSC8169_8oWADrgYFV.webp?updatedAt=1680619771761
  alt: preview image
publishDate: 08/08/2023, 8:29 AM
category: Tutorials
author: CM-IV
tags:
  - file-compression
  - rust
  - how-to
slug: gzip-file-compression-rust
---

Let's assume you want to quickly compress multiple documents or files in one place on Linux. To accomplish this, utilize the `tar` crate to generate a tarball archive on the local file system. Subsequently, employ the `gzip` backend for compression, achieving a well-balanced combination of speed and reduced storage space for the final output. This example employs the `flate2` crate, specifically utilizing `write::GzEncoder`, to craft the gzip archive.

For obtaining a `Vec<PathBuf>`—a vector containing file paths for the files intended for compression—you can make use of the `fltk` crate alongside the `dialog::NativeFileChooserType::BrowseMultiFile` file picker. The `fltk` crate functions as a lightweight GUI library, which I personally prefer for my projects due to its simplicity and powerful capabilities. It proves to be both easy to setup and work with, offering a wide range of builtin components for use. In this process, I will also incorporate familiar crates I've previously utilized: `camino` and `dirs` for handling file system directories and transforming them into UTF-8 compatible `PathBuf`s. Once the files are traversed and formed into a tarball, the resulting tarball data (a byte vector) is then employed alongside the aforementioned `GzEncoder` to generate a compressed `gzip` tarball.

The following code block shows the project implementation:

```rust
use std::{fs::File, io::Write};

use camino::Utf8PathBuf;
use flate2::{write::GzEncoder, Compression};
use fltk::{prelude::*, *};

fn main() {
    let app = app::App::default();
    let mut wind = window::Window::default().with_size(400, 300);

    let mut btn = button::Button::default()
        .with_size(80, 30)
        .with_label("Select file")
        .center_of_parent();

    wind.end();
    wind.show();

    btn.set_callback(|_| {
        let mut dialog = dialog::NativeFileChooser::new(dialog::NativeFileChooserType::BrowseMultiFile);
        dialog.show();

        let mut ar = tar::Builder::new(Vec::with_capacity(dialog.filenames().len()));

        for path in dialog.filenames() {
            let utf8_pathbuf = Utf8PathBuf::from_path_buf(path).unwrap();

            let mut input_file = File::open(utf8_pathbuf.as_path()).unwrap();

            ar.append_file(utf8_pathbuf.file_name().unwrap(), &mut input_file).unwrap();
        }

        let tar_data = ar.get_ref();

        let dir = dirs::download_dir().expect("Couldn't get downloads dir!");
        let mut output_path = Utf8PathBuf::from_path_buf(dir).unwrap();
        output_path.push("comp.tar.gz");

        let output_file = File::create(&output_path).unwrap();
        let mut gz_encoder = GzEncoder::new(output_file, Compression::default());
        gz_encoder.write_all(&tar_data).unwrap();
        gz_encoder.finish().unwrap();

        dialog::message_default("Files compressed!");
    });

    app.run().unwrap();
}
```

There is only one single button shown when the program is running that prompts the user to select a file (or multiple files) to compress via the set callback function within the code. This is where the meat of the application resides, as the application comes to life once that button is pressed.
