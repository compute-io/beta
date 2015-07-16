'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );


// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y, accessor )
*	Evaluates the beta function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number[]} y - an array of equal length
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
	if ( !isObject( y[ 0 ] ) ) {
		// Guess that y is a primitive array -> callback does not have to be applied
		for ( i = 0; i < len; i++ ) {
			arrVal = clbk( arr[ i ], i, 0 );
			if ( typeof y[ i ] === 'number' && typeof arrVal === 'number' ) {
				out[ i ] = BETA( arrVal, y[ i ] );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		// y is an object array, too -> callback is applied
		for ( i = 0; i < len; i++ ) {
			arrVal = clbk( arr[ i ], i, 0 );
			yVal = clbk( y[ i ], i, 1 );
			if ( typeof arrVal === 'number' && typeof yVal  === 'number' ) {
				out[ i ] = BETA( arrVal, yVal );
			} else {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
