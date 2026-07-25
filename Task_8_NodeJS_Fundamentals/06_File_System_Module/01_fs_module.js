import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//readFile() --> callback --> parameters (fileLocation,encoding,callback)
fs.readFile(path.join(__dirname, "test.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// readFileSync() --> synchronous version
const data = fs.readFileSync(path.join(__dirname, "test.txt"), "utf-8");
console.log(data);
