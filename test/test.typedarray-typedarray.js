/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	beta = require( './../lib/typedarray-typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typedarray-typedarray beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the beta function', function test() {
		var expected,
			actual,
			x, y,
			i;

		x = new Float64Array( [1,2,3,4] );
		y = new Float64Array( [1,2,3,4] );
		actual = new Float64Array( x.length );

		actual = beta( actual, x, y );

		expected = new Float64Array([
			1,
			0.1666666666666667,
			0.03333333333333333,
			0.007142857142857144
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should throw an error if provided input arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			beta( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( beta( [], new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
