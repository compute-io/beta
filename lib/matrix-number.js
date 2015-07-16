'use strict';

// FUNCTIONS //

var BETA = require( './number-number.js' );


// BETA FUNCTION //

/**
* FUNCTION: beta( out, x, y )
*	Evaluates the beta function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Number} y - scalar
* @returns {Matrix} output matrix
*/
function beta( out, x, y ) {
	var len = x.length,
		i;

	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = BETA( x.data[ i ], y );
	}

	return out;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
