'use strict';

// FUNCTIONS //

var BETA = require( './number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y )
*	Evaluates the beta function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix} y - second input matrix
* @returns {Matrix} output matrix
*/
function beta( out, x, y ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'beta()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	M = x.shape[0];
	N = x.shape[1];
	if ( M !== x.shape[0] || N !== y.shape[1] ) {
		throw new Error( 'beta()::invalid input arguments. Both matrices must have the same number of rows and columns.' );
	}
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			out.set( i, j, BETA( x.get( i, j ), y.get( i, j ) ) );
		}
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
