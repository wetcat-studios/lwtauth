'use strict'

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

var UNDEFINED_TOKEN = 'undefined token';
var UNDEFINED_IDENTIFIER = 'undefined identifier';
var UNDEFINED_NAME = 'undefined name';
var UNDEFINED_ROLE = 'undefined role';
var UNDEFINED_SECRET = 'undefined secret';
var SHORT_TOKEN = 'token is too short';
var LONG_TOKEN = 'token has too long';
var BAD_HEADER = 'token header is badly formatted';
var BAD_DATA = 'token data is badly formatted';
var BAD_SECRET = 'token secret is badly formatted';
var BAD_IDENTIFIER = 'the identifier (uuid) is badly formatted';

module.exports = {
    undefinedToken: {err: UNDEFINED_TOKEN},
    shortToken: {err: SHORT_TOKEN},
    longToken: {err: LONG_TOKEN},
    badHeader: {err: BAD_HEADER},
    badData: {err: BAD_DATA},
    badSecret: {err: BAD_SECRET},
    badIdentifier: {err: BAD_IDENTIFIER},
    undefinedIdentifier: {err: UNDEFINED_IDENTIFIER},
    undefinedName: {err: UNDEFINED_NAME},
    undefinedRole: {err: UNDEFINED_ROLE},
    undefinedSecret: {err: UNDEFINED_SECRET}
};
