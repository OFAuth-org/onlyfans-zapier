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
    url: 'https://api-next.ofauth.com/v2/access/vault/lists/:listId/media',
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
  key: 'vault_lists_media_post',
  noun: 'Post',
  display: {
    label: 'Add media to vault list',
    description: 'Add media to vault list **Permission Required:** `vault:write`',
  },
  operation: {
    inputFields: [
    {
      key: 'listId',
      label: 'List Id',
      type: 'string',
      required: true,
      helpText: 'listId',
    },
    {
      key: 'body_mediaIds',
      label: 'Media Ids',
      type: 'string',
      required: true,
      helpText: 'Media IDs to add to the list',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
