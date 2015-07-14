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

The
is related to the [Gamma function](https://en.wikipedia.org/wiki/Gamma_function) via the following equation

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

Evaluates the [Beta function](http://en.wikipedia.org/wiki/Beta_function) (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `y` has to be either an `array` or `matrix` of equal dimensions as `x` or a single number. Correspondingly, the function returns either an `array` with the same length as the x `array`, a `matrix` with the same dimensions as the x `matrix` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = beta( -1 );
// returns -0.8427

out = beta( [ -10, -1, 0, 1, 10 ] );
// returns [ -1, -0.8427, 0, 0.8427, 1 ]

data = [ 0, 1, 2 ];
out = beta( data );
// returns [ 0, ~0.8427007, ~0.9953222 ]

data = new Int8Array( data );
out = beta( data );
// returns Float64Array( [ 0, ~0.8427007, ~0.9953222 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = beta( mat );
/*
	[  0    ~0.52
	  ~0.84 ~0.97
	  ~1    ~1    ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -10],
	['boop', -1],
	['bip', 0],
	['bap', 1],
	['baz', 10]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = beta( data, {
	'accessor': getValue
});
// returns [ -1, -0.8427, 0, 0.8427, 1 ]
```

When evaluating the [Beta function](https://en.wikipedia.org/wiki/Beta_function) for values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 0},
	{'x': 1},
	{'x': 2},
	{'x': 3},
	{'x': 4}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = beta( data, arr, {
	'accessor': getValue
});
// returns [ 1, 3, 64, 27, 16 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-10]},
	{'x':[1,-1]},
	{'x':[2,0]},
	{'x':[3,1]},
	{'x':[4,10]}
];

var out = beta( data, 'x|1', '|' );
/*
	[
		{'x':[0,-1]},
		{'x':[1,-0.8427]},
		{'x':[2,0]},
		{'x':[3,0.8427]},
		{'x':[4,1]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [0, 1, 2] );

out = beta( data, {
	'dtype': 'int32'
});
// returns Int32Array( [0,0,0] )

// Works for plain arrays, as well...
out = beta( [0, 1, 2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = beta( data, {
	'copy': false
});
// returns [ -1, -0.8427, 0, 0.8427, 1 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = beta( mat, {
	'copy': false
});
/*
	[  0    ~0.52
	  ~0.84 ~0.97
	  ~1    ~1    ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = beta( null );
	// returns NaN

	out = beta( true );
	// returns NaN

	out = beta( {'a':'b'} );
	// returns NaN

	out = beta( [ true, null, [] ] );
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

	out = beta( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = beta( data, {
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
	var out = beta( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, only the `dtype` option is applicable.

	``` javascript
		// Valid:
		var out = power( 2.1, [ 0, 1, 2 ], {
			'dtype': 'int8'
		});
		// returns Int8Array( [1,2,4] )

		// Not valid:
		var out = add( 0.5, [ 0, 1, 2 ], {
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

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
out = beta( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = beta( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = beta( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
tmp = beta( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = beta( mat );


// Matrices (custom output data type)...
out = beta( mat, {
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
