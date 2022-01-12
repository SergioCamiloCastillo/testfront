import { Credentials } from "../helpers/credentials";

export function getToken() {
  const url = "https://accounts.spotify.com/api/token";

  const spotify = Credentials();
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization:
        "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
    },
    body: 'grant_type=client_credentials'

  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("el segundo", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
}
