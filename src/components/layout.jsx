
import Nav from "./nav";
import { Link } from "react-router-dom";

export default function Layout ({children}) {
    return (
        <>
        <header className="site-header">
        
        <Link to="/" className="logo">
          Gruppe 11
        </Link>
        <Nav />
      </header>
      <main>
        {children}
      </main>
    </>
  );
  }
