//  colors module is used to color the terminal log
import colors from "colors";

// If GET --> green color , POST --> blue color , PUT --> yellow color ,
// Delete --> red color
const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };

  const color = methodColors[req.method || white];
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")} ${req.originalUrl}`[
      color
    ],
  );

  next();
};

export default logger;
