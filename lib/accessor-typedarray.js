'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y, accessor )
*	Evaluates the beta function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|} y - an array of equal length
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, arr, y, clbk ) {
	var len = arr.length,
		i,
		arrVal;

	if ( len !== y.length ) {
		throw new Error( 'beta()::invalid input argument. Input arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		arrVal = clbk( arr[ i ], i, 0 );
		if ( typeof arrVal === 'number' ) {
			out[ i ] = BETA( arrVal, y[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
