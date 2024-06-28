import Characters from "../../../assets/comics/hero/characters.png";
import Logo from "../../../assets/comics/hero/logo.png";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-container container">
                <img src={Characters} alt="characters" className="hero__characters"/>
                <h1 className="hero__title">New comics every week! <br/> Stay tuned!</h1>
                <img src={Logo} alt="logo" className="hero__logo"/>
            </div>
        </section>
    );
};

export default Hero;