'use strict';

// MODULES //

var betaln = require( 'compute-betaln/lib/number.js' ),
	gamma = require( 'gamma' );


// FUNCTIONS //

var exp = Math.exp;


// VARIABLES //

var GAMMA_XMAX = 171.61447887182298;


// BETA //

/**
* FUNCTION: beta( x )
*	Computes the beta function of a numeric value.
*
* @param {Number} x - input value
* @param {Number} y - second input value
* @returns {Number} function value
*/
function beta( x , y  ) {
	if ( x < 0 || y < 0 ) {
		return NaN;
	} else if ( x === 0 || y === 0 ) {
		return Number.POSITIVE_INFINITY;
	}
	if ( x + y > GAMMA_XMAX ) {
		return exp( betaln( x, y ) );
	} else {
		return gamma( x ) * gamma( y ) / gamma( x + y );
	}
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
