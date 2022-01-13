import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import "./scss/index.scss";
import { Credentials } from "./helpers/credentials";
import { getToken } from "./api/token";
import { getGenres } from "./api/genres";
import { getPlayList } from "./api/playlist";
import { getTracks } from "./api/tracks";
import CardTrack from "./components/CardTrack";
import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Container,
  Button,
  Grid,
  Table
} from "semantic-ui-react";
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
        selectedGenre: genres?.selectedGenre,
        listOfGenresFromAPI: newGenres?.categories?.items,
      });
    });
  }, [genres?.selectedGenre, spotify?.ClientId, spotify?.ClientSecret]);
  const genreChanged = (value) => {
    setGenres({
      selectedValue: value,
      listOfGenresFromAPI: genres?.listOfGenresFromAPI,
    });
    getPlayList(value, token).then((newPlayList) => {
      setPlayList({
        selectedPlaylist: playList?.selectedPlaylist,
        listOfPlaylistFromAPI: newPlayList?.playlists.items,
      });
    });
  };
  const playlistChanged = (value) => {
    setPlayList({
      selectedPlaylist: value,
      listOfPlaylistFromAPI: playList?.listOfPlaylistFromAPI,
    });
  };
  const buttonForm = (e) => {
    e.preventDefault();
    getTracks(playList, token).then((newTracks) => {
      setTracks({
        selectedTrack: tracks?.selectedTrack,
        listOfTracksFromAPI: newTracks?.items,
      });
    });
  };
  return (
    <div className="home">
      <Container >
        <Sidebar.Pushable as={Segment} style={{ overflow: "hidden" }}>
          <Sidebar
            as={Menu}
            direction="left"
            icon="labeled"
            inverted
            vertical
            visible="true"
          >
            <Menu.Item as="a">
              <img
                className="logo-spotify"
                src="/images/logosporify.jpg"
                alt="logo-spotify"
              />
            </Menu.Item>
            <Menu.Item as="a" floated="right" className="button-principal">
              <Icon name="home" />
              <span className="title">Home</span>
            </Menu.Item>
            <Menu.Item as="a" floated="right" className="button-principal">
              <Icon name="search" />
              <span className="title">Buscar</span>
            </Menu.Item>
            <Menu.Item as="a" floated="right" className="button-principal">
              <Icon name="music" />
              <span className="title">Tus canciones</span>
            </Menu.Item>

            <span className="title-playlist">PlayList</span>
            <Menu.Item as="a" floated="right" className="button-principal">
              <Icon name="plus circle" />
              <span className="title">Crear List</span>
            </Menu.Item>
            <Menu.Item as="a" floated="right" className="button-principal">
              <Icon name="star" />
              <span className="title">Más Famosas</span>
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher className="content">
            <Segment basic>
              <Header as="h3">
                <form onSubmit={buttonForm}>
                  <div className="content-selects">
                    <div>
                      <span>Género </span>
                      <Dropdown
                        options={genres?.listOfGenresFromAPI}
                        selectedValue={genres?.selectedGenre}
                        changed={genreChanged}
                      />
                    </div>
                    <div className="playlist-select">
                      <span>PlayList </span>
                      <Dropdown
                        options={playList?.listOfPlaylistFromAPI}
                        selectedValue={playList?.selectedPlaylist}
                        changed={playlistChanged}
                      />
                    </div>
                    <div className="button-selects">
                      <Button color="green" type="submit">
                        Buscar
                      </Button>
                    </div>
                  </div>
                </form>
              </Header>
              <Grid className="description-song">
                <Grid.Column width={3} className="image-default-image">
                  <img src="/images/portada.jpeg" alt="album-portada" />
                </Grid.Column>
                <Grid.Column width={13} className="descripcion-song">
                  <h1>Lista de Canciones</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent mi risus, facilisis.
                  </p>
                  <p>
                    <b>Autor:</b> dolor sit amet
                  </p>
                </Grid.Column>
              </Grid>
             
              {tracks?.listOfTracksFromAPI?.length > 0 && (
                <CardTrack tracks={tracks?.listOfTracksFromAPI} />
              )}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    </div>
  );
}

export default App;
