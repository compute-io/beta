'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' );


// CREATE //

/**
* FUNCTION: create( len, dtype )
*	Creates a new typed array having a specified length.
*
* @param {Number} len - array length
* @param {String} dtype - output data type
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} new typed array
*/
function create( len, dtype ) {
	/* jshint newcap:false */
	var ctor;
	dtype = dtype || 'float64';
	ctor = ctors( dtype );
	if ( ctor === null ) {
		throw new Error( 'beta()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dtype + '`.' );
	}
	return new ctor( len );
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
