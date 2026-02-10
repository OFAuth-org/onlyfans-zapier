const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/trials/chart',
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
  key: 'analytics_trials_chart',
  noun: 'Chart',
  display: {
    label: 'Trials chart',
    description: 'Get time-series trial link performance data **Permission Required:** `analytics:read`',
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
      key: 'withTotal',
      label: 'With Total',
      type: 'boolean',
      required: false,
      helpText: 'Include total count in response',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
