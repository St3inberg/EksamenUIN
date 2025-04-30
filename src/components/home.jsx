export default function Home ({artikkel}) {
    return <h1>Velkommen til BillettLyst!</h1>
}

import ArticleCard from "./ArtikkelKort";

// import Artikler from "./ArtikkelKort";
// import Loggkort from './Loggkort';


  return (

    <>
<section id='flex-container'>
  {Artikler?.map((artikkel) => (
        <ArtikkelKort artikkel={artikkel} key={person._id} />
      ))}
</section>
<section >
    <h2> Sommerens events :D </h2>
          
    {loggforing?.map((loggForhome) => (
      <ArtikkelKort loggForhome={loggForhome} key={loggForhome._id}/>
    ))}

  </section>


{/* Kan legge til fler h2 med andre overskrifter med andre artikkelKort under. */}
  </>
  )
