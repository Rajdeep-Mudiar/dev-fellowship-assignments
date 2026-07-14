import Accordian from "../components/01_accordian";
import RandomColor from "../components/02_random_color";
import StarRating from "../components/03_star_rating";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        {/* Accordion Component */}
        <Accordian />

        {/* Random Color Component */}
        <RandomColor />
      </div>

      {/* Star Rating Component */}
      <StarRating />
    </>
  );
}

export default App;
