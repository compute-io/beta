'use strict';

// MODULES //

var validate = require( './validate.js' ),
	getType = require( './getType.js' ),
	hash = require( './hash' ),
	matrix = require( './out.matrix.js' ),
	typedarray = require( './out.typedarray.js' ),
	accessor = require( './accessor.js' ),
	nans = require( './nans.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( x, y[, opts] )
*	Evaluates the beta function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} y - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} beta function value(s)
*/
function beta( x, y, options ) {
	/* jshint newcap:false */
	var opts = {},
		xType,
		yType,
		err,
		out,
		tmp,
		h;

	if ( arguments.length < 2 ) {
		throw new Error( 'beta()::insufficient input arguments.' );
	}
	else if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	// Determine argument types...
	xType = getType( x );
	yType = getType( y );

	// Search the hash for matches...
	h = hash[ xType ];
	if ( h === void 0 ) {
		// `x` is not a supported type...
		if ( yType === 'number' || yType === null ) {
			return NaN;
		}
		if ( yType === 'matrix' ) {
			out = matrix( y, opts.dtype );
			nans( out.data );
			return out;
		}
		if ( yType === 'typedarray' ) {
			out = typedarray( y.length, opts.dtype );
		} else {
			out = new Array( y.length );
		}
		return nans( out );
	}
	h = h[ yType ];
	if ( h === void 0 ) {
		// `y` is not a supported type...
		if ( xType === 'number' ) {
			return NaN;
		}
		tmp = xType + '-' + yType;
		if (
			tmp === 'matrix-array' ||
			tmp === 'matrix-typedarray' ||
			tmp === 'array-matrix' ||
			tmp === 'typedarray-matrix'
		) {
			throw new Error( 'beta()::invalid input arguments. Unsupported argument pair: [' + xType + ', ' + yType + '].' );
		}
		if ( xType === 'matrix' ) {
			out = matrix( x, opts.dtype );
			nans( out.data );
			return out;
		}
		if ( xType === 'typedarray' ) {
			out = typedarray( x.length, opts.dtype );
		} else {
			out = new Array( x.length );
		}
		return nans( out );
	}
	// At this point, we should only have supported input types...

	// Handle numeric inputs...
	if ( xType === 'number' && yType === 'number' ) {
		return h( x, y );
	}
	// Create an output data structure...
	out = h.out( x, y, opts );

	// Check if an accessor has been provided (note that only matrices cannot have accessors)...
	if ( opts.accessor && xType !== 'matrix' && yType !== 'matrix' ) {
		return accessor( out, x, y, opts.accessor );
	}
	// Evaluate the beta function:
	return h.fcn( out, x, y );
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
