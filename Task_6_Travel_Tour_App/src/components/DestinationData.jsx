import { Component } from "react";
import "./DestinationStyles.css";
import Mountain from "../assets/mountain.jpg";

class DestinationData extends Component {
  render() {
    return (
      <div>
        <div className={this.props.className}>
          <div className="des-text">
            <h2>{this.props.heading}</h2>
            <p>{this.props.text}</p>
          </div>

          <div className="image">
            <img src={this.props.img1} alt={this.props.heading} />

            <img src={this.props.img2} alt="Mountain" />
          </div>
        </div>
      </div>
    );
  }
}

export default DestinationData;
