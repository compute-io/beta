'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	
	BETA = require( './number.js' );


// BETA FUNCTION //


/**
* FUNCTION: beta( arr, y, path[, sep] )
*	Evaluates the beta function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} y - either an array of equal length or a scalar
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function beta( x, y, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		v, i;

	if ( arguments.length > 3 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );

		if ( isMatrixLike( y ) ) {
				throw new Error( 'beta()::invalid input argument. `y` has to be an array or scalar.' );
		} else if ( isTypedArrayLike( y ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( x[ i ] );
				if ( typeof v === 'number' ) {
					dset( x[ i ], BETA( v, y[ i ] ) );
				} else {
					dset( x[ i ], NaN );
				}
			}
		} else if ( isArrayLike( y ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( x[ i ] );
				if ( typeof v === 'number' && typeof y[ i ] === 'number' ) {
					dset( x[ i ], BETA( v, y[ i ] ) );
				} else {
					dset( x[ i ], NaN );
				}
			}
		} else {
			if ( typeof y === 'number' ) {
				for ( i = 0; i < len; i++ ) {
					v = dget( x[ i ] );
					if ( typeof v === 'number' ) {
						dset( x[ i ], BETA( v, y ) );
					} else {
						dset( x[ i ], NaN );
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					dset( x[ i ], NaN );
				}
			}
		}
	}
	return x;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
