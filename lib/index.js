'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isObject = require( 'validate.io-object' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	deepSet = require( 'utils-deep-set' ).factory,
	validate = require( './validate.js' );


// FUNCTIONS //

var beta1 = require( './number.js' ),
	beta2 = require( './matrix-matrix.js' ),
	beta3 = require( './matrix-number.js' ),
	beta4 = require( './typedarray-typedarray.js' ),
	beta5 = require( './typedarray-array.js' ),
	beta6 = require( './typedarray-number.js' ),
	beta7 = require( './deepset-typedarray.js' ),
	beta8 = require( './deepset-array.js' ),
	beta9 = require( './deepset-number.js' ),
	beta10 = require( './accessor-typedarray.js' ),
	beta11 = require( './accessor-array.js'),
	beta12 = require( './accessor-accessor.js'),
	beta13 = require( './accessor-number.js' ),
	beta14 = require( './array-typedarray.js'),
	beta15 = require( './array-array.js'),
	beta16 = require( './array-number.js');


/**
* FUNCTION: fill( n, val )
*	Creates an array of length n and fills it with the supplied value
* @param {Number} n - array length
* @param {*} val - value to fill the array with
* @returns {Array} array of length n
*/
function fill( n, val ) {
	var ret = new Array( n );
	for ( var i = 0; i < n; i++ ) {
		ret[ i ] = val;
	}
	return ret;
}


// BETA FUNCTION //

/**
* FUNCTION: beta( x, y[, opts] )
*	Evaluates the beta function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} y - either an array or matrix of equal dimension or a scalar
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} function value(s)
*/
function beta( x, y, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d, i,
		dset;

	if ( arguments.length < 2 ) {
		throw new Error( 'beta()::`y` argument is missing.' );
	}
	// Handle cases where first argument is a number
	if ( isNumber( x ) || isnan( x ) ) {
		for ( var key in options ) {
			if ( key !== 'dtype' ){
				throw new Error( 'beta()::only dtype option is applicable when first argument is not array- or matrix-like. Keys: `' + Object.keys( options ) + '`.' );
			}
		}
		if ( isMatrixLike( y ) ) {
			// Create a matrix holding x's:
			d = new Float64Array( fill( y.length, x ) );
			x = matrix( d, y.shape, 'float64' );
			return options ? beta( x, y, options ) : beta( x, y );
		}
		if ( isArrayLike( y ) ) {
			return options ? beta( fill( y.length, x ), y, options ) : beta( fill( y.length, x ), y );
		}
		if ( !isNumber( y ) ) {
			return NaN;
		}
		return beta1( x, y );
	}
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		// Case: `x` is a matrix
		if ( isMatrixLike( y ) ) {
			return beta2( out, x, y );
		} else if ( isArrayLike ( y ) ) {
			throw new Error( 'beta()::invalid input arguments. When provided a matrix, the other input has to be either a matrix of the same dimensionality or a scalar value.' );
		} else if ( typeof y === 'number' ) {
			return beta3( out, x, y );
		} else {
			for ( i = 0; i < x.data.length; i++ ) {
				out.data[ i ] = NaN;
			}
			return out;
		}
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		if ( isMatrixLike( y ) ) {
				throw new Error( 'beta()::invalid input argument. `y` has to be an array or scalar.' );
		} else if ( isTypedArrayLike( y ) ) {
			return beta4( out, x, y );
		} else if ( isArrayLike( y ) ) {
			return beta5( out, x, y );
		} else if (  typeof y === 'number' ) {
			return beta6( out, x, y );
		} else {
			for ( i = 0; i < x.length; i++ ) {
				out[ i ] = NaN;
			}
			return out;
		}
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';

			if ( isMatrixLike( y ) ) {
					throw new Error( 'beta()::invalid input argument. `y` has to be an array or scalar.' );
			} else if ( isTypedArrayLike( y ) ) {
				return beta7( x, y, opts.path, opts.sep );
			} else if ( isArrayLike( y ) ) {
				return beta8( x, y, opts.path, opts.sep );
			} else if ( typeof y === 'number' ) {
					return beta9( x, y, opts.path, opts.sep );
			} else {
				dset = deepSet( opts.path, opts.opts );
				for ( i = 0; i < x.length; i++ ) {
					dset( x[ i ], NaN );
				}
			}
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'beta()::invalid input argument. Unrecognized/unsupported array-like object. Provide either a plain or typed array. Value: `' + x + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			// Case: x is an object array
			if ( isMatrixLike( y ) ) {
				throw new Error( 'beta()::invalid input argument. `y` has to be an array or scalar when `x` is an object array.' );
			} else if ( isTypedArrayLike( y ) ) {
				return beta10( out, x, y, opts.accessor );
			} else if ( isArrayLike( y ) ) {
				if ( !isObject( y[ 0 ] ) ) {
					// Guess that y is a primitive array -> callback does not have to be applied
					return beta11( out, x, y, opts.accessor );
				} else {
					// y is an object array, too -> callback is applied
					return beta12( out, x, y, opts.accessor );
				}
			} else {
				if ( typeof y === 'number' ) {
					return beta13( out, x, y, opts.accessor );
				} else {
					for ( i = 0; i < x.length; i++ ) {
						out[ i ] = NaN;
					}
					return out;
				}
			}
		}
		// Case: x is an array
		if ( isMatrixLike( y ) ) {
				throw new Error( 'beta()::invalid input argument. `y` has to be an array or scalar.' );
		} else if ( isTypedArrayLike( y ) ) {
			return beta14( out, x, y );
		} else if ( isArrayLike( y ) ) {
			return beta15( out, x, y );
		} else if ( typeof y === 'number' ) {
			return beta16( out, x, y );
		} else {
			for ( i = 0; i < x.length; i++ ) {
				out[ i ] = NaN;
			}
			return out;
		}
	}
	return NaN;
} // end FUNCTION beta()

// EXPORTS //

module.exports = beta;
