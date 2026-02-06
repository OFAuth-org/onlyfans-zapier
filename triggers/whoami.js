const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/account/whoami',
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
  key: 'whoami',
  noun: 'Whoami',
  display: {
    label: 'Whoami',
    description: 'Returns general account information for the API key\'s organization.',
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
