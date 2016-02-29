'use strict'

var errors = require('./errors');

/**
 * Helper function for decoding "Litterbox web tokens".
 * 
 * Copyright 2015 Andreas Göransson (https://github.com/agoransson)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {

  /**
   * Encode the LWT token.
   * 
   * @param {String} identifier
   * @param {String} name
   * @param {String} role
   * @param {String} secret
   * @return [String]
   */
  encode: function (identifier, name, role, secret) {
    // If any of the values are undefined, return error
    if (!identifier) {
      return errors.undefinedIdentifier;
    }
    if (!name) {
      return errors.undefinedName;
    }
    if (!role) {
      return errors.undefinedRole;
    }
    if (!secret) {
      return errors.undefinedSecret;
    }
    
    // Make sure identifier is a valud UUID
    var validUuid = new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
    if (!validUuid.test(identifier)) {
      return errors.badIdentifier;
    }
    
    // Make sure secret is a valud UUID
    if (!validUuid.test(secret)) {
      return errors.badSecret;
    }
    
    // Build the header
    var headerObj = {alg: 'AES-256-CBC', typ: 'litterbox'};
    var header = new Buffer(JSON.stringify(headerObj)).toString('base64');
    
    // Build the data
    var dataObj = {uuid: identifier, name: name, role: role};
    var data = new Buffer(JSON.stringify(dataObj)).toString('base64');
    
    // Build the footer
    var footer = new Buffer(secret).toString('base64');
    
    // Construct the token
    return header.trim().replace(/=/g, '') + '.' + data.trim().replace(/=/g, '') + '.' + footer.trim().replace(/=/g, '');
  },
  
  /**
   * Decodes the LWT token.
   * 
   * @param {String} lwtToken
   * @return [String]
   */
  decode: function (lwtToken) {
    // If the token is undefined
    if (!lwtToken) {
      return errors.undefinedToken;
    }
    
    var parts = lwtToken.split(".");

    // If the length is wrong
    if (parts.length < 3) {
      return errors.shortToken;
    } else if (parts.length > 3) {
      return errors.longToken;
    }

    var correctCharacters = new RegExp('[A-Za-z0-9+/=]');

    // Check if the header and data is Base64
    if (!correctCharacters.test(decodeURIComponent(parts[0])) || !correctCharacters.test(decodeURIComponent(parts[1]))) {
      return errors.badToken;
    }

    // Get the three separate parts, return false if the decode fails
    var header = new Buffer(unescape(parts[0]), 'base64').toString('ascii');
    var data = new Buffer(unescape(parts[1]), 'base64').toString('ascii');
    var secret = new Buffer(unescape(parts[2]), 'base64').toString('ascii');

    var headerObj = null;
    try {
      headerObj = JSON.parse(header);
    } catch (err) {
      return errors.badHeader;
    }
    
    var dataObj = null;
    try {
      dataObj = JSON.parse(data);
    } catch (err) {
      return errors.badData;
    }
    
    // Test the secret, it should be a UUID
    var validSecret = new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
    if (!validSecret.test(secret)) {
      return errors.badSecret;
    }

    // Return them as an array
    return [headerObj, dataObj, secret];
  }

};