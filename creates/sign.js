const perform = async (z, bundle) => {
  let body = bundle.inputData.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { /* keep as string */ }
  }
  
  const response = await z.request({
    url: 'https://api-next.ofauth.com/sign',
    method: 'POST',
    headers: {
      apiKey: bundle.authData.apiKey,
      'Content-Type': 'application/json',
      ...(bundle.inputData.connectionId && { 'x-connection-id': bundle.inputData.connectionId }),
    },
    body: body,
  });
  
  return response.data;
};

module.exports = {
  key: 'sign',
  noun: 'Sign',
  display: {
    label: 'Generate sign headers (Legacy)',
    description: 'Generate sign headers (Legacy)',
  },
  operation: {
    inputFields: [
    {
      key: 'body',
      label: 'Request Body',
      type: 'text',
      required: false,
      helpText: 'JSON request body',
    }
    ],
    perform,
    sample: {
      id: 1,
    },
  },
};
