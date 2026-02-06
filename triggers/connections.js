const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/account/connections',
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
  key: 'connections',
  noun: 'Connections',
  display: {
    label: 'List connections',
    description: 'List connections for your organization',
  },
  operation: {
    inputFields: [
    {
      key: 'status',
      label: 'Status',
      type: 'string',
      required: false,
      choices: ['active', 'expired', 'awaiting_2fa'],
      helpText: 'status',
    },
    {
      key: 'imported',
      label: 'Imported',
      type: 'string',
      required: false,
      choices: ['true', 'false'],
      helpText: 'imported',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'limit',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'offset',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
