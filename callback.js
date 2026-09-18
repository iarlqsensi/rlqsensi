export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Código do Discord não recebido.");
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  try {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      return res.status(500).send("Erro ao conectar com o Discord.");
    }

    res.status(200).send("Login com Discord conectado!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno ao conectar com o Discord.");
  }
}
