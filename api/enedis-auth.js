// api/enedis-auth.js
// ✅ redirect_URI avec I MAJUSCULE — requis par Enedis en production

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

  // ✅ URL de consentement Enedis production
  // ✅ redirect_URI avec I MAJUSCULE — c'est volontaire, Enedis est non-standard
  const base = 'https://mon-compte-particulier.enedis.fr/dataconnect/v1/oauth2/authorize';

  const params = new URLSearchParams({
    client_id:     clientId,
    response_type: 'code',
    redirect_URI:  redirectUri,   // ← I MAJUSCULE intentionnel
    state:         pdl,
    duration:      'P1Y',
  });

  console.log('[enedis-auth] Redirection vers:', base + '?' + params.toString());

  return res.redirect(302, base + '?' + params.toString());
};
