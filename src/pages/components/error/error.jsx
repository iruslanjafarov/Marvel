import ErrorImage from "../../../assets/main/character/error.gif";

const Error = () => {
    return (
        <div className="error">
            <img src={ErrorImage} className="error__image" alt="error"/>
        </div>
    );
};

export default Error;