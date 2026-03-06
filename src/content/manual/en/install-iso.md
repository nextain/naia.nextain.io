This guide walks you through installing Naia OS from a live USB drive to your hard drive, from boot to running the Naia app.

## What You Need

- A USB drive (8 GB or larger) flashed with the Naia OS ISO
- A PC made within the last 10 years (most are compatible)
- At least 64 GB of disk space

> Download the ISO from the [Download page](/en/download).

---

## Create a Bootable USB Drive

Download the Naia OS ISO from the [Download page](/en/download), then write it to a USB drive.

We recommend **[balenaEtcher](https://etcher.balena.io)** — it works on Windows, macOS, and Linux.

1. Download and open balenaEtcher.
2. Click **Flash from file** and select the Naia OS ISO.
3. Click **Select target** and choose your USB drive.
4. Click **Flash!** and wait for it to finish.

> **Warning**: This will erase all data on the USB drive. Back up important files first.

## Boot from USB and Start Installation

For how to boot from USB, see **[2. Naia OS Live USB](/en/manual/live-usb)**.

You'll see an **Install to Hard Drive** icon on the top-left of the desktop. Double-click it to open the installation wizard.

## Step 1: Language & Keyboard

![Welcome screen](/images/manual/iso-install/01-welcome.png)

Select your preferred language and keyboard layout. Use the search box to filter (e.g., type "english"). Click **Next**.

## Step 2: Date and Time

![Date and time](/images/manual/iso-install/02-datetime.png)

Date, time, and timezone are automatically detected. Adjust if needed. Click **Next**.

## Step 3: Installation Method

![Installation method](/images/manual/iso-install/03-installation-method.png)

Select the target disk. **"Use entire disk"** is the recommended option — this will erase all existing data on the selected disk. Click **Next**.

> **Warning**: "Use entire disk" will erase everything on the selected drive. Back up important files first.

## Step 4: Storage Configuration

![Storage configuration](/images/manual/iso-install/04-storage.png)

You can choose to encrypt your disk. If you're not sure, just leave it unchecked and move on. Click **Next**.

## Step 5: Create Account

![Create account](/images/manual/iso-install/05-create-account.png)

Fill in your name, username, and passphrase (6+ characters).

![Account filled](/images/manual/iso-install/05b-account-filled.png)

Once all fields show green checkmarks, click **Next**.

## Step 6: Review and Install

![Review](/images/manual/iso-install/06-review.png)

Review your settings — check that the language, timezone, and account info look correct. Click **Erase data and install** to begin.

## Installation Progress

![Installing](/images/manual/iso-install/07-installing.png)

The installer proceeds through four stages: Storage configuration, Software installation, System configuration, and Finalization.

![Progress](/images/manual/iso-install/08-installing-progress.png)

> This typically takes **10–30 minutes** depending on your hardware. The "Software installation" stage is the longest — the screen may appear unchanged during this step. This is normal.

## Installation Complete

![Complete](/images/manual/iso-install/09-complete.png)

You'll see "Successfully installed." Click **Exit to live desktop**, then reboot. Remove the USB drive before restarting.

## First Boot — Login

![Login](/images/manual/iso-install/10-login.png)

After rebooting, the login screen appears. Enter the password you created during installation.

## First Boot — Naia App

![Naia app](/images/manual/iso-install/12-naia-app.png)

After login, **Naia launches automatically**. On first run, choose your preferred AI provider. Select a provider, configure your API key, and you're ready to go.

Welcome to Naia OS!
