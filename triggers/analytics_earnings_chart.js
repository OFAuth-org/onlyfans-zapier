const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/earnings/chart',
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
  key: 'analytics_earnings_chart',
  noun: 'Chart',
  display: {
    label: 'Earnings chart',
    description: 'Get time-series earnings data **Permission Required:** `earnings:read`',
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
      key: 'by',
      label: 'By',
      type: 'string',
      required: false,
      choices: ['total', 'messages', 'tips', 'stream', 'post', 'subscribes', 'tips_profile', 'tips_post', 'tips_chat', 'tips_stream', 'tips_story', 'ref'],
      helpText: 'Earnings type to chart',
    },
    {
      key: 'withTotal',
      label: 'With Total',
      type: 'boolean',
      required: false,
      helpText: 'Include total in response',
    },
    {
      key: 'monthlyTotal',
      label: 'Monthly Total',
      type: 'boolean',
      required: false,
      helpText: 'Include monthly totals',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
