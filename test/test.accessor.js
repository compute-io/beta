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
	beta = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor beta', function tests() {

	it( 'should export a function', function test() {
		expect( beta ).to.be.a( 'function' );
	});

	it( 'should evaluate the beta function using an accessor when y is a scalar', function test() {
		var data, actual, expected;

		data = [
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':40}
		];
		actual = new Array( data.length );
		actual = beta( actual, data, 2, getValue );

		expected = [
			0.009090909090909092,
			0.002380952380952381,
			0.001075268817204301,
			0.0006097560975609757
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the beta function using an accessor when y is an array', function test() {
		var data, actual, expected, y;

		data = [
			{'x':10},
			{'x':20},
			{'x':30},
			{'x':40}
		];

		y = [
			10,
			20,
			30,
			40
		];

		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue );

		expected = [
			1.082508822446903e-06,
			7.254444551924845e-13,
			5.637077964048311e-19,
			4.650850914009383e-25
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should evaluate the beta function for two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
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

		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue );

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

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( beta( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = beta( actual, data, 1, getValue );

		expected = [ 1, NaN, 0.3333333333333333 ];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue );
		expected = [ 1, NaN, 0.03333333333333333 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i ) {
			return d.x;
		}

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue );
		expected = [ 1, NaN, 0.03333333333333333 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = beta( actual, data, y, getValue2 );
		expected = [ 1, NaN, 0.03333333333333333 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided a y array which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			beta( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a typed array as y which is not of equal length to the x array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			beta( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
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
