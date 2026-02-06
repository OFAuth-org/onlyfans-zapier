const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/analytics/mass-messages/${bundle.inputData.massMessageId}/buyers`,
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
  key: 'analytics_mass_messages_buyers',
  noun: 'Buyers',
  display: {
    label: 'Find Mass message buyers',
    description: 'Get list of users who purchased a specific mass message **Permission Required:** `analytics:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'massMessageId',
      label: 'Mass Message Id',
      type: 'string',
      required: true,
      helpText: 'Mass message ID',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Number of items to return (1-20, default: 10)',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'Number of items to skip (default: 0)',
    },
    {
      key: 'marker',
      label: 'Marker',
      type: 'integer',
      required: false,
      helpText: 'Pagination marker from previous response',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
