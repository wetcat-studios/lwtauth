'strict mode'

module.exports = {

  /**
   * Decodes the LWT token into the three parts.
   * 
   * @param {String} lwtToken
   * @return [String]
   */
  decode: function (lwtToken) {
    // If the token is undefined
    if (!lwtToken) {
      return false;
    }
    
    var parts = lwtToken.split(".");

    // If the length is wrong
    if (parts.length !== 3) {
      return false;
    }

    var correctCharacters = new RegExp('[A-Za-z0-9+/=]');

    // Check if the header and data is Base64
    if (!correctCharacters.test(decodeURIComponent(parts[0])) || !correctCharacters.test(decodeURIComponent(parts[1]))) {
      return false;
    }

    // Get the three separate parts, return false if the decode fails
    var header = new Buffer(unescape(parts[0]), 'base64').toString('ascii');
    var data = new Buffer(unescape(parts[1]), 'base64').toString('ascii');
    var secret = new Buffer(unescape(parts[2]), 'base64').toString('ascii');

    // Test the secret, it should be a UUID
    var validSecret = new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
    if (!validSecret.test(secret)) {
      return false;
    }

    // Return them as an array
    return [header, data, secret];
  }

};