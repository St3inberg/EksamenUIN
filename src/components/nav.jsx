import { Link } from "react-router-dom";

export default function Nav () {
    const navTitles = [
        {
          id: 1,
          name: "Hjem",
          slug: "forside"
        },
        {
          id: 2,
          name: "Events",
          slug: "events"
        },
        {
          id: 3,
          name: "Dashboard",
          slug: "dashboard"
        },
        
      ];
    
    return (<ul>
        {navTitles.map((nav) => (
            
            <li key={nav.id}>
             
              <Link to={`/${nav.slug}`}>{nav.name}</Link>
            </li>
          ))}
    </ul>)
}