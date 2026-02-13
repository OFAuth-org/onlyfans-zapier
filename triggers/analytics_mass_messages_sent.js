const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/mass-messages/sent',
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
  key: 'analytics_mass_messages_sent',
  noun: 'Sent',
  display: {
    label: 'Sent mass messages',
    description: 'Get stats for sent mass messages **Permission Required:** `analytics:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'string',
      required: false,
      helpText: 'Start of date range (ISO 8601)',
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'string',
      required: false,
      helpText: 'End of date range (ISO 8601)',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Max number of items to return',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
