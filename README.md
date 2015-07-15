beta
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Evaluates the beta function.

The [Beta function](https://en.wikipedia.org/wiki/Beta_function), also called the Euler integral, is defined as

<div class="equation" align="center" data-raw-text="
	\operatorname{Beta}(x,y) = \int_0^1t^{x-1}(1-t)^{y-1}\,\mathrm{d}t" data-equation="eq:beta_function">
	<img src="https://cdn.rawgit.com/compute-io/beta/dc1b91b2b17b768ee83b3c2f4a47f3f6d4c2f624/docs/img/eqn1.svg" alt="Equation for the beta function.">
	<br>
</div>

It is related to the [Gamma function](https://en.wikipedia.org/wiki/Gamma_function) via the following equation

<div class="equation" align="center" data-raw-text="
\operatorname{Beta}(x,y)=\dfrac{\Gamma(x)\,\Gamma(y)}{\Gamma(x+y)} \!
" data-equation="eq:beta_function2">
	<img src="https://cdn.rawgit.com/compute-io/beta/dc1b91b2b17b768ee83b3c2f4a47f3f6d4c2f624/docs/img/eqn2.svg" alt="Beta function expressed in terms of the Gamma function.">
	<br>
</div>

## Installation

``` bash
$ npm install compute-beta
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var beta = require( 'compute-beta' );
```

#### beta( x, y[, options] )

Evaluates the [Beta function](http://en.wikipedia.org/wiki/Beta_function) (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `y` has to be either an `array` or `matrix` of equal dimensions as `x` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = beta( 1, 1 );
// returns ~1

out = beta( 0, 0 );
// returns +Infinity

out = beta( -1, 1 );
// returns NaN

out = beta( [ 5, 10, 15, 20, 25, 30 ], 0.2 );
// returns [ ~3.382, ~2.920, ~2.685, ~2.532, ~2.419, ~2.331 ]

data = new Int8Array( data );
out = beta( data );
// returns Float64Array( [~3.382,~2.920,~2.685,~2.532,~2.419,~2.331] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i * 5 + 5;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 5   10
	  15  20
	  25  30 ]
*/

out = beta( mat, 0.2 );
/*
	[ ~3.382 ~2.920
	  ~2.685 ~2.532
	  ~2.419 ~2.331 ]
*/
```

The function accepts the following `options`:

*	 __accessor__: accessor `function` for accessing `array` values.
*	 __dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 10],
	['bip', 15],
	['bap', 20],
	['baz', 25]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = beta( data, 0.2, {
	'accessor': getValue
});
// returns [ ~3.382, ~2.920, ~2.685, ~2.532, ~2.419 ]
```

When evaluating the [Beta function](https://en.wikipedia.org/wiki/Beta_function) for values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 1],
	['boop', 2],
	['bip', 3],
	['bap', 4],
	['baz', 5]
];

var y = [
	{'x': 1},
	{'x': 2},
	{'x': 3},
	{'x': 4},
	{'x': 5}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = beta( data, y, {
	'accessor': getValue
});
// returns [ ~1, ~0.167, ~0.033, ~0.007, ~0.002 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,5]},
	{'x':[1,10]},
	{'x':[2,15]},
	{'x':[3,20]},
	{'x':[4,25]}
];

var out = beta( data, 0.2, 'x|1', '|' );
/*
	[
		{'x':[0,~3.382]},
		{'x':[1,~2.920]},
		{'x':[2,~2.685]},
		{'x':[3,~2.532]},
		{'x':[4,~2.419]}
	]
*/
var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [10,20,30] );

out = beta( data, 0.01, {
	'dtype': 'int32'
});
// returns Int32Array( [97,96,96] )

// Works for plain arrays, as well...
out = beta( [ 10, 20, 30 ], 0.01, {
	'dtype': 'uint8'
});
// returns Uint8Array( [97,96,96] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ 5, 10, 15, 20, 25, 30 ];

var out = beta( data, 0.2, {
	'copy': false
});
// returns [ ~3.382, ~2.920, ~2.685, ~2.532, ~2.419, ~2.331 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i * 5 + 5;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 5   10
	  15  20
	  25  30 ]
*/

out = beta( mat, {
	'copy': false
});
/*
	[ ~3.382 ~2.920
	  ~2.685 ~2.532
	  ~2.419 ~2.331 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = beta( null, 1 );
	// returns NaN

	out = beta( true, 1 );
	// returns NaN

	out = beta( {'a':'b'}, 1 );
	// returns NaN

	out = beta( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = beta( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = beta( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = beta( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, only the `dtype` option is applicable.

	``` javascript
		// Valid:
		var out = beta( 2, [ 1, 2, 3 ], {
			'dtype': 'int8'
		});
		// returns Int8Array( [0,0,0] )

		// Not valid:
		var out = beta( 2, [ 1, 2, 3 ], {
			'copy': false
		});
		// throws an error
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	 beta = require( 'compute-beta' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
out = beta( data, 0.5 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = beta( data, 0.5, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = beta( data, 0.5, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
tmp = beta( data, 0.5 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = beta( mat, 0.5 );

// Matrices (custom output data type)...
out = beta( mat, 0.5, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-beta.svg
[npm-url]: https://npmjs.org/package/compute-beta

[travis-image]: http://img.shields.io/travis/compute-io/beta/master.svg
[travis-url]: https://travis-ci.org/compute-io/beta

[coveralls-image]: https://img.shields.io/coveralls/compute-io/beta/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/beta?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/beta.svg
[dependencies-url]: https://david-dm.org/compute-io/beta

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/beta.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/beta

[github-issues-image]: http://img.shields.io/github/issues/compute-io/beta.svg
[github-issues-url]: https://github.com/compute-io/beta/issues
