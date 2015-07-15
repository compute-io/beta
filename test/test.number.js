/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	beta = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the function', function test() {
		assert.closeTo( beta( 1e-7, 1e-7 ), 19999999.99999968, 1e-7 );
		assert.closeTo( beta( 1000, 1 ),  0.001, 1e-7 );
		assert.closeTo( beta( 1e40, 1e40 ), 0, 1e-7 );
	});

	it( 'should return NaN for negative inputs', function test() {
		isnan( beta( -2, 1 ) );
		isnan( beta( 3, -3 ) );
		isnan( beta( -2, -1 ) );
	});

});
