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
* @param {Array} y - an object array of equal length
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, arr, y, clbk ) {
	var len = arr.length,
		i,
		arrVal, yVal;

	if ( len !== y.length ) {
		throw new Error( 'beta()::invalid input argument. Inputs arrays must have the same length.' );
	}

	for ( i = 0; i < len; i++ ) {
		arrVal = clbk( arr[ i ], i, 0 );
		yVal = clbk( y[ i ], i, 1 );
		if ( typeof arrVal === 'number' && typeof yVal  === 'number' ) {
			out[ i ] = BETA( arrVal, yVal );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
