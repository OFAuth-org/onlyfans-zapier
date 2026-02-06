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
    url: 'https://api-next.ofauth.com/v2/link/init',
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
  key: 'v2_link_init',
  noun: 'Init',
  display: {
    label: 'Initialize a Link session',
    description: 'Initialize a hosted Link session for authentication.',
  },
  operation: {
    inputFields: [
    {
      key: 'body_redirectUrl',
      label: 'Redirect Url',
      type: 'string',
      required: false,
      helpText: 'URL to redirect to after completion. If omitted, uses first allowed redirect URI.',
    },
    {
      key: 'body_clientReferenceId',
      label: 'Client Reference Id',
      type: 'string',
      required: false,
      helpText: 'Your internal reference ID for webhook correlation.',
    },
    {
      key: 'body_connectionId',
      label: 'Connection Id',
      type: 'string',
      required: false,
      helpText: 'Existing connection ID to reconnect.',
    },
    {
      key: 'body_geolocation',
      label: 'Geolocation',
      type: 'text',
      required: false,
      helpText: 'geolocation',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
