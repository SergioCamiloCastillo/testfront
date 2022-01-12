import { useState, useEffect } from "react/cjs/react.development";
import Dropdown from "./components/Dropdown";
import "./scss/index.scss";
import { Credentials } from "./helpers/credentials";
import { getToken } from "./api/token";
import { getGenres } from "./api/genres";
import { getPlayList } from "./api/playlist";
import { getTracks } from "./api/tracks";
import CardTrack from "./components/CardTrack";

function App() {
  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [playList, setPlayList] = useState({
    selectedPlayList: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });

  const spotify = Credentials();

  useEffect(() => {
    getToken().then((newToken) => {
      setToken(newToken.access_token);
    });
    getGenres(token).then((newGenres) => {
      setGenres({
        selectedGenre: genres.selectedGenre,
        listOfGenresFromAPI: newGenres.categories.items,
      });
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
  const genreChanged = (value) => {
    setGenres({
      selectedValue: value,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });
    getPlayList(value, token).then((newPlayList) => {
      setPlayList({
        selectedPlaylist: playList.selectedPlaylist,
        listOfPlaylistFromAPI: newPlayList.playlists.items,
      });
    });
  };
  const playlistChanged = (value) => {
    setPlayList({
      selectedPlaylist: value,
      listOfPlaylistFromAPI: playList.listOfPlaylistFromAPI,
    });
  };
  const buttonForm = (e) => {
    e.preventDefault();
    getTracks(playList, token).then((newTracks) => {
      console.log("nuevos tracks", newTracks.items);
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: newTracks.items,
      });
    });
  };
  return (
    <div className="App">
      <form onSubmit={buttonForm}>
        <Dropdown
          options={genres.listOfGenresFromAPI}
          selectedValue={genres.selectedGenre}
          changed={genreChanged}
        />
        <Dropdown
          options={playList.listOfPlaylistFromAPI}
          selectedValue={playList.selectedPlaylist}
          changed={playlistChanged}
        />
        <button type="submit">Search</button>
        {tracks?.listOfTracksFromAPI?.length > 0 && (
          <CardTrack tracks={tracks.listOfTracksFromAPI} />
        )}
      </form>
    </div>
  );
}

export default App;
