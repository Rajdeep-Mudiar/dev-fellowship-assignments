import Accordian from "../components/01_accordian";
import RandomColor from "../components/02_random_color";
import StarRating from "../components/03_star_rating";
import ImageSlider from "../components/04_image_slider";

import LoadMoreData from "../components/05_load_more_data";
import TreeView from "../components/06_tree_view";
import menus from "../components/06_tree_view/data";
import QRCodeGenerator from "../components/07_qr_code_generator";
import LightDarkMode from "../components/08_light_dark_theme";
import ScrollIndicator from "../components/09_scroll_indicator";
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
      <h1 style={{ textAlign: "center", padding: "50px" }}>Tree View</h1>
      <TreeView menus={menus} />

      <h1 style={{ textAlign: "center", padding: "50px" }}>
        QR Code Generator
      </h1>

      <QRCodeGenerator />

      {/* Light Dark Theme */}
      <h1 style={{ textAlign: "center", padding: "50px" }}>Light Dark Theme</h1>

      <LightDarkMode />

      {/* Scroll Indicator */}
      <h1 style={{ textAlign: "center", padding: "50px" }}>Scroll Indicator</h1>

      <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} />
    </>
  );
}

export default App;
