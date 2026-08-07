import path from "path";
import url from "url";

const filePath = "./dir1/dir2/test.txt";

// basename()
console.log(path.basename(filePath)); // Gives the file name

// dirname()
console.log(path.dirname(filePath)); // gives the file path excluding the file name

// extname()
console.log(path.extname(filePath)); // gives the extension of the file

// parse()
console.log(path.parse(filePath)); // gives an object with all the stuffs like root,dir,base,extension,name

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// join()
const filePath2 = path.join(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath2);

// resolve()
const filePath3 = path.resolve(__dirname, "dir1", "dir2", "test.txt");
console.log(filePath3);
