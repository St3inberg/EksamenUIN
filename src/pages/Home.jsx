
import { useEffect, useState } from "react";
import { Link } from "react-router";
// const APIKEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
export default function Home() {


  const [findings, setFindings] = useState()
  // const [neon, setNeon] = useState()
  // const [skeikamp, setSkeikamp] = useState()
  // const [rock, setRock] = useState()

  
    const getFindings = async () => {
     fetch("https://app.ticketmaster.com/discovery/v2/attractions?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&id=K8vZ917K7fV,%20K8vZ917_YJf,%20K8vZ917oWOV,%20K8vZ917bJC7&locale=*")
     .then((response) => response.json())
     .then((data) => setFindings(data._embedded.attractions))
     .catch((error) => console.error("Skjedde noe dritt ved fetch findings", error));
   
   }
  //  const getNeon = async () => {
  //    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=Neon&locale=*")
  //    .then((response) => response.json())
  //    .then((data) => setNeon(data._embedded.events[0]))
  //    .catch((error) => console.error("Skjedde noe dritt ved fetch neon", error));
  //  }
   
  //  const getSkeikamp = async () => {
  //   fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&keyword=skeikampenfestivalen&locale=*")
  //   .then((response) => response.json())
  //   .then((data) => setSkeikamp(data._embedded.events[0]))
  //   .catch((error) => console.error("Skjedde noe dritt ved fetch skeikamp", error));
  // }

  // const getRock= async () => {
  //   fetch("https://app.ticketmaster.com/discovery/v2/events/Z698xZb_Z16vfkqIjU?apikey=plqRhuO50tPOhorgr6ODGoxDpMUYX6qC&locale=*")
  //   .then((response) => response.json())
  //   .then((data) => setRock(data))
  //   .catch((error) => console.error("Skjedde noe dritt ved fetch rock", error));
  // }
  
   
   useEffect(() => {
     getFindings()
    //  getNeon()
    //  getSkeikamp()
    //  getRock()
     console.log("Her finner jeg findings --", findings)
//      console.log("Her finner jeg neon -- ", neon)
//      console.log("Her finner jeg Skeikamp --", skeikamp)
//      console.log("Her finner jeg Rock --", rock)
 }, [])
    
   

    return (
     
        
        <section className="container">
           
           
          <h1 className="section-title">Velkommen til Hjemside!!</h1>
            
          {findings?.map((event, index) => (
            <div key={index}>
              <img src={event.images?.[6]?.url} alt={event.name} />
              <h1>{event.name}</h1>
              <Link to={`/event/${event.id}`}><h2>Mer info om {event.name}</h2></Link>
            </div>
          ))}

         </section>
  

     
        
        
       
    );
  }
  