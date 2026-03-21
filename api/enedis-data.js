// api/enedis-data.js
// Récupère les données Linky avec un access_token existant
// Appelé par l'app pour rafraîchir les données
//
// Usage : POST /api/enedis-data
// Body  : { access_token, pdl, type, start, end }

export default async function handler(req, res) {
  // CORS — autoriser uniquement votre domaine
  res.setHeader('Access-Control-Allow-Origin', 'https://nergie.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { access_token, pdl, type = 'daily_consumption', start, end } = req.body;

  if (!access_token || !pdl) {
    return res.status(400).json({ error: 'access_token et pdl requis' });
  }

  // Dates par défaut : 30 derniers jours
  const today    = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const fmt = d => new Date(d).toISOString().split('T')[0];

  const startDate = start ? fmt(start) : fmt(thirtyDaysAgo);
  const endDate   = end   ? fmt(end)   : fmt(today);

  // Types disponibles dans l'API Enedis v5
  const endpoints = {
    daily_consumption:       'daily_consumption',
    daily_production:        'daily_production',
    consumption_load_curve:  'consumption_load_curve',  // courbe 30min
    production_load_curve:   'production_load_curve',
    daily_consumption_max_power: 'daily_consumption_max_power',
  };

  const endpoint = endpoints[type] || 'daily_consumption';

  try {
    const url =
      `https://mon-compte-particulier.enedis.fr/metering_data/v5/${endpoint}` +
      `?usage_point_id=${pdl}&start=${startDate}&end=${endDate}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept:        'application/json',
      },
    });

    // Token expiré → demander reconnexion
    if (response.status === 401) {
      return res.status(401).json({
        error: 'token_expired',
        message: 'Reconnexion nécessaire'
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('Enedis API error:', response.status, errText);
      return res.status(response.status).json({
        error: 'enedis_error',
        status: response.status,
      });
    }

    const data = await response.json();

    // Ajouter des métadonnées utiles
    res.status(200).json({
      success: true,
      pdl,
      type,
      start: startDate,
      end: endDate,
      fetched_at: new Date().toISOString(),
      data,
    });

  } catch (err) {
    console.error('enedis-data error:', err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
}
