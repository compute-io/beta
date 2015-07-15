/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	beta = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the function when y is a scalar', function test() {
			var data, actual, expected;

			data = [
				0.1,
				0.2,
				0.5,
				0.8,
				1,
				2,
				3,
				4,
				5,
				10,
				20,
				100
			];
			actual = new Array( data.length );

			actual = beta( actual, data, 0.5 );

			expected = [
				11.32308697521575,
				6.268653124086035,
				3.141592653589794,
				2.299287818447969,
				2,
				1.333333333333333,
				1.066666666666667,
				0.9142857142857143,
				0.8126984126984126,
				0.567546385503043,
				0.3988173068948813,
				0.1774670794283158
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Float32Array( data );
			actual = new Float32Array( data.length );

			actual = beta( actual, data, 0.5 );
			expected = new Float32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should evaluate the function when y is an array', function test() {
			var data, actual, expected, y;

			data = [
				1,
				2,
				3,
				4
			];

		 	y = [
				1,
				2,
				3,
				4
			];
			actual = new Array( data.length );

			actual = beta( actual, data, y );

			expected = [
				1,
				0.1666666666666667,
				0.03333333333333333,
				0.007142857142857144
			];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

			// Typed arrays...
			data = new Float32Array( data );
			actual = new Float32Array( data.length );

			actual = beta( actual, data, y );
			expected = new Float32Array( expected );

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
		});

		it( 'should return an empty array if provided an empty array', function test() {
			assert.deepEqual( beta( [], [], 1 ), [] );
			assert.deepEqual( beta( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
		});

		it( 'should handle non-numeric values by setting the element to NaN', function test() {
			var data, actual, expected, y;

			data = [ true, null, [], {} ];
			actual = new Array( data.length );
			actual = beta( actual, data, 1 );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			actual = new Array( data.length );
			y = [ 1, 2, 3, 4 ];
			actual = beta( actual, data, y );

			expected = [ NaN, NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, 2, 3 ];
			y = null;
			actual = new Array( data.length );
			actual = beta( actual, data, y );
			expected = [ NaN, NaN, NaN ];

			assert.deepEqual( actual, expected );

			data = [ 1, null, 3 ];
			y = new Int32Array( [1,2,3] );
			actual = new Array( data.length );
			actual = beta( actual, data, y );
			expected = [ 1, NaN, 0.03333333333333333 ];

			assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		});

		it( 'should throw an error if provided a y array which is not of equal length to the input x array', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				beta( [], [1,2], [1,2,3] );
			}
			expect( foo2 ).to.throw( Error );
			function foo2() {
				beta( [], [1,2], new Int32Array( [1,2,3] ) );
			}
		});

		it( 'should throw an error if provided a matrix as y argument', function test() {
			expect( foo ).to.throw( Error );
			function foo() {
				beta( [], [1,2,3,4], matrix( new Int32Array( [1,2,3,4] ), [2,2] ), getValue );
			}
			function getValue( d ) {
				return d;
			}
		});

});
