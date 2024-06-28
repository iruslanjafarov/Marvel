import { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";

import Hero from "../components/hero/hero.jsx";

import useMarvelService from "../../services/marvelService.js";

import setContent from "../../utils/setContent.jsx";

const Persone = () => {
    const [persone, setPersone] = useState({});

    const {id} = useParams();

    const { 
        getOneCharacter,
        process,
        setProcess
    } = useMarvelService();

    useEffect(() => {
        getOneCharacter(id)
        .then(character => onPersoneLoaded(character))
        .then(() => setProcess("confirmed"));
    }, []);

    const onPersoneLoaded = (character) => {
        setPersone(character);
    };

    return (
        <>
            <Helmet>
                <title>{persone.name}</title>
            </Helmet>
            <Hero/>
            <section className="persone">
                <div className="container persone-container">
                    {setContent(process, View, persone)}
                </div>
            </section>
        </>        
    );
};

export default Persone;

const View = ({ data }) => {
    const { thumbnail, name, description } = data;

    return (
        <>
            <img src={thumbnail} alt="persone" className="persone__image"/>
            <div className="persone-information">
                <div className="persone-information__title">{name}</div>
                <p className="persone-information__description">{description}</p>
            </div>
        </>
    );
};