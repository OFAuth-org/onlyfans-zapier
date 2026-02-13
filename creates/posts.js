const perform = async (z, bundle) => {
  // Build body from body_* prefixed fields or use raw body
  let body = bundle.inputData.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { /* keep as string */ }
  }
  
  // Collect body_* fields into an object
  if (!body) {
    body = {};
    for (const [key, value] of Object.entries(bundle.inputData)) {
      if (key.startsWith('body_') && value !== undefined && value !== null && value !== '') {
        const fieldName = key.slice(5); // Remove 'body_' prefix
        // Convert camelCase back to original key format
        body[fieldName] = value;
      }
    }
  }
  
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/posts',
    method: 'POST',
    headers: {
      apiKey: bundle.authData.apiKey,
      'Content-Type': 'application/json',
      ...(bundle.inputData.connectionId && { 'x-connection-id': bundle.inputData.connectionId }),
    },
    body: body,
  });
  
  return response.data;
};

module.exports = {
  key: 'posts',
  noun: 'Posts',
  display: {
    label: 'Create post',
    description: 'Create post **Permission Required:** `posts:write`',
  },
  operation: {
    inputFields: [
    {
      key: 'body_text',
      label: 'Text',
      type: 'string',
      required: false,
      helpText: 'Text content. Supports markdown by default. See [Text Formatting Guide](/guides/how-to/text-formatting).',
    },
    {
      key: 'body_mediaItems',
      label: 'Media Items',
      type: 'string',
      required: false,
      helpText: 'Media references to attach. Accepts vault media IDs, upload references (mediaUploadId), or http(s) URLs. See [mediaItems reference](/guides/media-items).',
    },
    {
      key: 'body_isLockedText',
      label: 'Is Locked Text',
      type: 'boolean',
      required: false,
      helpText: 'Whether text is locked behind paywall (defaults to false).',
    },
    {
      key: 'body_price',
      label: 'Price',
      type: 'integer',
      required: false,
      helpText: 'Price to unlock message content (0 for free)',
    },
    {
      key: 'body_previewMediaCount',
      label: 'Preview Media Count',
      type: 'integer',
      required: false,
      helpText: 'How many items in mediaItems should be previews. Uses the first N items from left to right.',
    },
    {
      key: 'body_releaseForms',
      label: 'Release Forms',
      type: 'text',
      required: false,
      helpText: 'Release form participants',
    },
    {
      key: 'body_userTags',
      label: 'User Tags',
      type: 'string',
      required: false,
      helpText: 'Users to tag',
    },
    {
      key: 'body_isMarkdown',
      label: 'Is Markdown',
      type: 'boolean',
      required: false,
      helpText: 'Whether to parse text as markdown (default: true). See [Text Formatting Guide](/guides/how-to/text-formatting).',
    },
    {
      key: 'body_scheduledDate',
      label: 'Scheduled Date',
      type: 'string',
      required: false,
      helpText: 'When to publish the post (omit for immediate)',
    },
    {
      key: 'body_fundRaisingTargetAmount',
      label: 'Fund Raising Target Amount',
      type: 'integer',
      required: false,
      helpText: 'Target amount for fund raising post',
    },
    {
      key: 'body_fundRaisingTipsPresets',
      label: 'Fund Raising Tips Presets',
      type: 'string',
      required: false,
      helpText: 'Preset tip amounts for fund raising',
    },
    {
      key: 'body_expireAfter',
      label: 'Expire After',
      type: 'integer',
      required: false,
      helpText: 'Days until post expires (1-30)',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
