'use strict';

// MODULES //

var typedarray = require( './../out.typedarray.js' ),
	fcn = require( './../number-array.js' );


// FUNCTIONS //

/**
* FUNCTION: out( x, y, opts )
*	Creates an output array.
*
* @private
* @param {Number} x - input number
* @param {Array} y - input array
* @param {Object} opts - function options
* @param {String} opts.dtype - output data type
* @returns {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function out( x, y, opts ) {
	if ( opts.dtype ) {
		return typedarray( y.length, opts.dtype );
	}
	return new Array( y.length );
} // end FUNCTION out()


// HASH //

var hash = {};
hash.out = out;
hash.fcn = fcn;


// EXPORTS //

module.exports = hash;
