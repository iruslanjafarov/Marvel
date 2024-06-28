import { Helmet } from "react-helmet";

import { ErrorBoundary } from "react-error-boundary";

import Character from "./character/character.jsx";
import Contents from "./contents/contents.jsx"

const Main = () => {
    return (
        <>
            <Helmet>
                <meta 
                    name="description"
                    content="Marvel information portal"
                />
                <title>Главная страница</title>
            </Helmet>
            <main>
                <ErrorBoundary>
                    <Character/>
                </ErrorBoundary>
                <Contents/>
            </main>
        </>
    )
};

export default Main;