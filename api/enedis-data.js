// api/enedis-data.js
// ✅ URLs correctes : gw.prd.api.enedis.fr/v3

module.exports = async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin',  'https://nergie.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const body         = req.body || {};
  const access_token = body.access_token;
  const pdl          = body.pdl;
  const type         = body.type || 'daily_consumption';
  const start        = body.start || null;
  const end          = body.end   || null;

  if (!access_token || !pdl) {
    return res.status(400).json({ error: 'access_token et pdl requis' });
  }

  const fmt = function(d) { return new Date(d).toISOString().split('T')[0]; };

  const today = new Date();
  const ago30 = new Date(today);
  ago30.setDate(ago30.getDate() - 30);

  const startDate = start ? fmt(start) : fmt(ago30);
  const endDate   = end   ? fmt(end)   : fmt(today);

  // ✅ gw.prd.api.enedis.fr/v3 — URLs correctes confirmées
  const endpoints = {
    'daily_consumption':           'daily_consumption',
    'daily_consumption_max_power': 'consumption_max_power',
    'consumption_load_curve':      'consumption_load_curve',
  };

  const path = endpoints[type] || 'daily_consumption';

  const apiUrl =
    'https://gw.prd.api.enedis.fr/v3/metering_data/' + path +
    '?usage_point_id=' + pdl +
    '&start=' + startDate +
    '&end='   + endDate;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept':        'application/json',
      },
    });

    if (response.status === 401) {
      return res.status(401).json({ error: 'token_expired' });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('[enedis-data] Error:', response.status, errText);
      return res.status(response.status).json({ error: 'enedis_api_error', status: response.status });
    }

    const data = await response.json();
    return res.status(200).json({
      success:    true,
      pdl:        pdl,
      type:       type,
      start:      startDate,
      end:        endDate,
      fetched_at: new Date().toISOString(),
      data:       data,
    });

  } catch (err) {
    console.error('[enedis-data] Error:', err.message);
    return res.status(500).json({ error: 'server_error', message: err.message });
  }
};
