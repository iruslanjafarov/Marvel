import {Link} from "react-router-dom";

import NotFoundImage from "../../../assets/notfound/404.jpg";

const NotFound = () => {
    return (
        <section className="notfound">
            <div className="container notfound-container">
                <img src={NotFoundImage} alt="404" className="notfound__image" /><br></br>
                <div className="btn btn_primary"><Link to={"/"}>Go to main page</Link></div>    
            </div>
        </section>
    );
};

export default NotFound;