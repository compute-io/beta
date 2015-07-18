'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y )
*	Evaluates the beta function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Number} x - scalar
* @param {Matrix} y - input matrix
* @returns {Matrix} output matrix
*/
function beta( out, x, y ) {
	var len = y.length,
		i;

	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = BETA( x, y.data[ i ] );
	}
	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
