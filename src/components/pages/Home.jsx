import FestivalSection from "../sections/FestivalSection";
import CityEventsSection from "../sections/CityEventsSection";

export default function Home() {
  return (
    <div className="container">
      <div className="welcome-section">
        <h1 className="section-title">Velkommen til Billetlyst</h1>
        <p className="welcome-text">Oppdag de feteste arrangementene innen musikk, teater og mer!</p>
      </div>
      <FestivalSection />
      <CityEventsSection />
    </div>
  );
}