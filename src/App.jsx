import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
// import { allCharacters } from "../data/data";

function App() {
  const [characters, setCatacters] = useState([]);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    async function fetchdata() {
      try {
        setIsloading(true);
        const {data} = await axios.get("https://rickandmortyapi.com/api/character");
        setCatacters(data.results);
      } catch (error) {
        console.log(error.response.data.error);
        
        toast.error(error.response.data.error)
      }finally{
        setIsloading(false);
      }
    }
    fetchdata();
  }, []);
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfCharacters={characters?characters.length:0} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isloading={isloading} />
        <CharacterDetail />
      </Main>
      <Toaster />
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

export default App;
