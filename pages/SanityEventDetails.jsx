import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../sanity';



const SanityEventDetails = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [extra, setExtra] = useState(null);

  useEffect(() => {
    
    client.fetch(`*[_type == 'event' && slug.current == $slug][0]`, { slug }).then(e => {
      setEvent(e);
      if (!e?.apiId) return;

      
      
        
    });
  }, [slug]);

  if (!event || !extra) return <p>Laster...</p>;

  
};

export default SanityEventDetails;
