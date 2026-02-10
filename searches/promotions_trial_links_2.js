const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://api-next.ofauth.com/v2/access/promotions/trial-links/${bundle.inputData.trialLinkId}`,
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
  key: 'promotions_trial_links_2',
  noun: '2',
  display: {
    label: 'Find Get trial link',
    description: 'Get details of a specific trial link **Permission Required:** `promotions:read`',
  },
  operation: {
    inputFields: [
    {
      key: 'trialLinkId',
      label: 'Trial Link Id',
      type: 'string',
      required: true,
      helpText: 'Trial link ID',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
