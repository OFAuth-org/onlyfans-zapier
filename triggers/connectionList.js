const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api-next.ofauth.com/v2/account/connections',
    headers: {
      apiKey: bundle.authData.apiKey,
    },
    params: {
      status: 'active',
      limit: 100,
    },
  });
  
  const data = response.data;
  const connections = data.list || data || [];
  
  return connections.map(conn => ({
    id: conn.id || conn.connectionId,
    name: conn.username || conn.name || conn.id,
  }));
};

module.exports = {
  key: 'connectionList',
  noun: 'Connection',
  display: {
    label: 'List Connections',
    description: 'List available connections',
    hidden: true,
  },
  operation: {
    perform,
    sample: {
      id: 'conn_123',
      name: 'Test Connection',
    },
  },
};
