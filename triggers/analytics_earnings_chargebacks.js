const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/earnings/chargebacks',
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
  key: 'analytics_earnings_chargebacks',
  noun: 'Chargebacks',
  display: {
    label: 'Chargebacks',
    description: 'Get a list of chargebacks **Permission Required:** `earnings:read`',
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
      key: 'marker',
      label: 'Marker',
      type: 'string',
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
