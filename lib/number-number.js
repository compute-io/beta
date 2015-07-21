'use strict';

// MODULES //

var gamma = require( 'gamma' ),
	betaln = require( './betaln.js' ); //require( 'compute-betaln/lib/number.js' );


// FUNCTIONS //

var EXP = Math.exp;


// VARIABLES //

var GAMMA_XMAX = 171.61447887182298;


// BETA //

/**
* FUNCTION: beta( x, y )
*	Evaluates the beta function.
*
* @param {Number} x - input value
* @param {Number} y - input value
* @returns {Number} evaluated beta function
*/
function beta( x, y  ) {
	if ( x !== x || y !== y || x < 0 || y < 0 ) {
		return NaN;
	}
	if ( x === 0 || y === 0 ) {
		return Number.POSITIVE_INFINITY;
	}
	if ( x + y > GAMMA_XMAX ) {
		return EXP( betaln( x, y ) );
	}
	return gamma( x ) * gamma( y ) / gamma( x + y );
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;
