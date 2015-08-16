'use strict';

// FUNCTIONS //

var beta = require( './number-number.js' ),
	arrayfun = require( 'compute-array-function' );


// APPLY FUNCTION //

/**
* FUNCTION: apply( x, y )
*	Wraps the beta function and type checks array elements. If both values are numeric, applies the beta function; otherwise, returns `NaN`.
*
* @param {*} x - input value
* @param {*} y - input value
* @returns {Number} evaluated beta function
*/
function apply( x, y ) {
	if ( typeof x !== 'number' || typeof y !== 'number' ) {
		return NaN;
	}
	return beta( x, y );
} // end FUNCTION apply()


// EXPORTS //

module.exports = arrayfun.create( apply, 2 );
