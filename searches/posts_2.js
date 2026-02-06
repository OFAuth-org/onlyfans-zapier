const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/posts/${bundle.inputData.postId}`,
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
  key: 'posts_2',
  noun: '2',
  display: {
    label: 'Find Get post',
    description: 'Get post **Permission Required:** `posts:read`',
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
