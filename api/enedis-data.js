// api/enedis-data.js
// Récupère des données Linky fraîches avec un access_token existant
// Appelé par l'app frontend pour rafraîchir les données
//
// Méthode : POST
// Body    : { access_token, pdl, type, start, end }

module.exports = async function handler(req, res) {

  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin',  'https://nergie.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body         = req.body || {};
  const access_token = body.access_token;
  const pdl          = body.pdl;
  const type         = body.type || 'daily_consumption';
  const start        = body.start || null;
  const end          = body.end   || null;

  if (!access_token || !pdl) {
    return res.status(400).json({
      error: 'access_token et pdl sont requis dans le body'
    });
  }

  if (!/^\d{14}$/.test(pdl)) {
    return res.status(400).json({ error: 'PDL invalide' });
  }

  // ── Dates par défaut : 30 derniers jours ──
  const fmt = function(d) {
    return new Date(d).toISOString().split('T')[0];
  };

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const startDate = start ? fmt(start) : fmt(thirtyDaysAgo);
  const endDate   = end   ? fmt(end)   : fmt(today);

  // ── Endpoints disponibles ──
  const validTypes = {
    'daily_consumption':           true,
    'daily_production':            true,
    'consumption_load_curve':      true,
    'production_load_curve':       true,
    'daily_consumption_max_power': true,
  };

  if (!validTypes[type]) {
    return res.status(400).json({
      error: 'Type invalide',
      valid: Object.keys(validTypes),
    });
  }

  const apiUrl =
    'https://gw.hml.api.enedis.fr/metering_data/v5/' + type +
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

    // Token expiré
    if (response.status === 401) {
      return res.status(401).json({
        error:   'token_expired',
        message: 'Reconnexion nécessaire',
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('[enedis-data] API error:', response.status, errText);
      return res.status(response.status).json({
        error:  'enedis_api_error',
        status: response.status,
      });
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
    console.error('[enedis-data] Unexpected error:', err.message);
    return res.status(500).json({
      error:   'server_error',
      message: err.message,
    });
  }
};
