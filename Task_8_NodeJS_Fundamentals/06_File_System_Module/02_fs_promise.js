import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//readFile() --> Promise .then()
fs.readFile(path.join(__dirname, "test.txt"), "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// readFile() --> async/await
const readFile = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "test.txt"), "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// writeFile --> async/await
const writeFile = async () => {
  try {
    await fs.writeFile(
      path.join(__dirname, "test.txt"),
      "Hello my name is rajdeep",
    );
    console.log("File writing to ...");
  } catch (error) {
    console.log(error);
  }
};

// appendFile()
const appendFile = async () => {
  try {
    await fs.appendFile(
      path.join(__dirname, "test.txt"),
      "\nThis is appended text",
    );
    console.log("File appended to ...");
  } catch (error) {
    console.log(error);
  }
};

writeFile();
appendFile();
readFile();
