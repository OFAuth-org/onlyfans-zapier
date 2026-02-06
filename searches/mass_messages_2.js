const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/mass-messages/${bundle.inputData.massMessageId}`,
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
  key: 'mass_messages_2',
  noun: '2',
  display: {
    label: 'Find Get mass message',
    description: 'Get details of a specific mass message **Permission Required:** `messages:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'massMessageId',
      label: 'Mass Message Id',
      type: 'string',
      required: true,
      helpText: 'massMessageId',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
