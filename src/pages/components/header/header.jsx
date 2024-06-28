import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <h1 className="header__title"><Link to={"/"}><span>Marvel</span> information portal</Link></h1>
                <nav className="header__navigation">
                    <ul>
                        <li><NavLink to={"/"} style={({isActive}) => ({color: isActive ? "red" : "inherit"})}>Characters</NavLink></li>
                        /
                        <li><NavLink to={"/comics"} style={({isActive}) => ({color: isActive ? "red" : "inherit"})}>Comics</NavLink></li>
                    </ul>
                </nav>
            </div>  
        </header>
    );
};

export default Header;

{/*<Link/> or <NavLink/>*/}