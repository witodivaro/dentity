const fs = require("fs");
const checkHash = require("./src/hashChecker");

let hash =
  "AQAAAAEAACcQAAAAEHmsQLReiPuRvEJ6y4wRdX1+KwacVdWexM7Luoob9qLkV3+zFYAE6M7XC+yGLDxmkg==";

const hashes = [hash];

let existingHashes = {};

const hashesBuffer = fs.readFileSync("hashes.json");

if (!!hashesBuffer.toString()) {
  existingHashes = JSON.parse(hashesBuffer);
}

hashes.forEach((hash) => {
  const now = Date.now();
  checkHash(hash, (pw) => {
    existingHashes[hash] = pw;

    console.log(`HASH: ${hash} | pass: ${pw}`);

    fs.writeFileSync("hashes.json", JSON.stringify(existingHashes, null, 2));

    console.log(Date.now() - now, "ms passed");
    process.exit(0);
  });
});

module.exports = existingHashes;
