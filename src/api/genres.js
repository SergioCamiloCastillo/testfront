
export function getGenres(token) {
  const url = "https://api.spotify.com/v1/browse/categories?locale=sv_US";

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Authorization:"Bearer " + token,
    },

  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
