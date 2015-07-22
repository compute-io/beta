'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y )
*	Evaluates the beta function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @param {Number} y - scalar
* @returns {Matrix} output matrix
*/
function beta( out, x, y ) {
	var len = x.length,
		i;

	if ( out.length !== len ) {
		throw new Error( 'beta()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = BETA( x.data[ i ], y );
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
