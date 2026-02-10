const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/promotions/tracking-links/${bundle.inputData.trackingLinkId}`,
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
  key: 'promotions_tracking_links_2',
  noun: '2',
  display: {
    label: 'Find Get tracking link',
    description: 'Get details of a specific tracking link **Permission Required:** `promotions:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'trackingLinkId',
      label: 'Tracking Link Id',
      type: 'string',
      required: true,
      helpText: 'Tracking link ID',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
