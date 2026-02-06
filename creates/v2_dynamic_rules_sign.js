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
    url: 'https://api-next.ofauth.com/v2/dynamic-rules/sign',
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
  key: 'v2_dynamic_rules_sign',
  noun: 'Sign',
  display: {
    label: 'Generate sign headers for a request',
    description: 'Generate sign headers for a request',
  },
  operation: {
    inputFields: [
    {
      key: 'body_endpoint',
      label: 'Endpoint',
      type: 'string',
      required: true,
      helpText: 'endpoint',
    },
    {
      key: 'body_time',
      label: 'Time',
      type: 'string',
      required: false,
      helpText: 'time',
    },
    {
      key: 'body_userId',
      label: 'User Id',
      type: 'string',
      required: false,
      helpText: 'user-id',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
