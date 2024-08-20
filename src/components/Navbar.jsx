const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="navbar__logo"> logo </div>
            <input type="text" className="text-field" placeholder="search ..." />
            <div className="navbar__result">Found X characters</div>
            <button className="heart">
                logo HeartIcon
                <span className="badge">4</span>
            </button>
        </nav>
     );
}
 
export default Navbar;