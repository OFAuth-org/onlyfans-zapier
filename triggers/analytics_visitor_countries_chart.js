const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/analytics/visitor-countries/chart',
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
  key: 'analytics_visitor_countries_chart',
  noun: 'Chart',
  display: {
    label: 'Visitor countries chart',
    description: 'Get time-series visitor country data **Permission Required:** `analytics:read`',
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
      choices: ['guests', 'total', 'users'],
      helpText: 'Visitor metric to chart',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
