'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y )
*	Evaluates the beta function for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number} x - scalar
* @param {Array} y - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, x, y ) {
	var len = y.length,
		i;

	for ( i = 0; i < len; i++ ) {
		if ( typeof y[ i ] === 'number' ) {
			out[ i ] = BETA( x, y[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
