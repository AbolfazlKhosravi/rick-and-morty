import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo"> LOGO 😍 </div>
      {children}
    </nav>
  );
};
export const Search = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search ..."
    />
  );
};
export const SearchResult = ({ numOfCharacters }) => {
  return (
    <div className="navbar__result">Found {numOfCharacters} characters</div>
  );
};
export const Favourites = ({ favourites, setFavourites }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onOpen={setOpen} title={"List of Favourites"}>
        {favourites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              onClick={() =>
                setFavourites((prevFavs) =>
                  prevFavs.filter((fav) => fav.id !== item.id)
                )
              }
              className="icon red"
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart">
        <HeartIcon className="icon" onClick={() => setOpen(true)} />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
};

export default Navbar;
