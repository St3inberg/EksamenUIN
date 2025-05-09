import { Link } from "react-router-dom";

export default function Nav() {
  const kategorier = [
    { id: 1, name: "Musikk", slug: "musikk" },
    { id: 2, name: "Sport", slug: "sport" },
    { id: 3, name: "Teater", slug: "teater" }
  ];

  return (
    <nav>
      <h2><Link to="/">Billettlyst</Link></h2>
      <ul>
        {kategorier.map(k => (
          <li key={k.id}>
            <Link to={`/kategori/${k.slug}`}>{k.name}</Link>
          </li>
        ))}
        <li><Link to="/dashboard">Logg inn</Link></li>
      </ul>
    </nav>
  );
}
