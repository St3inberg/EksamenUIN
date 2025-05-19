import Nav from "./Nav";
import Footer from "./Footer"

export default function Layout({children}) {
  return (
    <div className="app-container">
      <header>
        <Nav/>
      </header>
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}