'use strict';

// MODULES //

var matrix = require( './../out.matrix.js' ),
	fcn = require( './../matrix-matrix.js' );


// FUNCTIONS //

/**
* FUNCTION: out( x, y, opts )
*	Creates an output matrix.
*
* @private
* @param {Matrix} x - input matrix
* @param {Matrix} y - input matrix
* @param {Object} opts - function options
* @param {String} opts.dtype - output data type
* @returns {Matrix} output matrix
*/
function out( x, y, opts ) {
	return matrix( x, opts.dtype );
} // end FUNCTION out()


// HASH //

var hash = {};
hash.out = out;
hash.fcn = fcn;


// EXPORTS //

module.exports = hash;
