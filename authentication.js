const authentication = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'string',
      required: true,
      helpText: 'Your OFAuth API key from the dashboard',
    },
    {
      key: 'connectionId',
      label: 'Connection ID',
      type: 'string',
      required: false,
      helpText: 'Optional default connection ID for access operations',
    },
  ],
  test: async (z, bundle) => {
    const response = await z.request({
      url: 'https://api-next.ofauth.com/v2/account/whoami',
      headers: {
        apiKey: bundle.authData.apiKey,
      },
    });
    return response.data;
  },
  connectionLabel: (z, bundle) => {
    return bundle.inputData.name || 'OFAuth Account';
  },
};

module.exports = authentication;
