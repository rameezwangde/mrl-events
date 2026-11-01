export default async function handler(req, res) {
  const clientId = process.env.PHONEPE_CLIENT_ID || '';
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET || '';
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '';
  const env = process.env.PHONEPE_ENV || '';

  const results = {};

  // Helper to test an auth endpoint
  async function testAuth(url) {
    try {
      const params = new URLSearchParams();
      params.append('client_id', clientId.trim());
      params.append('client_secret', clientSecret.trim());
      params.append('client_version', clientVersion.trim() || '1');
      params.append('grant_type', 'client_credentials');

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      const text = await response.text();
      let json = null;
      try { json = JSON.parse(text); } catch (e) {}

      return {
        status: response.status,
        statusText: response.statusText,
        data: json || text
      };
    } catch (err) {
      return { error: err.message };
    }
  }

  // Test Production Identity URL
  results.prod_identity = await testAuth('https://api.phonepe.com/apis/identity-manager/v1/oauth/token');

  // Test Sandbox Identity URL
  results.sandbox_pg = await testAuth('https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token');

  // Test Generic Sandbox Identity URL
  results.sandbox_identity = await testAuth('https://api-preprod.phonepe.com/apis/identity-manager/v1/oauth/token');

  return res.status(200).json({
    diagnostics: {
      env_set: env,
      clientId_preview: clientId ? `${clientId.slice(0, 4)}...${clientId.slice(-4)} (length: ${clientId.length})` : 'MISSING',
      clientSecret_preview: clientSecret ? `${clientSecret.slice(0, 4)}...${clientSecret.slice(-4)} (length: ${clientSecret.length})` : 'MISSING',
      clientVersion_preview: clientVersion || 'MISSING'
    },
    results
  });
}

