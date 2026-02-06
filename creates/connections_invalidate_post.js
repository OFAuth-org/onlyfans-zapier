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
    url: 'https://api-next.ofauth.com/v2/account/connections/{connectionId}/invalidate',
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
  key: 'connections_invalidate_post',
  noun: 'Post',
  display: {
    label: 'Invalidate connection',
    description: 'Invalidates a connection by marking it as expired and logging out the user. The connection record is preserved, allowing the user to reconnect with updated permissions.',
  },
  operation: {
    inputFields: [
    {
      key: 'connectionId',
      label: 'Connection Id',
      type: 'string',
      required: true,
      helpText: 'connectionId',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
