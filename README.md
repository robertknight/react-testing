React Testability
=================

This is simple Twitter client project which demonstrates
various tools and techniques for writing tests for React
components.

## Requirements
 * [iojs](https://iojs.org) is required in order to use the current version of the jsdom library.

## Libraries and Tools Used
 * React (obviously). v0.13 is used for [shallow-rendering support](http://facebook.github.io/react/docs/test-utils.html#shallow-rendering) which enables
   testing of rendering of a single level of the component tree in isolation.
 * [Mocha](http://mochajs.org/) and chai are the basic testing frameworks used, these were chosen as they
   are popular, polished and well documented. The 
 * [Webpack](http://webpack.github.io/) is used to package the tests for running/debugging in the
   browser.
 * [jsdom](https://github.com/tmpvar/jsdom) is used for testing of rendering DOM components outside of the browser. Version 4.x is used which requires iojs.
 * The [Flummox](https://github.com/acdlite/flummox) implementation of the Flux architecture
   is used for fetching data and updating views in response.
   [Flummox](https://github.com/acdlite/flummox) avoidance of singletons makes it
   easy to inject fake/mock actions in unit and integration tests.
 * [Rewire](https://github.com/jhnns/rewire) is used to show one approach to mocking out
   React components in tests.

## Recommended Reading & Videos
 * TODO: Facebook high-perf components
 * TODO: Property testing with React
 * TODO: React TDD
 * TODO: 'the Node way - how require() works'
