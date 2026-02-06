const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/earnings/transactions',
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
  key: 'earnings_transactions',
  noun: 'Transactions',
  display: {
    label: 'List transactions',
    description: 'Get a list of earnings transactions **Permission Required:** `earnings:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'string',
      required: false,
      helpText: 'Start date for transactions',
    },
    {
      key: 'marker',
      label: 'Marker',
      type: 'string',
      required: false,
      helpText: 'Pagination marker from previous response',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'string',
      required: false,
      choices: ['subscribes', 'chat_messages', 'post', 'stream', 'tips'],
      helpText: 'Transaction type filter',
    },
    {
      key: 'tipsSource',
      label: 'Tips Source',
      type: 'string',
      required: false,
      choices: ['chat', 'post_all', 'profile', 'story', 'stream'],
      helpText: 'Tips source filter (when type=tips)',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
