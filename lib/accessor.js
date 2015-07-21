'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y, accessor )
*	Evaluates the beta function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - input array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y -
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function beta( out, x, y, clbk ) {
	var len,
		v1,
		v2,
		i;

	if ( typeof x === 'number' ) {
		len = y.length;
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( x, i, 0 );
			v2 = clbk( y[ i ], i, 1 );
			if ( typeof v1 === 'number' && typeof v2 === 'number' ) {
				out[ i ] = BETA( v1, v2 );
			} else {
				out[ i ] = NaN;
			}
		}
		return out;
	}
	len = x.length;
	if ( typeof y === 'number' ) {
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( x[ i ], i, 0 );
			v2 = clbk( y, i, 1 );
			if ( typeof v1 === 'number' && typeof v2 === 'number' ) {
				out[ i ] = BETA( v1, v2 );
			} else {
				out[ i ] = NaN;
			}
		}
		return out;
	}
	if ( len !== y.length ) {
		throw new Error( 'beta()::invalid input argument. Inputs arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		v1 = clbk( x[ i ], i, 0 );
		v2 = clbk( y[ i ], i, 1 );
		if ( typeof v1 === 'number' && typeof v2 === 'number' ) {
			out[ i ] = BETA( v1, v2 );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
