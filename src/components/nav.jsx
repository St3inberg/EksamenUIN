import { Link } from "react-router-dom";

export default function Nav () {
    const kategorier = [
        {
          id: 1,
          name: "Teater",
          slug: "teater"
        },
        {
          id: 2,
          name: "Broadway",
          slug: "broadway"
        },
        {
          id: 3,
          name: "Kunst",
          slug: "kunst"
        }
        
    ]
    return (<>
    <ul>
        <li><Link to="/dashboard">DashBoard</Link></li>
    {kategorier.map((kategori) => (
            
            <li key={kategori.id}>
              <Link to={`/kategori/${kategori.slug}`}>{kategori.name}!</Link>
            </li>
          ))}
    </ul>
    
<h2><Link to="/">Logo</Link></h2>

</>)
}