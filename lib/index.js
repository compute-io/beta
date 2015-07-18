'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	getType = require( './getType.js' ),
	nans = require( './nans.js' );


// FUNCTIONS //

var fcns = require( './fcns.js' );


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
		ctor,
		err,
		fcn,
		len,
		out,
		dt,
		sh,
		d;

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	// Determine argument types...
	xType = getType( x );
	yType = getType( y );

	// Handle numeric inputs...
	if ( xType === 'number' && yType === 'number' ) {
		return fcns[ 'number-number' ]( x, y );
	}

	// Determine the output data structure length...
	if ( yType === 'number' ) {
		len = x.length;
	} else {
		len = y.length;
	}

	// Get the implementation (note that only matrices cannot have accessors):
	if ( xType !== 'matrix' && yType !== 'matrix' && opts.accessor ) {
		fcn = fcns[ 'accessor' ];
	} else {
		fcn = fcns[ xType + '-' + yType ];
	}

	// Handle case where one or more inputs is a matrix...
	if ( xType === 'matrix' || yType === 'matrix' ) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix:
		d = new ctor( len );
		sh = ( xType === 'matrix' ) ? x.shape : y.shape;
		out = matrix( d, sh, dt );
	}
	// Handle typed-array output...
	else if ( opts.dtype || (xType === 'typedarray' && yType === 'typedarray') ) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		out = new ctor( len );
	}
	// If no dtype is specified and at least one argument is an array, output an array...
	else {
		out = new Array( len );
	}
	// Handle invalid types...
	if ( xType === null || yType === null ) {
		return ( out.data ) ? nans( out.data ) : nans( out );
	}
	// Handle invalid pairings...
	if ( !fcn ) {
		throw new Error( 'beta()::invalid input arguments. Unsupported argument pair: [' + xType + ', ' + yType + '].' );
	}
	return fcn( out, x, y );
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
