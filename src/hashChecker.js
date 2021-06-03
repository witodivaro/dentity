const fs = require("fs");

const PassVerifier = require("./verifier");
const existingHashes = require("..");

const readableStream = fs.createReadStream("passwords.txt");

const passVerifier = new PassVerifier();

module.exports = function checkHash(hash, callback) {
  if (existingHashes[hash]) {
    return callback(existingHashes[hash]);
  }

  readableStream.on("data", async function (chunk) {
    const legitPassword = await passVerifier.verifyChunk(chunk, hash);

    if (legitPassword) {
      return callback(legitPassword);
    }
  });
};
