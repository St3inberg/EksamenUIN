import React, { useState } from 'react';
import ticketmaster from './api/ticketmaster'

export default function CategoryPage() {

  //https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=music&locale=* til Music 
  // https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=theater&locale=* til tiater 
  // https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=theater&locale=* til spott




 

  const [category, setCategory] = useState()

    const  = async () => {
     fetch("https://app.ticketmaster.com/discovery/v2/attractions?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&id=K8vZ917K7fV,%20K8vZ917_YJf,%20K8vZ917oWOV,%20K8vZ917bJC7&locale=*")
     .then((response) => response.json())
     .then((data) => setFindings(data._embedded.attractions))
     .catch((error) => console.error("Skjedde noe dritt ved fetch findings", error));
   
   }







  return (
    <section>
      <h2>musiker</h2>


    </section>
  );
};


