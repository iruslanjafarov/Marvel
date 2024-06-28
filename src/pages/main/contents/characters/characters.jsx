//Import component and etc library
import {useState, useEffect, useRef, useMemo} from "react";
//Import conponents
import Spinner from "../../../components/spinner/spinner.jsx";
import Error from "../../../components/error/error.jsx";
//Import services
import useMarvelService from "../../../../services/marvelService.js";
//Import transition
import { CSSTransition, TransitionGroup } from "react-transition-group";

const setContent = (process, Component, newCharactersLoading) => {
    switch (process) {
        case "waiting": 
            return <Spinner/>;
        case "loading": 
            return newCharactersLoading ? <Component/> : <Spinner/>;
        case "confirmed":
            return <Component/>;
        case "error":
            return <Error/>;
        default:
            throw new Error("Unexprected process state");
    };
};

const Characters = ({onGetCharacter}) => {
    const [characters, setCharacters] = useState([]);
    const [newCharactersLoading, setNewCharacter] = useState(false);
    const [offset, setOffset] = useState(100);
    const [characterEnded, setCharacterEnd] = useState(false);
    
    const {
        getAllCharacters,
        process,
        setProcess
    } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initialValue) => {
        !initialValue ? setNewCharacter(true) : setNewCharacter(false);

        getAllCharacters(offset)
        .then(characters => onCharactersLoaded(characters))
        .then(() => setProcess("confirmed"))
    };

    const onCharactersLoaded = (newCharacters) => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        };

        setCharacters(characters => [...characters, ...newCharacters]);
        setNewCharacter(false);
        setOffset(offset => offset + 9);
        setCharacterEnd(ended);
    };
    
    const itemsRef = useRef([]);

    const onToggleActive = (id) => {
        itemsRef.current.forEach(element => element.classList.remove("selected"));
        itemsRef.current[id].classList.add("selected");
    };

    const renderContent = (array) => {
        const items = array.map(({thumbnail, name, id}, i) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="characters__item">
                    <li
                    className="characters__item"
                    tabIndex={0}
                    ref={element => itemsRef.current[i] = element}
                    onClick={() => {onToggleActive(i), onGetCharacter(id)}}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onGetCharacter(id);
                            onToggleActive(i);
                        };
                    }}
                    >
                        <img src={thumbnail} alt={name} className="characters__image"></img>
                        <h2 className="characters__name">{name}</h2>
                    </li>
                </CSSTransition>
            );
        });
        
        return (
            <ul>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    };

    const elements = useMemo(() => setContent(process, () => renderContent(characters), newCharactersLoading), [process]);

    const button = <button 
    className="btn btn_primary"
    disabled={newCharactersLoading}
    onClick={() => onRequest(offset)}
    style={{"display" : characterEnded ? "none" : "block"}}
    >LOAD MORE</button>;

    return (
        <section className="characters">
            {elements}
            {(process == "loading" || process == "error") && !newCharactersLoading ? null : button}
        </section>
    );
};

export default Characters;