'use strict';

// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y, accessor )
*	Evaluates the beta function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} y - scalar
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, arr, y, clbk ) {
	var len = arr.length,
		i,
		arrVal;

	for ( i = 0; i < len; i++ ) {
		arrVal = clbk( arr[ i ], i );
		if ( typeof arrVal === 'number' ) {
			out[ i ] = BETA( arrVal, y );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
