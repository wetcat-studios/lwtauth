'strict mode'

module.exports = {

  /**
   * Decodes the LWT token into the three parts.
   * 
   * @param {String} lwtToken
   * @return [String]
   */
  decode: function (lwtToken) {
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
    var header = undefined;
    try {
      header = JSON.parse(window.atob(decodeURIComponent(parts[0])));
    } catch (err) {
      return false;
    }
    var data = undefined;
    try {
      data = JSON.parse(window.atob(decodeURIComponent(parts[1])));
    } catch (err) {
      return false;
    }
    var secret = undefined;
    try {
      secret = window.atob(decodeURIComponent(parts[2]));
    } catch (err) {
      return false;
    }

    // Test the secret, it should be a UUID
    var validSecret = new RegExp('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i');
    if (!validSecret.test(secret)) {
      return false;
    }
    
    // Return them as an array
    return [header, data, secret];
  }

};