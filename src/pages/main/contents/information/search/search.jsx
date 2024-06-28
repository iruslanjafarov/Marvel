import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

import useMarvelService from "../../../../../services/marvelService.js";

const Search = () => {
    const [character, setCharacter] = useState({});

    const { getNameCharacter } = useMarvelService();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors }
    } = useForm();

    const onRequest = ({ name }) => {
        const character = name;

        getNameCharacter(character)
        .then(character => onCharacterFound(character))
        .catch(() => {
            setError("name", { message: "The character was not found. Check the name and try again" });
            setCharacter({});
        });
    };

    const capitalizeFirstLetter = (e) => {
        const { name, value } = e.target;
        setValue(name, value.charAt(0).toUpperCase() + value.slice(1));
    };

    const onCharacterFound = (character) => {
        setCharacter(character);
    };

    return (
        <section className="search">
            <div className="search__text">Or find a character by name:</div>
            <form className="search-form" onSubmit={handleSubmit(onRequest)}>
                <input {...register("name", { required: "This field is required!" })} type="text" name="name" className="search-form__input" placeholder="Enter name" onChange={(e) => capitalizeFirstLetter(e)}/>
                <button className="btn btn_primary search-form__button">FIND</button>
            </form>
            {character.name ? <View character={character}/> : null}
            <div className="search-information__text_error">{errors.name?.message}</div>
        </section>
    );
};

export default Search;

const View = ({ character }) => {
    const { name, id } = character;

    return (
        <div className="search-information">
            <div className="search-information__text">There is! Visit {name} page?</div>
            <button className="btn btn_secondary search-information__button"><Link to={`/persone/${id}`}>TO PAGE</Link></button>
        </div>
    );
};