// api/callback.js
// Reçoit le code Enedis et récupère les données — URLs mises à jour 2025

module.exports = async function handler(req, res) {
  const code  = req.query && req.query.code;
  const pdl   = req.query && req.query.state;
  const error = req.query && req.query.error;

  if (error) {
    return res.redirect(302, '/?error=access_denied');
  }
  if (!code || !pdl) {
    return res.redirect(302, '/?error=missing_params');
  }

  const clientId     = process.env.ENEDIS_CLIENT_ID;
  const clientSecret = process.env.ENEDIS_CLIENT_SECRET;
  const redirectUri  = process.env.ENEDIS_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return res.redirect(302, '/?error=config_missing');
  }

  try {
    // ── 1. Échanger le code contre un access_token ──
    // ✅ Nouvelle URL token 2025
    const tokenUrl  = 'https://ext.prod.api.enedis.fr/oauth2/v3/token';
    const tokenBody = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     clientId,
      client_secret: clientSecret,
      code:          code,
      redirect_uri:  redirectUri,
    });

    const tokenRes = await fetch(tokenUrl + '?redirect_uri=' + encodeURIComponent(redirectUri), {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    tokenBody.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[callback] Token error:', tokenRes.status, errText);
      return res.redirect(302, '/?error=token_failed');
    }

    const tokenData                              = await tokenRes.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // ── 2. Récupérer 30 jours de consommation ──
    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 30);
    const fmt = function(d) { return d.toISOString().split('T')[0]; };

    // ✅ Nouvelle URL données 2025
    const dataUrl =
      'https://ext.prod.api.enedis.fr/metering_data_dc/v5/daily_consumption' +
      '?usage_point_id=' + pdl +
      '&start=' + fmt(start) +
      '&end='   + fmt(now);

    const dataRes = await fetch(dataUrl, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept':        'application/json',
      },
    });

    let energyData = null;
    if (dataRes.ok) {
      energyData = await dataRes.json();
    } else {
      console.error('[callback] Data error:', dataRes.status, await dataRes.text());
    }

    // ── 3. Encoder et rediriger ──
    const payload = Buffer.from(JSON.stringify({
      pdl:           pdl,
      access_token:  access_token,
      refresh_token: refresh_token || null,
      expires_at:    Date.now() + (expires_in || 3600) * 1000,
      data:          energyData,
    })).toString('base64');

    return res.redirect(302, '/?connected=true&payload=' + encodeURIComponent(payload));

  } catch (err) {
    console.error('[callback] Error:', err.message);
    return res.redirect(302, '/?error=server_error');
  }
};
