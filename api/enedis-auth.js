// api/enedis-auth.js
// Redirige l'utilisateur vers la page d'autorisation Enedis
// URL : https://nergie.vercel.app/api/enedis-auth?pdl=12345678901234

export default function handler(req, res) {
  const { pdl } = req.query;

  // Valider le PDL (14 chiffres)
  if (!pdl || !/^\d{14}$/.test(pdl)) {
    return res.status(400).json({ error: 'PDL invalide — 14 chiffres requis' });
  }

  const clientId      = process.env.ENEDIS_CLIENT_ID;
  const redirectUri   = process.env.ENEDIS_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Variables d\'environnement manquantes' });
  }

  // Durée d'accès : 1 an (en secondes)
  const duration = 365 * 24 * 3600;

  // Construire l'URL d'autorisation Enedis
  const params = new URLSearchParams({
    client_id:     clientId,
    response_type: 'code',
    redirect_uri:  redirectUri,
    state:         pdl,          // On passe le PDL en state pour le récupérer au callback
    duration:      String(duration),
  });

  const enedisAuthUrl =
    `https://mon-compte-particulier.enedis.fr/dataconnect/v1/oauth2/authorize?${params}`;

  // Rediriger l'utilisateur vers Enedis
  res.redirect(302, enedisAuthUrl);
}
