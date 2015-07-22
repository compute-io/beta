/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	beta = require( './../lib/number-array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-array beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the beta function', function test() {
		var expected,
			actual,
			x, y;

		x = 1;
		y = [ 1, 2, 3, 4 ];

		actual = new Array( x.length );
		actual = beta( actual, x, y );

		// TODO: compute expected values
		expected = [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( beta( [], 1, [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			x, y;

		x = 5;
		y = [ true, null, [], {} ];

		actual = new Array( x.length );
		actual = beta( actual, x, y );

		expected = [ NaN, NaN, NaN, NaN ];
		assert.deepEqual( actual, expected );

		actual = new Int32Array( x.length );
		actual = beta( actual, x, y );

		// Integer arrays cannot represent NaN:
		expected = [ 0, 0, 0, 0 ];
		assert.deepEqual( actual, expected );
	});

});
