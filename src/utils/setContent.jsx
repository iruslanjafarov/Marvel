import Skeleton from "../pages/components/skeleton/skeleton.jsx";
import Spinner from "../pages/components/spinner/spinner.jsx";
import Error from "../pages/components/error/error.jsx";

const setContent = (process, Component, data) => {
    switch (process) {
        case "waiting": 
            return <Skeleton/>;
        case "loading": 
            return <Spinner/>;
        case "confirmed":
            return <Component data={data}/>;
        case "error":
            return <Error/>;
        default:
            throw new Error("Unexprected process state");
    };
};

export default setContent;