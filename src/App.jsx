import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { allCharacters } from "../data/data";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState();
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  const isAddedToFavourites = favourites
    .map((fav) => fav.id)
    .includes(selectId);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchdata() {
      try {
        setIsloading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        setCharacters(data.results.slice(0, 4));
      } catch (error) {
        if (!axios.isCancel()) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            toast.error(error.response.data.error);
            setCharacters([]);
          }
        }
      } finally {
        setIsloading(false);
      }
    }
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchdata();
    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  }, [favourites]);
  return (
    <div className="app">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfCharacters={characters ? characters.length : 0} />
        <Favourites favourites={favourites} setFavourites={setFavourites} />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isloading={isloading}
          setSelectId={setSelectId}
          selectId={selectId}
        />
        <CharacterDetail
          selectId={selectId}
          setFavourites={setFavourites}
          isAddedToFavourites={isAddedToFavourites}
        />
      </Main>
      <Toaster />
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

export default App;
