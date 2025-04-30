export default function ArtikkelKort ({article, slug}) {
    return <h1>Dette er et artikkelkort</h1>
}
import { Link, useParams } from "react-router-dom";

  

  return (
    <Link to={`profile/${person.productslug.current}`}>
      
      <article className="profilkort">
      {person.imageUrl && (
        <img src={person.imageUrl} alt={person.personname} />
      )}
        <h3 >{artikkel.artikkelNavn}</h3>
       <p>{person.epost}</p>

      </article>
    </Link>
  );