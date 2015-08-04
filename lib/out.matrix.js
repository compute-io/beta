'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' );


// CREATE //

/**
* FUNCTION: create( x, dtype )
*	Creates a new matrix having the same shape as a provided input matrix.
*
* @param {Matrix} x - input matrix
* @param {String} dtype - output data type
* @returns {Matrix} new matrix
*/
function create( x, dtype ) {
	/* jshint newcap:false */
	var ctor,
		d;
	dtype = dtype || 'float64';
	ctor = ctors( dtype );
	if ( ctor === null ) {
		throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dtype + '`.' );
	}
	// Create an output matrix:
	d = new ctor( x.length );
	return matrix( d, x.shape, dtype );
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
