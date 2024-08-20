import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";

function App() {
  const [characters, setCatacters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfCharacters={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

export default App;
