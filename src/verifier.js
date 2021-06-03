const crypto = require("aspnetcore-identity-password-hasher");

const now = Date.now();

class PassVerifier {
  async verifyChunk(chunk, hash) {
    const passwordsToCheck = chunk.toString().split("\n");

    for (let i = 0; i < passwordsToCheck.length; i++) {
      const passToCheck = passwordsToCheck[i];

      const result = await crypto.verify(passToCheck, hash);

      console.log(`Checking ${passToCheck}`);

      if (result) {
        return passToCheck;
      }
    }
  }
}

module.exports = PassVerifier;
