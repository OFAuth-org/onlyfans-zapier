# OFAuth Zapier Integration

Connect OFAuth to 5,000+ apps with Zapier. Automate your OnlyFans workflows without code.

## Overview

This Zapier integration allows you to:
- **Trigger** workflows when events happen (new subscribers, earnings, posts)
- **Search** for existing data (posts, messages, subscriptions)
- **Create** new content and actions (posts, messages, promotions)

## Authentication

The integration uses API Key authentication:

1. Go to your OFAuth dashboard
2. Generate an API key
3. Enter the API key when connecting your Zapier account

## Available Actions

### Triggers (Start a Zap when...)

| Trigger | Description |
|---------|-------------|
| **Account Info** | Account details changed |
| **Connection List** | New connection added |
| **Connection Status** | Connection status changed |
| **Self Profile** | Creator profile updated |
| **Self Notifications** | New notification received |
| **Earnings Chart** | New earnings data |
| **Earnings Transactions** | New transaction recorded |
| **Earnings Chargebacks** | New chargeback received |
| **Analytics Posts Chart** | New post analytics |
| **Analytics Posts Top** | Top posts updated |
| **Analytics Stories Chart** | New story analytics |
| **Analytics Stories Top** | Top stories updated |
| **Analytics Streams Chart** | New stream analytics |
| **Analytics Streams Top** | Top streams updated |
| **Analytics Mass Messages** | Mass message stats updated |
| **Analytics Promotions** | Promotion stats updated |

### Searches (Find existing data)

| Search | Description |
|--------|-------------|
| **Connection Settings** | Find connection settings |
| **Posts** | Search posts |
| **User Posts** | Find posts by user |
| **Chat Messages** | Search chat messages |
| **Chat Media** | Find media in chats |
| **Mass Messages** | Search mass messages |
| **Mass Message Buyers** | Find message buyers |
| **Analytics Posts** | Get post analytics |
| **Subscriptions** | Search subscriptions |
| **Subscription History** | Get subscription history |

### Creates (Perform actions)

| Action | Description |
|--------|-------------|
| **Create Post** | Create a new post |
| **Send Chat Message** | Send a message to a user |
| **Send Mass Message** | Send a mass message |
| **Create Tracking Link** | Create a tracking link |
| **Share Tracking Link** | Share tracking link access |
| **Create Trial Link** | Create a trial link |
| **Share Trial Link** | Share trial link access |
| **Create Promotion** | Create a promotion |
| **Finish Promotion** | End a promotion |
| **Create Bundle** | Create a subscription bundle |
| **Create User List** | Create a user list |
| **Add User to List** | Add a user to a list |
| **Restrict User** | Restrict a user |
| **Invalidate Connection** | Invalidate a connection |
| **Create Vault List** | Create a vault list |
| **Add Media to Vault** | Add media to vault list |
| **Initialize Link** | Initialize a connection link |
| **Sign Dynamic Rules** | Sign dynamic API rules |

## Setup

### 1. Install the Integration

The OFAuth integration can be installed from:
- The Zapier App Directory
- Direct invitation link from OFAuth

### 2. Connect Your Account

1. Create a new Zap
2. Search for "OFAuth" as your trigger or action app
3. Click "Connect Account"
4. Enter your OFAuth API key
5. Click "Continue"

### 3. Configure Connection ID

Most actions require a **Connection ID** to specify which OnlyFans account to use:

1. In your Zap, select the OFAuth trigger/action
2. Choose the Connection ID from the dropdown (populated from your connections)
3. Or enter a Connection ID dynamically from a previous step

## Example Zaps

### Auto-Post to Social Media
**Trigger:** OFAuth - New Post Created  
**Action:** Twitter - Create Tweet  
**Use Case:** Automatically share new OnlyFans posts on Twitter

### Track Earnings in Google Sheets
**Trigger:** OFAuth - New Transaction  
**Action:** Google Sheets - Create Row  
**Use Case:** Log all earnings to a spreadsheet for tracking

### Welcome New Subscribers
**Trigger:** OFAuth - New Subscriber  
**Action:** OFAuth - Send Chat Message  
**Use Case:** Automatically send a welcome message to new subscribers

### Chargeback Alerts
**Trigger:** OFAuth - New Chargeback  
**Action:** Slack - Send Message  
**Use Case:** Get instant Slack notifications for chargebacks

### Sync Subscribers to CRM
**Trigger:** OFAuth - New Subscriber  
**Action:** HubSpot - Create Contact  
**Use Case:** Add new subscribers to your CRM

## Field Mappings

### Common Input Fields

| Field | Type | Description |
|-------|------|-------------|
| `connectionId` | String | The OFAuth connection ID |
| `limit` | Number | Maximum results to return |
| `offset` | Number | Pagination offset |

### Date Fields

All date fields accept ISO 8601 format:
- `2024-01-15` (date only)
- `2024-01-15T10:30:00Z` (with time)

## Development

### Local Testing

```bash
cd packages/zapier

# Install dependencies
npm install

# Run tests
zapier test

# Validate the integration
zapier validate

# Push to Zapier
zapier push
```

### Project Structure

```
packages/zapier/
├── index.js           # Main app definition
├── authentication.js  # API key auth
├── triggers/          # Trigger definitions
├── searches/          # Search definitions
├── creates/           # Create action definitions
└── package.json       # Dependencies
```

### Adding New Actions

1. Create a new file in the appropriate folder (`triggers/`, `searches/`, or `creates/`)
2. Export the action definition
3. Import and register in `index.js`

```javascript
// creates/example.js
module.exports = {
  key: 'example',
  noun: 'Example',
  display: {
    label: 'Create Example',
    description: 'Creates an example resource',
  },
  operation: {
    inputFields: [
      { key: 'connectionId', required: true, label: 'Connection ID' },
      { key: 'name', required: true, label: 'Name' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        method: 'POST',
        url: 'https://api-next.ofauth.com/v2/access/example',
        headers: { 'x-connection-id': bundle.inputData.connectionId },
        body: { name: bundle.inputData.name },
      });
      return response.json;
    },
  },
};
```

## Support

- **Documentation:** https://docs.ofauth.com
- **API Reference:** https://api.ofauth.com/docs
- **Support:** support@ofauth.com

## License

MIT
