import React, { useEffect, useState } from 'react';
//import ticketmaster from './api/ticketmaster'

export default function CategoryPage() {

  //https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=music&locale=* til Music 
  // https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=theater&locale=* til tiater 
  // https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=theater&locale=* til spott

  const APIKEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

//setCategory(data._embedded.attractions))

 

  const [category, setCategory] = useState()

    

    const fetchCategor = async () => {
     fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=music&locale=*")
     .then((response) => response.json())
     .then((data) => setCategory(data._embedded))
     .catch((error) => console.error("Skjedde noe dritt ved fetch kategri", error));
   
   }


   useEffect(()=>{
        fetchCategor()
    console.log("katagori musik", category)
   }, [])



  return (
    <section>
      <h2>musiker</h2>


    </section>
  );
};


