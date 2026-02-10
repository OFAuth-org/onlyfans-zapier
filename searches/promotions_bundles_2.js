const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/promotions/bundles/${bundle.inputData.bundleId}`,
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
  key: 'promotions_bundles_2',
  noun: '2',
  display: {
    label: 'Find Get bundle',
    description: 'Get details of a specific subscription bundle **Permission Required:** `promotions:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'bundleId',
      label: 'Bundle Id',
      type: 'string',
      required: true,
      helpText: 'Bundle ID',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
