const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/chats/${bundle.inputData.userId}/media`,
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
  key: 'chats_media',
  noun: 'Media',
  display: {
    label: 'Find Get chat media',
    description: 'Get media from a chat. Use the `type` query parameter to filter by media type: \'photos\', \'videos\', or \'audios\'. Omit `type` to get all media. **Permission Required:** `messages:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'userId',
      label: 'User Id',
      type: 'string',
      required: true,
      helpText: 'userId',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Number of items to return (1-100, default: 10)',
    },
    {
      key: 'offset',
      label: 'Offset',
      type: 'integer',
      required: false,
      helpText: 'Number of items to skip (default: 0)',
    },
    {
      key: 'skipUsers',
      label: 'Skip Users',
      type: 'string',
      required: false,
      helpText: 'Users to skip',
    },
    {
      key: 'lastId',
      label: 'Last Id',
      type: 'string',
      required: false,
      helpText: 'Pagination cursor',
    },
    {
      key: 'opened',
      label: 'Opened',
      type: 'string',
      required: false,
      choices: ['0', '1', 'true', 'false'],
      helpText: 'Filter by opened status',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'string',
      required: false,
      choices: ['photos', 'videos', 'audios'],
      helpText: 'Filter by media type',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
