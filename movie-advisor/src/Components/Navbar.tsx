import {useRef} from "react"
import {FaBars, FaTimes} from "react-icons/fa";

const Navbar = () => {
  const navRef: any = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  }

  return (
    <header>
      <h3>Logo</h3>
      <nav ref={navRef}>
        <a href="/#">Test1</a>
        <a href="/#">Test1</a>
        <a href="/#">Test1</a>
        <a href="/#">Test1</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes></FaTimes>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars></FaBars>
      </button>
    </header>
  );
};

export default Navbar;