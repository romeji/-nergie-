// api/callback.js
// ✅ URLs correctes : gw.prd.api.enedis.fr + redirect_URI majuscule

module.exports = async function handler(req, res) {

  console.log('[callback] Démarrage, query:', JSON.stringify(req.query));

  const code  = req.query && req.query.code;
  const pdl   = req.query && req.query.state;
  const error = req.query && req.query.error;

  if (error) {
    console.log('[callback] Refus:', error);
    return res.redirect(302, '/?error=access_denied');
  }
  if (!code) return res.redirect(302, '/?error=no_code');
  if (!pdl)  return res.redirect(302, '/?error=no_pdl');

  const clientId     = process.env.ENEDIS_CLIENT_ID;
  const clientSecret = process.env.ENEDIS_CLIENT_SECRET;
  const redirectUri  = process.env.ENEDIS_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return res.redirect(302, '/?error=config_missing');
  }

  try {
    // ── 1. Échange du code contre un access_token ──
    // ✅ gw.prd.api.enedis.fr — URL correcte confirmée
    // ✅ redirect_uri en query string (pas dans le body)
    const tokenUrl = 'https://gw.prd.api.enedis.fr/v1/oauth2/token'
      + '?redirect_uri=' + encodeURIComponent(redirectUri);

    const tokenBody = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     clientId,
      client_secret: clientSecret,
      code:          code,
    });

    console.log('[callback] Appel token:', tokenUrl);

    const tokenRes  = await fetch(tokenUrl, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':       'application/json',
      },
      body: tokenBody.toString(),
    });

    const tokenText = await tokenRes.text();
    console.log('[callback] Token status:', tokenRes.status);
    console.log('[callback] Token body:', tokenText.substring(0, 400));

    if (!tokenRes.ok) {
      return res.redirect(302, '/?error=token_failed&status=' + tokenRes.status);
    }

    const tokenData                               = JSON.parse(tokenText);
    const { access_token, refresh_token, expires_in } = tokenData;

    if (!access_token) {
      return res.redirect(302, '/?error=no_access_token');
    }

    // ── 2. Récupérer 30 jours de consommation ──
    const now   = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 30);
    const fmt = function(d) { return d.toISOString().split('T')[0]; };

    // ✅ gw.prd.api.enedis.fr/v3 — URL correcte confirmée
    const dataUrl =
      'https://gw.prd.api.enedis.fr/v3/metering_data/daily_consumption' +
      '?usage_point_id=' + pdl +
      '&start=' + fmt(start) +
      '&end='   + fmt(now);

    console.log('[callback] Appel données:', dataUrl);

    let energyData = null;
    try {
      const dataRes  = await fetch(dataUrl, {
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Accept':        'application/json',
        },
      });
      const dataText = await dataRes.text();
      console.log('[callback] Data status:', dataRes.status);
      console.log('[callback] Data body:', dataText.substring(0, 400));
      if (dataRes.ok) energyData = JSON.parse(dataText);
    } catch (dataErr) {
      console.log('[callback] Erreur données (non bloquant):', dataErr.message);
    }

    // ── 3. Encoder et rediriger ──
    const payload = Buffer.from(JSON.stringify({
      pdl:           pdl,
      access_token:  access_token,
      refresh_token: refresh_token || null,
      expires_at:    Date.now() + (expires_in || 10800) * 1000,
      data:          energyData,
    })).toString('base64');

    console.log('[callback] ✅ Succès — redirection avec données');
    return res.redirect(302, '/?connected=true&payload=' + encodeURIComponent(payload));

  } catch (err) {
    console.log('[callback] ERREUR:', err.message);
    return res.redirect(302, '/?error=server_error&msg=' + encodeURIComponent(err.message));
  }
};
