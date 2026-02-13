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
    url: 'https://api-next.ofauth.com/v2/access/promotions/trial-links',
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
  key: 'promotions_trial_links',
  noun: 'Links',
  display: {
    label: 'Create trial link',
    description: 'Create a new trial link **Permission Required:** `promotions:write`',
  },
  operation: {
    inputFields: [
    {
      key: 'body_trialLinkName',
      label: 'Trial Link Name',
      type: 'string',
      required: true,
      helpText: 'Name for the trial link',
    },
    {
      key: 'body_subscribeDays',
      label: 'Subscribe Days',
      type: 'integer',
      required: true,
      helpText: 'Number of days for trial subscription',
    },
    {
      key: 'body_subscribeCounts',
      label: 'Subscribe Counts',
      type: 'integer',
      required: false,
      helpText: 'Maximum number of times trial can be claimed',
    },
    {
      key: 'body_expiredAt',
      label: 'Expired At',
      type: 'string',
      required: false,
      helpText: 'When the trial link expires',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
