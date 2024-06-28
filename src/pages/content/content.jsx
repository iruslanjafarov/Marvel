import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { Helmet } from "react-helmet";

import Hero from "./../components/hero/hero.jsx";

import useMarvelService from "./../../services/marvelService.js";

import setContent from "../../utils/setContent.jsx";

const Content = () => {
    const [comics, setComics] = useState({});

    const {
        getOneComics,
        process,
        setProcess,
        clearError
    } = useMarvelService();

    const {id} = useParams();

    useEffect(() => {
        onUpdateComics();
    }, []);

    const onUpdateComics = () => {
        clearError();

        getOneComics(id)
        .then(comics => setComics(comics))
        .then(() => setProcess("confirmed"));
    };

    return (
        <>
            <Helmet>
                <title>{comics.name}</title>
            </Helmet>
            <main>
                <Hero/>
                <section className="content">
                    <div className="container content-container">
                        {setContent(process, View, comics)}
                    </div>
                </section>
            </main>
        </>
    );
};

const View = ({ data }) => {
    const {thumbnail, name, description, pages, price} = data;

    return (
        <>
            <img src={thumbnail} alt="content" className="content__image"/>
            <div className="content-information">
                <div className="content-information__title">{name}</div>
                <p className="content-information__description">{description}</p>
                <p className="content-information__pages">{pages} pages</p>
                <p className="content-information__language">Language: en-us</p>
                <span className="content-information__price">{price}</span>
            </div>
            <div className="content__back">
                <Link to={"/comics"}>Back to all</Link>
            </div>
        </>
    );
};

export default Content;