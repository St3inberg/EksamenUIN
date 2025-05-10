
import { useEffect, useState } from "react";
// const APIKEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
export default function Home() {


  const [findings, setFindings] = useState()
  const [neon, setNeon] = useState()
  const [skeikamp, setSkeikamp] = useState()
  const [rock, setRock] = useState()

  
    const getFindings = async () => {
     fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=findings&locale=*")
     .then((response) => response.json())
     .then((data) => setFindings(data._embedded.events[0]))
     .catch((error) => console.error("Skjedde noe dritt ved fetch findings", error));
   }
   const getNeon = async () => {
     fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=Neon&locale=*")
     .then((response) => response.json())
     .then((data) => setNeon(data._embedded.events[0]))
     .catch((error) => console.error("Skjedde noe dritt ved fetch neon", error));
   }
   
   const getSkeikamp = async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=skeikampenfestivalen&locale=*")
    .then((response) => response.json())
    .then((data) => setSkeikamp(data._embedded.events[0]))
    .catch((error) => console.error("Skjedde noe dritt ved fetch skeikamp", error));
  }

  const getRock= async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=tons%20of%20rock&locale=*")
    .then((response) => response.json())
    .then((data) => setRock(data._embedded.events[0]))
    .catch((error) => console.error("Skjedde noe dritt ved fetch rock", error));
  }
  
   
   useEffect(() => {
     getFindings()
     getNeon()
     getSkeikamp()
     getRock()
     console.log("Her finner jeg findings --", findings)
     console.log("Her finner jeg neon -- ", neon)
     console.log("Her finner jeg Skeikamp --", skeikamp)
     console.log("Her finner jeg Rock --", rock)
 }, [])
    
   

    return (
      <div className="container">
        <h1 className="section-title">Velkommen til Hjemside!!</h1>
        <section>
          {
            // map.(){}
          }
          <HomeCard/>

        </section>
        
        
        <p>Oppdag de feteste arrangementene innen musikk, teater og mer!</p>
      </div>
    );
  }
  