//Import component library
import {useState, useEffect} from "react";
//Import content
import setContent from "../../../../../utils/setContent.jsx";
//Import services
import useMarvelService from "../../../../../services/marvelService.js";

const About = ({selectedCharacter}) => {
    const [character, setCharacter] = useState(null);
    
    const {
        process,
        setProcess,
        getOneCharacter,
        clearError,
    } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [selectedCharacter]);

    const updateChar = () => {
        if (!selectedCharacter) {
            return;
        };

        clearError();

        getOneCharacter(selectedCharacter)
        .then(character => onCharacterUpdated(character))
        .then(() => setProcess("confirmed"))
    };

    const onCharacterUpdated = (character) => {
        setCharacter(character);
    };
    
    return (
        <section className="about">
            {setContent(process, View, character)}
        </section>
    );
};

const View = ({data}) => {
    const {thumbnail, name, homepage, wiki, description, comics} = data;

    return (
        <>
            <div className="about-top">
                <img 
                src={thumbnail}
                alt="about"
                className="about__image"></img>
                <div className="about-wrapper">
                    <div className="about__name">{name}</div>
                    <div className="about-wrapper-btns">
                        <button className="btn btn_primary">
                            <a href={homepage}>HOMEPAGE</a>
                        </button>
                        <button className="btn btn_secondary">
                            <a href={wiki}>WIKI</a>
                        </button>
                    </div>
                </div>
            </div>
            <p className="about__description">{description}</p>
            <div className="about-comics">
                <h2 className="about-comics__title">Comics:</h2>
                <ul>
                    {comics.length ? null : "This character doesn't have any comics"}
                    {
                        comics.slice(0, 9).map((item, i) => {
                            return (
                                <li 
                                key={i} 
                                className="about-comics__item">
                                    {item.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    );
};

export default About;