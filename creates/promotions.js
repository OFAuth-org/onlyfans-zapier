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
    url: 'https://api-next.ofauth.com/v2/access/promotions',
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
  key: 'promotions',
  noun: 'Promotions',
  display: {
    label: 'Create promotion',
    description: 'Create a new promotion **Permission Required:** `promotions:write`',
  },
  operation: {
    inputFields: [
    {
      key: 'body_discount',
      label: 'Discount',
      type: 'integer',
      required: true,
      helpText: 'Discount percentage to offer',
    },
    {
      key: 'body_finishDays',
      label: 'Finish Days',
      type: 'integer',
      required: true,
      helpText: 'Days until promotion ends',
    },
    {
      key: 'body_message',
      label: 'Message',
      type: 'string',
      required: true,
      helpText: 'Promotion message',
    },
    {
      key: 'body_subscribeCounts',
      label: 'Subscribe Counts',
      type: 'integer',
      required: true,
      helpText: 'Maximum subscribers',
    },
    {
      key: 'body_subscribeDays',
      label: 'Subscribe Days',
      type: 'integer',
      required: true,
      helpText: 'Subscription duration in days',
    },
    {
      key: 'body_type',
      label: 'Type',
      type: 'string',
      required: true,
      helpText: 'Promotion types',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
