---
draft: false
title: "Learn how to encrypt files in Rust"
snippet: "This is a demonstration of the 'age' crate that uses ChaCha20Poly1305 AEAD encryption with x25519 asymmetric keys"
image:
  {
    src: "https://ik.imagekit.io/xbkhabiqcy9/img/leaf_xPemi4I6k.webp?updatedAt=1680105048710",
    alt: "header image",
  }
publishDate: "2023-08-06 01:39"
category: "Tutorials"
author: "CM-IV"
tags: [rust, file-encryption, how-to]
---

This will be a quick overview demonstrating how to use a few of my favorite crates. The crates you'll need to add to your `config.toml` are shown below:

```toml

...

[dependencies]
age = "0.9.2"
camino = "1.1.6"
dirs = "5.0.1"
inquire = { git = "https://github.com/mikaelmello/inquire", rev = "6b85740ef69009721f37cee1028c010421438215" }
owo-colors = "3.5.0"

# optimize for size
[profile.release]
strip = true
lto = true
opt-level = "z"
debug = 0
overflow-checks = false
panic = "abort"
codegen-units = 1
```

The `age` crate is the star of the show, it's how we'll actually encrypt the file that we provide the path to on our local drive. The `camino` and `dirs` crates make it easier dealing with those file paths, the `/home/$USER/Downloads` path in particular. The `camino` crate converts those `PathBuf` types into UTF-8 compatible ones for us. The `inquire` crate, which uses a git revision to pull into our program, gives us the terminal prompts we need to get the required data.

I'll be encrypting an image of a zucchini plant today, here's what that looks like before:

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/zucchini_6UZPzngqm.png?updatedAt=1691321878052" width={860} height={392} alt="photo 1" />

The `encrypt_file()` function that does the heavy lifting takes in a `age::x25519::Recipient` public key in order to encrypt the file buffer. The private key `age::x25519::Identity` that was used to generate that public key can be later used to decrypt the file in a `decrypt_file()` function. Once the program is run by using `cargo run`, we get the following output in the terminal:

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/file_enc2_IwlA0OYd7.png?updatedAt=1691321877511" width={860} height={392} alt="photo 2" />

Here's what the encrypted result looks like afterwards, unreadable data basically:

<img class="image" src="https://ik.imagekit.io/xbkhabiqcy9/img/file_enc3_Qca0g578m.png?updatedAt=1691321956668" width={860} height={392} alt="photo 3" />

The encrypted file, as per the [specification](https://github.com/C2SP/C2SP/blob/main/age.md), is composed of two parts - a header with the file key and the encrypted binary payload. You can store this file on your cloud storage or wherever you backup your data for safe keeping, whoever has access to the private `x25519` key that we generate within the `main()` function can decrypt the file.

Here is the code for the `encrypt_file()` function:

```rust
fn encrypt_file(public_key: Recipient) {
    let file: Utf8PathBuf = inquire::Text::new("Enter the path to the file for encryption")
        .with_validator(required!())
        .with_help_message("Enter the path to the file you want encrypted")
        .prompt()
        .unwrap()
        .into();

    if !file.is_file() {
        println!(
            "{}",
            "\nThe file either does not exist or this isn't a file\n".red()
        );

        return;
    }

    println!("{}", "Encrypting...".yellow());

    let encrypted = {
        let encryptor = age::Encryptor::with_recipients(vec![Box::new(public_key)])
            .expect("we provided a recipient");

        let f = File::open(file.as_path()).unwrap();
        let mut reader = BufReader::new(f);
        let mut buffer = Vec::new();
        reader.read_to_end(&mut buffer).unwrap();

        let mut encrypted = vec![];
        let mut writer = encryptor.wrap_output(&mut encrypted).unwrap();
        writer.write_all(&buffer).unwrap();
        writer.finish().unwrap();

        encrypted
    };

    let dir = dirs::download_dir().expect("Couldn't get downloads dir!");
    let path = Utf8PathBuf::from_path_buf(dir).unwrap();
    let dest = format!("{}/{}.age", path, file.file_name().unwrap());

    let mut writer = File::create(&dest).unwrap();

    writer.write_all(encrypted.as_slice()).unwrap();

    println!("{}", "\nFile successfully encrypted!\n".green());

}
```
