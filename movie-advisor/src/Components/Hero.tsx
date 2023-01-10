function Hero() {
    return (
        <section id="hero">
        <div className="hero container">
            <div className="top">
                <h1>Movie Advisor <span></span></h1>
                <h1>Wybierz <span></span></h1>
                <h1>Film Dla Siebie <span></span></h1>
                <a href="#about" type="button" className="cta">Znajdź film</a>  
            </div>
            <h3 className="bottom">
                Nasza strona służy do pomocy użytkownikom, w wyborze filmu, z aktualnej oferty kin.
            </h3>
        </div>
    </section>
    );
}

export default Hero;