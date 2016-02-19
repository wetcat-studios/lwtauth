Litterbox Web Token
===================

A simple token handling library for the Litterbox web system, it's inspired heavily
by JWT, but with a few small specific differences.

## Installation

`npm install lwtauth --save`

## Usage

```
  var lwt = require('lwtauth)
  var data = lwt.decode(token)
```

## Tests

`npm test`

## Release history

0.1.0 Initial release
0.1.2 Fixed the token decoding
0.1.3 The decode should return false when token is undefined
0.1.4 Added encode function, and improved testcases