const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/self/release-forms',
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
  key: 'self_release_forms',
  noun: 'Forms',
  display: {
    label: 'List release forms',
    description: 'List release forms **Permission Required:** `profile:read`',
  },
  operation: {
    inputFields: [
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
      key: 'filter',
      label: 'Filter',
      type: 'string',
      required: false,
      choices: ['all', 'pending'],
      helpText: 'Filter: all forms or only pending',
    },
    {
      key: 'sortBy',
      label: 'Sort By',
      type: 'string',
      required: false,
      choices: ['date', 'name'],
      helpText: 'Sort by date or name',
    },
    {
      key: 'sortDirection',
      label: 'Sort Direction',
      type: 'string',
      required: false,
      choices: ['asc', 'desc'],
      helpText: 'Sort direction',
    },
    {
      key: 'search',
      label: 'Search',
      type: 'string',
      required: false,
      helpText: 'Search/filter text',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
