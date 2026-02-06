const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/subscriptions/${bundle.inputData.subscriptionId}/history`,
    method: 'GET',
    headers: {
      apiKey: bundle.authData.apiKey,
      ...(bundle.inputData.connectionId && { 'x-connection-id': bundle.inputData.connectionId }),
    },
    params: bundle.inputData,
  });
  
  const data = response.data;
  return Array.isArray(data) ? data : (data.list || [data]);
};

module.exports = {
  key: 'subscriptions_history',
  noun: 'History',
  display: {
    label: 'Find Get subscription history',
    description: 'Get subscription history for a specific subscription **Permission Required:** `subscriptions:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'subscriptionId',
      label: 'Subscription Id',
      type: 'string',
      required: true,
      helpText: 'Subscription ID',
    },
    {
      key: 'all',
      label: 'All',
      type: 'string',
      required: false,
      choices: ['0', '1', 'true', 'false'],
      helpText: 'Include all history (not just recent)',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
