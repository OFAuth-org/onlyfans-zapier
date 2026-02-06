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
    url: 'https://api-next.ofauth.com/v2/vault/cache/list/:listId',
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
  key: 'v2_vault_cache_list_post',
  noun: 'Post',
  display: {
    label: 'Cache all media from a vault list',
    description: 'Queue caching of all media items from a specific vault list',
  },
  operation: {
    inputFields: [
    {
      key: 'connectionId',
      label: 'Connection ID',
      type: 'string',
      required: true,
      helpText: 'The connection ID for this operation',
      dynamic: 'connectionList.id.name',
    },
    {
      key: 'listId',
      label: 'List Id',
      type: 'string',
      required: true,
      helpText: 'listId',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
