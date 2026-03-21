// api/callback.js
// Enedis appelle cette URL après autorisation de l'utilisateur
// URL : https://nergie.vercel.app/api/callback?code=XXX&state=PDL

export default async function handler(req, res) {
  const { code, state: pdl, error } = req.query;

  // L'utilisateur a refusé l'autorisation
  if (error) {
    return res.redirect(302, `/?error=access_denied`);
  }

  if (!code || !pdl) {
    return res.redirect(302, `/?error=missing_params`);
  }

  const clientId     = process.env.ENEDIS_CLIENT_ID;
  const clientSecret = process.env.ENEDIS_CLIENT_SECRET;
  const redirectUri  = process.env.ENEDIS_REDIRECT_URI;

  try {
    // ── 1. Échanger le code contre un access_token ──
    const tokenResponse = await fetch(
      'https://mon-compte-particulier.enedis.fr/dataconnect/v1/oauth2/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type:    'authorization_code',
          client_id:     clientId,
          client_secret: clientSecret,
          code,
          redirect_uri:  redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      console.error('Token error:', err);
      return res.redirect(302, `/?error=token_failed`);
    }

    const { access_token, refresh_token, expires_in } = await tokenResponse.json();

    // ── 2. Récupérer les données immédiatement ──
    // (30 derniers jours de consommation journalière)
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 30);

    const fmt = d => d.toISOString().split('T')[0]; // YYYY-MM-DD

    const dataResponse = await fetch(
      `https://mon-compte-particulier.enedis.fr/metering_data/v5/daily_consumption` +
      `?usage_point_id=${pdl}&start=${fmt(start)}&end=${fmt(today)}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept:        'application/json',
        },
      }
    );

    let energyData = null;
    if (dataResponse.ok) {
      energyData = await dataResponse.json();
    }

    // ── 3. Encoder les données pour les passer à l'app ──
    // En production : stocker en BDD (Supabase). Ici on passe via l'URL pour la démo.
    const payload = Buffer.from(JSON.stringify({
      pdl,
      access_token,
      refresh_token,
      expires_at: Date.now() + expires_in * 1000,
      data: energyData,
    })).toString('base64');

    // Rediriger vers l'app avec les données
    res.redirect(302, `/?connected=true&payload=${encodeURIComponent(payload)}`);

  } catch (err) {
    console.error('Callback error:', err);
    res.redirect(302, `/?error=server_error`);
  }
}
