---
draft: false
title: Sudo, but with Rust
snippet: A short blog post showing how to use the Rust re-implementation of Sudo
image:
  src: https://ik.imagekit.io/xbkhabiqcy9/img/sudo_AWbrYB_Tq.png?updatedAt=1693440366734
  alt: screenshot of sudo terminal command
publishDate: 08/30/2023, 6:18 PM
category: Tutorials
author: CM-IV
tags:
  - how-to
  - rust
  - sudo
---

**Disclaimer**: You aren't paying me to be your cybersecurity advisor, **do the following at your peril!**

The fine folks at [Prossimo](https://www.memorysafety.org) just announced their first release of a memory-safe version of `sudo` written in [Rust](https://www.rust-lang.org/) (their blog post announcing the milestone can be found [here](https://www.memorysafety.org/blog/sudo-first-stable-release/)). This development will ultimately lead to an entire class of bugs being avoided altogether or caught during compile time. Let's test it out.

So I have spun up a Debian 12 virtual machine via [QEMU](https://www.qemu.org/) and [Virtual Machine Manager](https://virt-manager.org/) for this test. The `sudo` that comes with a Debian GNU/Linux distribution resides in the `/usr/bin` directory. I'll be renaming both the `su` and `sudo` executables there to `su.disabled` and `sudo.disabled` here shortly, but first I'll clone the GitHub repository with SSH to the system: `git clone git@github.com:memorysafety/sudo-rs.git`.

The docs state that the MSRV for this project is `v1.70.0`, so you'll need to get that installed if you're a madman and want to follow along. Issue a simple `cargo build --release` command to the terminal and after a few seconds I have the new memory-safe `su` and `sudo` binaries within the `/target/release` directory. I'd like to issue a few commands here, first I'll fire off `sudo chmod u+s` for the respective binaries to set the `setuid` flag. I then move the binaries to the `/usr/local/bin` directory with the `sudo` command. Once this is done, I can make a bash alias to the sudo command that leads to the new memory-safe binaries.

Finally, I renamed the old `su` and `sudo binaries` to have a `.disabled` ending to them instead of outright deleting them. Viola, you now have a memory-safe version of `sudo` ready to go.
