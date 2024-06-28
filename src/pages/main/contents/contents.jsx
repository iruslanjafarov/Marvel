//Import require hooks
import {useState} from "react";

import { ErrorBoundary } from "react-error-boundary";

//Import components
import Characters from "./characters/characters.jsx";
import Information from "./information/information.jsx";

const Contents = () => {
    const [selectedCharacter, changeCharacter] = useState(null);

    const onGetCharacter = (id) => {
        changeCharacter(id)
    };

    return (
        <section className="contents">
            <div className="container contents-container">
                <ErrorBoundary>
                    <Characters onGetCharacter={onGetCharacter}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Information selectedCharacter={selectedCharacter}/>
                </ErrorBoundary>
            </div>
        </section>
    );
};

export default Contents;