const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/analytics/posts/${bundle.inputData.postId}`,
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
  key: 'analytics_posts',
  noun: 'Posts',
  display: {
    label: 'Find Post stats',
    description: 'Get detailed stats for a specific post **Permission Required:** `analytics:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'postId',
      label: 'Post Id',
      type: 'string',
      required: true,
      helpText: 'OnlyFans post ID',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
