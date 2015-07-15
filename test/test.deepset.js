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
	beta = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the beta function when y is a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		actual = beta( data, 0.5, 'x' );

		expected = [
			{'x':2},
			{'x':1.333333333333333},
			{'x':1.066666666666667},
			{'x':0.9142857142857143}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]}
		];

		data = beta( data, 0.5, 'x/1', '/' );
		expected = [
			{'x':[9,2]},
			{'x':[9,1.333333333333333]},
			{'x':[9,1.066666666666667]},
			{'x':[9,0.9142857142857143]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );
	});

	it( 'should evaluate the beta function when y is an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		y = [ 1, 2, 3, 4 ];

		actual = beta( data, y, 'x' );

		expected = [
			{'x':1},
			{'x':0.1666666666666667},
			{'x':0.03333333333333333},
			{'x':0.007142857142857144}
		];

		assert.strictEqual( data, actual );
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		// Custom separator...
		data = [
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]},
			{'x':[9,4]}
		];

		data = beta( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,1]},
			{'x':[9,0.1666666666666667]},
			{'x':[9,0.03333333333333333]},
			{'x':[9,0.007142857142857144]}
		];

		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( beta( arr, 1, 'x' ), [] );
		assert.deepEqual( beta( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// raising to a non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = beta( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = beta( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,0.3333333333333333]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = beta( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,0.03333333333333333]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = beta( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,1]},
			{'x':[9,NaN]},
			{'x':[9,0.03333333333333333]}
		];
		assert.isTrue( deepCloseTo( data, expected, 1e-7 ) );

	});


	it( 'should throw an error if provided a matrix as y argument', function test() {
			var data, y;

			data = [
				{'x':[9,0]},
				{'x':[9,1]},
				{'x':[9,2]},
				{'x':[9,3]}
			];
			y = matrix( new Int32Array( [1,2,3,4] ), [2,2] );

			expect( foo ).to.throw( Error );
			function foo() {
				beta(data, y, 'x.1' );
			}
		});

});
