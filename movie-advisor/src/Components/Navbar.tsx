const Navbar = () => {

  return (
    <section id="header">
        <div className="header container">
            <div className="nav-bar">
                <div className="logo">
                    <a href="#hero"><img src="/Images/icon_movie.png"/></a>
                </div>
                <div className="nav-list">
                    <div className="hamburger"><div className="bar"></div></div>
                    <ul className="main-menu">
                        <li className="nmli"><a href="/#" data-after="Aktualności" className="nm">Znajdź film</a></li>
                        <li className="nmli"><a href="/#" data-after="O nas" className="nm">O nas</a></li>
                        <li className="nmli"><a href="/#" data-after="Konto" className="nm">Konto</a></li>
                        {/* Dane ondośnie konta będą wysuwały się po kliknięciu na ikonę chłopka */}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Navbar;