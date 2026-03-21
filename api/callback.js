// api/callback.js
// Enedis redirige ici après autorisation de l'utilisateur
// Échange le code contre un token, puis récupère les données

module.exports = async function handler(req, res) {
  const code  = req.query && req.query.code;
  const pdl   = req.query && req.query.state;
  const error = req.query && req.query.error;

  // L'utilisateur a refusé
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
    const tokenUrl  = 'https://gw.hml.api.enedis.fr/v1/oauth2/token';
    const tokenBody = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     clientId,
      client_secret: clientSecret,
      code:          code,
      redirect_uri:  redirectUri,
    });

    const tokenRes = await fetch(tokenUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    tokenBody.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('[callback] Token exchange failed:', tokenRes.status, errText);
      return res.redirect(302, '/?error=token_failed');
    }

    const tokenData = await tokenRes.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // ── 2. Récupérer 30 jours de consommation journalière ──
    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 30);

    const fmt = function(d) {
      return d.toISOString().split('T')[0]; // YYYY-MM-DD
    };

    const dataUrl =
      'https://gw.hml.api.enedis.fr/v5/metering_data/daily_consumption' +
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
      console.error('[callback] Data fetch failed:', dataRes.status);
    }

    // ── 3. Encoder et rediriger vers l'app ──
    const payload = Buffer.from(JSON.stringify({
      pdl:          pdl,
      access_token: access_token,
      refresh_token: refresh_token || null,
      expires_at:   Date.now() + (expires_in || 3600) * 1000,
      data:         energyData,
    })).toString('base64');

    return res.redirect(302, '/?connected=true&payload=' + encodeURIComponent(payload));

  } catch (err) {
    console.error('[callback] Unexpected error:', err.message);
    return res.redirect(302, '/?error=server_error');
  }
};
