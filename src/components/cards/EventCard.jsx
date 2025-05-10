


export default function EventCard ({finding}) {
  

  

  return (
    
      <article className="event-card">
              <img src={finding.images?.[6]?.url} alt={finding.name} />
              <h2>{finding?.name}</h2>
                 {/* <Link to={`/event/${finding?.id}`}><h2>Mer info om {finding?.name}</h2></Link> */}
      </article>
      
    
  );
};



