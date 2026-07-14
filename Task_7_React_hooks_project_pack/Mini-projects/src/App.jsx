import Accordian from "../components/01_accordian";
import RandomColor from "../components/02_random_color";
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
    </>
  );
}

export default App;
