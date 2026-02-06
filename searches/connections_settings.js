const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/account/connections/${bundle.inputData.connectionId}/settings`,
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
  key: 'connections_settings',
  noun: 'Settings',
  display: {
    label: 'Find Get connection settings',
    description: 'Get settings for a specific connection including Vault+ state',
  },
  operation: {
    inputFields: [
    {
      key: 'connectionId',
      label: 'Connection Id',
      type: 'string',
      required: true,
      helpText: 'connectionId',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
