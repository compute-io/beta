'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory;


// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //


/**
* FUNCTION: beta( arr, y, path[, sep] )
*	Evaluates the beta function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} y - an array of equal length
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

		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[ i ], BETA( v, y[ i ] ) );
			} else {
				dset( x[ i ], NaN );
			}
		}
	}
	return x;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
