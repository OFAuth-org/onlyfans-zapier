const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/account/settings',
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
  key: 'settings',
  noun: 'Settings',
  display: {
    label: 'Get organization settings',
    description: 'Get settings for the organization including Vault+ configuration',
  },
  operation: {
    inputFields: [

    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
