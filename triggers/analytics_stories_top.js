const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/stories/top',
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
  key: 'analytics_stories_top',
  noun: 'Top',
  display: {
    label: 'Top stories',
    description: 'Get top performing stories **Permission Required:** `analytics:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'by',
      label: 'By',
      type: 'string',
      required: false,
      choices: ['tips', 'views', 'likes', 'comments'],
      helpText: 'Metric to rank by',
    },
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
      helpText: 'Number of items to return (1-20, default: 20)',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'Number of items to skip (default: 0)',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
