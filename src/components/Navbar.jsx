import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo"> LOGO 😍 </div>
      {children}
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
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

export default Navbar;
