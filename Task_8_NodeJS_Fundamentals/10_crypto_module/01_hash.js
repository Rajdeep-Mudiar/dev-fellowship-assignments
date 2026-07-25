import crypto from "crypto";

// createHash()
const hash = crypto.createHash("sha256"); // hash algorithm we wannat use in the parameter
hash.update("My name is Rajdeep Mudiar. I love AI/ML");
console.log(hash.digest("hex")); // to get the hash we can use digest method

// randomBytes()
// Stronger cyptographic hexadecimal string
crypto.randomBytes(16, (err, buf) => {
  // here 16 is the size
  if (err) {
    throw err;
  } else {
    console.log(buf.toString("hex"));
  }
});
