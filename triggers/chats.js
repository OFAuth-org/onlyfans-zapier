const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/access/chats',
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
  key: 'chats',
  noun: 'Chats',
  display: {
    label: 'Chats list',
    description: 'Chats list **Permission Required:** `messages:read`',
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
      key: 'order',
      label: 'Order',
      type: 'string',
      required: false,
      choices: ['recent', 'old'],
      helpText: 'Sort order: recent (newest first) or old (oldest first)',
    },
    {
      key: 'filter',
      label: 'Filter',
      type: 'string',
      required: false,
      choices: ['priority', 'who_tipped', 'unread'],
      helpText: 'Filter chats by type',
    },
    {
      key: 'query',
      label: 'Query',
      type: 'string',
      required: false,
      helpText: 'Search/filter text',
    },
    {
      key: 'userListId',
      label: 'User List Id',
      type: 'integer',
      required: false,
      helpText: 'Filter to specific user list',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
