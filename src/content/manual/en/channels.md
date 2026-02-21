This tab manages various messaging channels connected to the app (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Viewing Channel List
You can see all connected channels and the status of each account at a glance.

- **Status Badge**: Displays states like `connected`, `disconnected`, or `error`.
- **Refresh**: Click the refresh button in the top right to get the latest status.

## Channel Login (QR Code)
You can initiate a web login to connect a specific channel.
By telling the AI avatar in the chat, "Start Discord web login," it will display a QR code or enter an authentication wait state if required.

## Discord Bot Integration

Sign in with your Discord account at [naia.nextain.io](https://naia.nextain.io) to automatically link your account. Once linked, you can chat directly with the AI avatar on Discord.

### How to Use
1. **Sign in with Discord** at naia.nextain.io
2. Click the bot invite link on **Settings > Integrations** page
3. **Select a server** to add the bot → approve permissions
4. **@mention the bot** in the server or **start a DM** to chat
5. Credits are automatically deducted from your naia.nextain.io account

### Features
- **Mention/DM detection**: The AI responds when you mention the bot or send a DM
- **Credit integration**: Credits from your naia.nextain.io account are used automatically
- **Unregistered user guidance**: Users without a linked account receive setup instructions
- **Rate limiting**: 10 messages per minute limit to protect your credits

## Google Chat Integration

Sign in with your Google account at naia.nextain.io to chat with the AI avatar through Google Chat.

### How to Use
1. **Sign in with Google** at naia.nextain.io
2. A Google Workspace admin **registers the naia Chat app**
3. Add the app in Google Chat and start chatting
4. Credits are automatically deducted from your naia.nextain.io account

## Messenger Notifications (Webhooks)
Naia OS inherits OpenClaw's powerful channel system.
By entering your Slack, Discord or Google Chat Webhook URL in the **Settings > Tools > Webhooks** menu or during the initial onboarding screen, the AI avatar can send you messages with the results of important tasks.

> **Tip:** "Let me know on Discord when this file backup is completely finished!"

## Advanced: Build a 24/7 Autonomous Bot
By utilizing the terminal command tool (`execute_command`), you can turn the AI avatar into a 24/7 autonomous agent that resides in Telegram or Discord, beyond just your desktop.

Command the AI avatar in the chat like this:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Now, even if you close the desktop app, you can chat with the AI avatar and assign tasks anytime through Telegram on your phone via the background OpenClaw Gateway.
