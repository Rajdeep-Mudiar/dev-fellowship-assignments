import Accordian from "../components/01_accordian";
import RandomColor from "../components/02_random_color";
import StarRating from "../components/03_star_rating";
import ImageSlider from "../components/04_image_slider";

import LoadMoreData from "../components/05_load_more_data";
import TreeView from "../components/06_tree_view";
import menus from "../components/06_tree_view/data";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        {/* Accordion Component */}
        <h1 style={{ textAlign: "center", padding: "50px" }}>Accordian</h1>
        <Accordian />

        {/* Random Color Component */}
        <h1 style={{ textAlign: "center", padding: "50px" }}>
          Random Color Generator
        </h1>
        <RandomColor />
      </div>

      {/* Star Rating Component */}
      <h1 style={{ textAlign: "center", padding: "50px" }}>Star Rating</h1>

      <StarRating />

      {/* Image Slider Component */}
      <h1 style={{ textAlign: "center", padding: "50px" }}>Image Slider</h1>
      <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"10"}
      />

      {/* Load More Data */}
      <h1 style={{ textAlign: "center", padding: "50px" }}>Load More Data</h1>

      <LoadMoreData />

      {/* Tree View component/menu UI component */}
      <TreeView menus={menus} />
    </>
  );
}

export default App;
