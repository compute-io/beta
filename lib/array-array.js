'use strict';

// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, arr, y )
*	Evaluates the beta function for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]} arr - input array
* @param {Number[]} y - an array of equal length
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, arr, y ) {
	var len = arr.length,
		i;

	if ( len !== y.length ) {
		throw new Error( 'beta()::invalid input arguments. Inputs arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		if ( typeof y[ i ] === 'number' && typeof arr[ i ] === 'number' ) {
			out[ i ] = BETA( arr[ i ], y[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
