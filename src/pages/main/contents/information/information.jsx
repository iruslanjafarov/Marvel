import About from "./about/about.jsx";
import Search from "./search/search.jsx";

const Information = ({selectedCharacter}) => {
    return (
        <aside className="information">
            <About selectedCharacter={selectedCharacter}/>
            <Search/>
        </aside>
    );
};

export default Information;