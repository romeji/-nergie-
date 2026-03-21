// api/enedis-auth.js
// Lance le flux OAuth2 Enedis — redirige l'utilisateur vers la page d'autorisation

module.exports = function handler(req, res) {
  const pdl = req.query && req.query.pdl;

  // Valider le PDL (14 chiffres)
  if (!pdl || !/^\d{14}$/.test(pdl)) {
    return res.status(400).json({ error: 'PDL invalide — 14 chiffres requis' });
  }

  const clientId    = process.env.ENEDIS_CLIENT_ID;
  const redirectUri = process.env.ENEDIS_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({
      error: 'Variables d\'environnement manquantes',
      hint: 'Vérifiez ENEDIS_CLIENT_ID et ENEDIS_REDIRECT_URI dans Vercel'
    });
  }

  // Durée d'accès : 1 an (en secondes)
  const duration = String(365 * 24 * 3600);

  // Construire l'URL d'autorisation avec URLSearchParams (WHATWG — pas d'url.parse)
  const base = 'https://gw.hml.api.enedis.fr/group/espace-particuliers/consentement-linky/oauth2/authorize';
  const params = new URLSearchParams({
    client_id:     clientId,
    response_type: 'code',
    redirect_uri:  redirectUri,
    state:         pdl,
    duration:      duration,
  });

  const authUrl = base + '?' + params.toString();

  // Rediriger l'utilisateur vers Enedis
  return res.redirect(302, authUrl);
};
