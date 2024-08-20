import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";

function App() {
  const [characters, setCatacters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar numOfCharacters={characters.length}/>
      <div className="main">
        <CharacterList characters={characters}/>
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
