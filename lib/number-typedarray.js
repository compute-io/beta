'use strict';

// FUNCTIONS //

var beta = require( './number-number.js' ),
	arrayfun = require( 'compute-typed-array-number-function' );


// EXPORTS //

module.exports = arrayfun.create( beta, ['number','array'] );
