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
    url: 'https://api-next.ofauth.com/v2/account/connections/import',
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
  key: 'connections_import',
  noun: 'Import',
  display: {
    label: 'Import connection',
    description: 'Import an externally managed connection. Imported connections are not billed monthly and are not health-checked by the connection monitor. They can be used through the Access API immediately. The sess',
  },
  operation: {
    inputFields: [
    {
      key: 'body_clientReferenceId',
      label: 'Client Reference Id',
      type: 'string',
      required: false,
      helpText: 'Optional client reference ID for tracking.',
    },
    {
      key: 'body_cookie',
      label: 'Cookie',
      type: 'string',
      required: true,
      helpText: 'The OnlyFans session cookie string. Must contain `auth_id`, `sess`, and `fp` values.',
    },
    {
      key: 'body_permissions',
      label: 'Permissions',
      type: 'string',
      required: false,
      helpText: 'Permissions to grant. Defaults to organization permissions.',
    },
    {
      key: 'body_userAgent',
      label: 'User Agent',
      type: 'string',
      required: true,
      helpText: 'The user agent string that was used to create this session.',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
