/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	beta = require( './../lib/array-array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array-array beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			beta( [1,2], [1,2], [1,2,3] );
		}
	});

	it( 'should evaluate the beta function', function test() {
		var expected,
			actual,
			x, y;

		x = [ 1, 2, 3, 4 ];
		y = [ 1, 2, 3, 4 ];

		actual = new Array( x.length );
		actual = beta( actual, x, y );

		expected = [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( beta( [], [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			x, y;

		x = [ true, null, [], {} ];
		y = [ 1, 2, 3, 4 ];
		actual = new Array( x.length );
		actual = beta( actual, x, y );

		expected = [ NaN, NaN, NaN, NaN ];
		assert.deepEqual( actual, expected );

		x = [ 1, 2, 3, 4 ];
		y = [ 1, NaN, 3, null ];
		actual = new Array( x.length );
		actual = beta( actual, x, y );

		expected = [ 1, NaN, 1/3, NaN ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

});
