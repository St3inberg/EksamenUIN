import Nav from "./Nav";
import Footer from "./Footer"


export default function Layout ({children}) {
    return(
        <>
        <header>
            <Nav/>
        </header>
        <main>
            {children}
        </main>
        <Footer>
            <Footer/>
        </Footer>
        </>
    )
}