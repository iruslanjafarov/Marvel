import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { Helmet } from "react-helmet";

import Hero from "../components/hero/hero.jsx";
import Spinner from "./../components/spinner/spinner.jsx";
import Error from "./../components/error/error.jsx";

import useMarvelService from "./../../services/marvelService.js";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const setContent = (process, Component, newComicsLoading) => {
    switch (process) {
        case "waiting": 
            return <Spinner/>;
        case "loading": 
            return newComicsLoading ? <Component/> : <Spinner/>;
        case "confirmed":
            return <Component/>;
        case "error":
            return <Error/>;
        default:
            throw new Error("Unexprected process state");
    };
};

const Comics = () => {
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComics] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicsEnded, setComicsEnd] = useState(false);

    const {
        getAllComics,
        process,
        setProcess,
    } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initialValue) => {
        !initialValue ? setNewComics(true) : setNewComics(false);

        getAllComics(offset)
        .then(comics => onComicsLoaded(comics))
        .then(() => setProcess("confirmed"))
    };

    const onComicsLoaded = (newComics) => {
        let ended = false;

        if (newComics.length < 8) {
            ended = true;
        };

        setComics(oldComics => [...oldComics, ...newComics]);

        setNewComics(false);
        setOffset(offset => offset + 8);
        setComicsEnd(ended);
    };

    const renderContent = (array) => {
        const items = array.map(({thumbnail, name, price, id}, i) => {
            return (
                <CSSTransition key={i} timeout={500} classNames="comics-list__item">
                    <li 
                        className="comics-list__item"
                        >
                            <Link to={`/comics/${id}`}>
                                <img src={thumbnail} alt="comics" className="comics-list__img"/>
                                <h2 className="comics-list__name">{name}</h2>
                                <h3 className="comics-list__price">{price}</h3>
                            </Link>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        );
    };

    const button = <button 
    className="btn btn_primary"
    disabled={newComicsLoading}
    onClick={() => onRequest(offset)}
    style={{"display" : comicsEnded ? "none" : "block"}}
    >LOAD MORE</button>;

    return (
        <>
            <Helmet>
                <title>Комиксы</title>
            </Helmet>
            <main>
                <Hero/>
                <section className="comics">
                    <div className="container comics-container">
                        <ul className="comics-list">
                            {setContent(process, () => renderContent(comics), newComicsLoading)}
                        </ul>
                    </div>
                    {(process == "loading" || process == "error") && !newComicsLoading ? null : button}
                </section>
            </main>
        </>
    );
};

export default Comics;