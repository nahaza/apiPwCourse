const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const getRefreshToken = async () => {
  const refreshToken = JSON.parse(
    fs.readFileSync("tokens.json", { encoding: "utf8" })
  ).refresh_token;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: client_id,
    client_secret: client_secret,
  });

  const url = "https://accounts.spotify.com/api/token";

  const body = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const response = await body.json();

  fs.writeFileSync("tokens.json", JSON.stringify(response));

  console.log(response);

  return response;
};

getRefreshToken();
