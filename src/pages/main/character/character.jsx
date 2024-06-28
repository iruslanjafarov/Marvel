//Import component library
import {useState, useEffect} from "react";
//Import components
import setContent from "../../../utils/setContent.jsx";
//Import services
import useMarvelService from "../../../services/marvelService.js";
//Import media
import Random from "../../../assets/main/character/mjolnir.png";

const Character = () => {
    const [character, setCharacter] = useState({});

    const {
        getOneCharacter,
        process,
        setProcess, 
        clearError,
    } = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [])
    
    const onCharacterLoaded = (character) => {
        setCharacter(character);
    };

    const updateChar = () => {
        clearError();

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getOneCharacter(id)
        .then(character => onCharacterLoaded(character))
        .then(() => setProcess("confirmed"));
    };

    const onChangeData = () => {
        updateChar();
    };

    return (
        <section className="character">
            <div className="container character-container">
                {setContent(process, View, character)}
                <div className="character-random">
                    <h2 className="character-random__text">Random character for today!<br></br>Do you want to get to know him better?<br></br><br></br>Or choose another one</h2>
                    <button
                    className="btn btn_primary"
                    onClick={() => onChangeData()}
                    >
                    TRY IT
                    </button>
                    <img src={Random} alt="random" className="character-random__image"></img>
                </div>
            </div>
        </section>
    );
};

const View = ({data}) => {
    const {thumbnail, name, description, homepage, wiki} = data;

    return (
        <div className="character-block">
            <img
            src={thumbnail}
            alt="character"
            className="character-text__image"></img>
            <div className="character-text">
                <h3 className="character-text__title">{name}</h3>
                <p className="character-text__description">{description}</p>
                <div className="character-text__btns">
                    <button className="btn btn_primary">
                        <a href={homepage}>HOMEPAGE</a>
                    </button>
                    <button className="btn btn_secondary">
                        <a href={wiki}>WIKI</a>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Character;