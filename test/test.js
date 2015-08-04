/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate that a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	beta = require( './../lib' ),

	// Function to apply element-wise:
	BETA = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should return NaN if provided only one argument', function test() {
		assert.isTrue( isnan( beta( [1,2,3] ) ) );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				beta( [1,2,3], 2, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				beta( [1,2,3], 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				beta( new Int8Array([1,2,3]), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				beta( matrix( [2,2] ), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error when provided incompatible input data types', function test() {
		expect( foo1 ).to.throw( Error );
		function foo1() {
			beta( matrix( [2,2], new Float64Array(4) ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			beta( new Float64Array(4), matrix( [2,2] ) );
		}

		expect( foo3 ).to.throw( Error );
		function foo3() {
			beta( matrix( [2,2] ), new Array(4) );
		}

		expect( foo4 ).to.throw( Error );
		function foo4() {
			beta( new Array(4), matrix( [2,2] ) );
		}
	});

	it( 'should return NaN when both arguments are neither numbers, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( beta( values[ i ], values[ i ] ) ) );
		}
	});

	it( 'should return NaN when provided one argument which is a number and a second argument which is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( beta( values[ i ], 1 ) ) );
			assert.isTrue( isnan( beta( 1, values[ i ] ) ) );
		}
	});

	it( 'should evaluate the beta function provided two numbers', function test() {
		assert.closeTo( beta( 2, 4 ), 0.05, 1e-7 );
		assert.closeTo( beta( 1, 1 ), 1, 1e-7 );
	});

	it( 'should evaluate the beta function provided a number and an array', function test() {
		var y, actual, expected;

		y = [ 1, 5 ];
		actual = beta( 3, y );

		expected = [
			0.333333333333333315,
			0.009523809523809525
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided a number and a matrix', function test() {
		var y, actual, expected, i;

		y = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = beta( 2, y );

		expected = matrix( new Float64Array([
			0.5,
			0.16666666666666666,
			0.08333333333333333,
			0.05000000000000000
		]), [2,2] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual.data[ i ], expected.data[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the beta function provided a number and an array and return an array having a specified dtype', function test() {
		var y, actual, expected;

		y = [ 1, 10 ];
		actual = beta( 0.1, y, {
			'dtype':'int32'
		});

		expected = new Int32Array( [9,7] );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided a number and a matrix and return a matrix having a specified dtype', function test() {
		var y, actual, expected;

		y = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = beta( 0.4, y, {
			'dtype': 'int32'
		});

		expected = matrix( new Int32Array( [2,1,1,1] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided a matrix and a number and  return a matrix having a specified dtype', function test() {
		var x, actual, expected;

		x = matrix( new Int8Array( [1,2,3,4] ), [2,2] );
		actual = beta( x, 0.4, {
			'dtype': 'int32'
		});

		expected = matrix( new Int32Array( [2,1,1,1] ), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided an array and a number', function test() {
		var x, actual, expected;

		x = [
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

		actual = beta( x, 0.5 );
		assert.notEqual( actual, x );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided two arrays', function test() {
		var x, actual, expected;

		x = [ 1, 2, 3, 4 ];
		expected = [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		];

		actual = beta( x, x );
		assert.notEqual( actual, x );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided a typed array and a number', function test() {
		var x, actual, expected, i;

		x = new Int8Array( [ 3, 6, 9, 12 ] );

		expected = new Float64Array( [
			0.03333333333333333,
			0.005952380952380952,
			0.00202020202020202,
			0.0009157509157509158
		]);

		actual = beta( x, 3 );
		assert.notEqual( actual, x );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the beta function provided two typed arrays', function test() {
		var x, actual, expected, i;

		x = new Float32Array( [ 1, 2, 3, 4 ] );

		expected = new Float64Array( [
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		]);

		actual = beta( x, x );
		assert.notEqual( actual, x );
		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-14 );
		}
	});

	it( 'should evaluate the beta function provided a typed array and a number and return an array of a specified dtype', function test() {
		var x, actual, expected;

		x = [ 1, 2, 3, 4 ];
		expected = new Int8Array( [ 4, 4, 3, 3 ] );

		actual = beta( x, 0.2, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, x );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function provided an object array and a number using an accessor', function test() {
		var x, actual, expected;

		x = [
			[3,10],
			[4,20],
			[5,30],
			[6,40]
		];

		expected = [
			0.009090909090909092,
			0.002380952380952381,
			0.001075268817204301,
			0.0006097560975609757
		];

		actual = beta( x, 2, {
			'accessor': getValue
		});
		assert.notEqual( actual, x );

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 1 ) {
				return d;
			}
			return d[ 1 ];
		}
	});

	it( 'should evaluate the beta function provided two object arrays using an accessor', function test() {
		var x, actual, expected, y;

		x = [
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':40}
		];

		y = [
			{'y':10},
			{'y':20},
			{'y':30},
			{'y':40}
		];

		actual = beta( x, y, {
			'accessor': getValue
		});

		expected = [
			1.082508822446903e-06,
			7.254444551924845e-13,
			5.637077964048311e-19,
			4.650850914009383e-25
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( beta( [], 1 ), [] );
		assert.deepEqual( beta( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( beta( new Int8Array(), 1 ), new Float64Array() );
	});

});
