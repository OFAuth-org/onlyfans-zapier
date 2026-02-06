const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/self',
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
  key: 'self',
  noun: 'Self',
  display: {
    label: 'Get current user',
    description: 'Get current user **Permission Required:** `profile:read`',
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
