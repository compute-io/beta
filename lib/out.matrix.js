'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );


// CREATE //

/**
* FUNCTION: create( x[, dtype] )
*	Creates a new matrix having the same shape as a provided input matrix.
*
* @param {Matrix} x - input matrix
* @param {String} [dtype="float64"] - output data type
* @returns {Matrix} new matrix
*/
function create( x, dtype ) {
	dtype = dtype || 'float64';
	return matrix( x.shape, dtype );
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
