const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/stories/chart',
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
  key: 'analytics_stories_chart',
  noun: 'Chart',
  display: {
    label: 'Stories chart',
    description: 'Get time-series story performance data **Permission Required:** `analytics:read`',
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
    },
    {
      key: 'by',
      label: 'By',
      type: 'string',
      required: false,
      choices: ['tips', 'stories', 'views', 'likes', 'comments'],
      helpText: 'Metric to chart',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
