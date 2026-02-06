const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/self/notifications',
    method: 'GET',
    headers: {
      apiKey: bundle.authData.apiKey,
      ...(bundle.inputData.connectionId && { 'x-connection-id': bundle.inputData.connectionId }),
    },
    params: {
      limit: bundle.inputData.limit || 20,
      offset: bundle.inputData.offset || 0,
    },
  });
  
  // Return array of items
  const data = response.data;
  return Array.isArray(data) ? data : (data.list || [data]);
};

module.exports = {
  key: 'self_notifications',
  noun: 'Notifications',
  display: {
    label: 'List notifications',
    description: 'List notifications **Permission Required:** `notifications:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Number of items to return (1-20, default: 10)',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'Number of items to skip (default: 0)',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'string',
      required: false,
      choices: ['subscribed', 'purchases', 'tip', 'post', 'commented', 'mentioned', 'favorited', 'message'],
      helpText: 'Filter by notification type',
    },
    {
      key: 'relatedUsername',
      label: 'Related Username',
      type: 'string',
      required: false,
      helpText: 'Filter notifications related to this user',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
