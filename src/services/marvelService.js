import useHttp from "../hooks/http.hook.js";

const useMarvelService = () => {
    const {
        process,
        setProcess,
        request,
        clearError
    } = useHttp();

    const _apiLink = "https://gateway.marvel.com:443/v1/public";
    const _apiKey = "27835ecfea243071b26f7afa086f63de";
    const _baseCharactersOffset = 100;
    const _baseComicsOffset = 100;

    const getOneCharacter = async (id) => {
        const character = await request(`${_apiLink}/characters/${id}?&apikey=${_apiKey}`);
        return _transformCharacter(character.data.results[0]);
    };

    const getAllCharacters = async (offset = _baseCharactersOffset) => {
        const characters = await request(`${_apiLink}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return characters.data.results.map(character => _transformCharacter(character));
    };

    const getOneComics = async (id) => {
        const comics = await request(`${_apiLink}/comics/${id}?apikey=${_apiKey}`);
        return _transformComics(comics.data.results[0]);
    };

    const getAllComics = async (offset = _baseComicsOffset) => {
        const comics = await request(`${_apiLink}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return comics.data.results.map(comics => _transformComics(comics));
    };

    const getNameCharacter = async (name) => {
        const character = await request(`${_apiLink}/characters?name=${name}&apikey=${_apiKey}`);
        return _transformCharacter(character.data.results[0]);
    };

    const _transformCharacter = (character) => {
        return {
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 100)}...` : "This character has no description",
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            id: character.id,
            comics: character.comics.items,
        };
    };

    const _transformComics = (comics) => {
        return {
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            name: comics.title,
            description: comics.description,
            page: comics.pageCount,
            price: comics.prices[0].price ? comics.prices[0].price + "$" : "This comics is unavailable!",
            id: comics.id
        };
    };

    return {
        process,
        setProcess,
        getOneCharacter,
        getAllCharacters,
        getAllComics,
        getOneComics,
        getNameCharacter,
        clearError
    };
};

export default useMarvelService;