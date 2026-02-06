const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/subscriptions/${bundle.inputData.subscriptionId}`,
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
  key: 'subscriptions',
  noun: 'Subscriptions',
  display: {
    label: 'Find Get subscription',
    description: 'Get details of a specific subscription **Permission Required:** `subscriptions:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'subscriptionId',
      label: 'Subscription Id',
      type: 'string',
      required: true,
      helpText: 'Subscription ID',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
