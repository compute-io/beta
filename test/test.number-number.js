/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate that a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	beta = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-number beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the beta function', function test() {
		assert.closeTo( beta( 1e-7, 1e-7 ), 19999999.99999968, 1e-7 );
		assert.closeTo( beta( 1000, 1 ),  0.001, 1e-7 );
		assert.closeTo( beta( 1e40, 1e40 ), 0, 1e-7 );
	});

	it( 'should return infinity if either `x` or `y` is 0', function test() {
		var pinf = Number.POSITIVE_INFINITY;

		assert.strictEqual( beta( 0, 1 ), pinf );
		assert.strictEqual( beta( 1, 0 ), pinf );
		assert.strictEqual( beta( 0, 0 ), pinf );
	});

	it( 'should return NaN if provided a NaN', function test() {
		assert.isTrue( isnan( beta( 2, NaN ) ) );
		assert.isTrue( isnan( beta( NaN, 1 ) ) );
		assert.isTrue( isnan( beta( NaN, NaN ) ) );
	});

	it( 'should return NaN for negative inputs', function test() {
		assert.isTrue( isnan( beta( -2, 1 ) ) );
		assert.isTrue( isnan( beta( 3, -3 ) ) );
		assert.isTrue( isnan( beta( -2, -1 ) ) );
	});

});
