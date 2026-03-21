// api/enedis-auth.js
// Lance le flux OAuth2 Enedis — URLs mises à jour 2025

module.exports = function handler(req, res) {
  const pdl = req.query && req.query.pdl;

  if (!pdl || !/^\d{14}$/.test(pdl)) {
    return res.status(400).json({ error: 'PDL invalide — 14 chiffres requis' });
  }

  const clientId    = process.env.ENEDIS_CLIENT_ID;
  const redirectUri = process.env.ENEDIS_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({
      error: 'Variables manquantes',
      hint:  'Vérifiez ENEDIS_CLIENT_ID et ENEDIS_REDIRECT_URI dans Vercel'
    });
  }

  // Durée ISO 8601 : 1 an = P1Y (format requis par la nouvelle API)
  const duration = 'P1Y';

  // ✅ URL de consentement — valide en 2025
  const base   = 'https://mon-compte-particulier.enedis.fr/dataconnect/v1/oauth2/authorize';
  const params = new URLSearchParams({
    client_id:     clientId,
    response_type: 'code',
    redirect_uri:  redirectUri,
    state:         pdl,
    duration:      duration,
  });

  return res.redirect(302, base + '?' + params.toString());
};
