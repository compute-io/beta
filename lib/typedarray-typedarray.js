'use strict';

// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, arr, y )
*	Evaluates the beta function for each typed-array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y - an array of equal length
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function  beta( out, arr, y ) {
	var len = arr.length,
		i;
	if ( len !== y.length ) {
		throw new Error( ' beta()::invalid input arguments. Inputs arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
			out[ i ] = BETA( arr[ i ], y[ i ] );
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
