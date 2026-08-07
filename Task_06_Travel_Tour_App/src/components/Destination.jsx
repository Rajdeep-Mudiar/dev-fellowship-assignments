import Mountain from "../assets/mountain.jpg";
import "./DestinationStyles.css";
import DestinationData from "./DestinationData";
import Beach1 from "../assets/beach_1.png";
import Beach2 from "../assets/beach_2.png";
const Destination = () => {
  return (
    <div className="destination">
      <h1> Popular Destinations </h1>
      <p>
        Discover our most sought-after travel destinations and create
        unforgettable memories.
      </p>

      <DestinationData
        className="first-des"
        heading="Paris"
        text="Experience the city of lights and love. Explore iconic landmarks, indulge in exquisite cuisine, and immerse yourself in the vibrant culture of Paris."
        img1="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        img2={Mountain}
      />

      <DestinationData
        className="first-des-reverse"
        heading="Beach Paradise"
        text="Relax on pristine beaches, swim in crystal-clear waters, and enjoy the sunsets that make this destination unforgettable."
        img1={Beach1}
        img2={Beach2}
      />
    </div>
  );
};

export default Destination;
