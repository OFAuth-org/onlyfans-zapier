const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/users/${bundle.inputData.userId}/posts`,
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
  key: 'users_posts',
  noun: 'Posts',
  display: {
    label: 'Find List user posts',
    description: 'List user posts **Permission Required:** `posts:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'userId',
      label: 'User Id',
      type: 'string',
      required: true,
      helpText: 'User ID (numeric or username)',
    },
    {
      key: 'limit',
      label: 'Limit',
      type: 'integer',
      required: false,
      helpText: 'Number of posts to return (1-10)',
    },
    {
      key: 'sortBy',
      label: 'Sort By',
      type: 'string',
      required: false,
      choices: ['publish_date', 'tips', 'favorites_count'],
      helpText: 'Sort posts by: publish_date, tips, or favorites_count',
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
      key: 'pinned',
      label: 'Pinned',
      type: 'boolean',
      required: false,
      helpText: 'Include pinned posts',
    },
    {
      key: 'includePostCounts',
      label: 'Include Post Counts',
      type: 'boolean',
      required: false,
      helpText: 'Include engagement counts',
    },
    {
      key: 'beforePublishTime',
      label: 'Before Publish Time',
      type: 'string',
      required: false,
      helpText: 'Pagination cursor: get posts before this time',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
