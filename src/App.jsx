import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
// import { allCharacters } from "../data/data";

function App() {
  const [characters, setCatacters] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [query,setQuery]=useState("")
  useEffect(() => {
    async function fetchdata() {
      try {
        setIsloading(true);
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`);
        setCatacters(data.results.slice(0,4));
      } catch (error) {
        console.log(error.response.data.error);
        setCatacters([])
        toast.error(error.response.data.error)
      }finally{
        setIsloading(false);
      }
    }
    if(query.length<3){
      setCatacters([])
      return
    }
    fetchdata();
  }, [query]);
  return (
    <div className="app">
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
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
