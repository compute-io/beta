'use strict';

// HASH //

var hash = {};

hash.typedarray = require( './hash.array.typedarray.js' );
hash.array = require( './hash.array.array.js' );
hash.number = require( './hash.array.number.js' );


// EXPORTS //

module.exports = hash;
