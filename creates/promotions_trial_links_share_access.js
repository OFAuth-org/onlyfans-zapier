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
    url: 'https://api-next.ofauth.com/v2/access/promotions/trial-links/share-access',
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
  key: 'promotions_trial_links_share_access',
  noun: 'Access',
  display: {
    label: 'Share trial link access',
    description: 'Share trial link access with a user **Permission Required:** `promotions:write`',
  },
  operation: {
    inputFields: [
    {
      key: 'body_trialId',
      label: 'Trial Id',
      type: 'integer',
      required: true,
      helpText: 'Trial ID to share',
    },
    {
      key: 'body_userId',
      label: 'User Id',
      type: 'integer',
      required: true,
      helpText: 'User ID to share with',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
