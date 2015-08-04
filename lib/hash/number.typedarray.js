'use strict';

// MODULES //

var typedarray = require( './../out.typedarray.js' ),
	fcn = require( './../number-typedarray.js' );


// FUNCTIONS //

/**
* FUNCTION: out( x, y, opts )
*	Creates an output typed array.
*
* @private
* @param {Number} x - input number
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y - input typed array
* @param {Object} opts - function options
* @param {String} opts.dtype - output data type
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output typed array
*/
function out( x, y, opts ) {
	return typedarray( y.length, opts.dtype );
} // end FUNCTION out()


// HASH //

var hash = {};
hash.out = out;
hash.fcn = fcn;


// EXPORTS //

module.exports = hash;
