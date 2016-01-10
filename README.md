React Testability
=================

This is a simple Twitter client project which demonstrates
various tools and techniques for writing tests for React
components, written as part of a talk ([slides](https://robertknight.github.io/react-testing/docs/react-london-talk.html),  [video](https://www.youtube.com/watch?v=_RKrgouBvLM)) at the
[London React](http://www.meetup.com/London-React-User-Group/) meetup.

It shows the essentials for writing tests for a React application that can be run in Node
and the browser, isolating modules under test using shallow rendering and rewire() and
using Flummox for testable use of the Flux architecture.

## Requirements
 * NodeJS 4.x or later is required in order to use the current version of the jsdom library.

## Building and running

```
npm install .
make

# run the app
# (you can also use 'webpack-dev-server')
python -m SimpleHTTPServer 8000
open http://localhost:8000

# run tests in the browser
open tests.html

# run tests on the command-line
make test
```

## Libraries and Tools Used
 * React (obviously). v0.13 is used for [shallow-rendering support](http://facebook.github.io/react/docs/test-utils.html#shallow-rendering) which enables
   testing of rendering of a single level of the component tree in isolation.
 * [Mocha](http://mochajs.org/) and chai are the basic testing frameworks used, these were chosen as they
   are popular, polished and well documented.
 * [Webpack](http://webpack.github.io/) is used to package the tests for running/debugging in the
   browser.
 * [jsdom](https://github.com/tmpvar/jsdom) is used for testing of rendering DOM components outside of the browser.
 * The [Flummox](https://github.com/acdlite/flummox) implementation of the Flux architecture
   is used for fetching data and updating views in response.
   [Flummox](https://github.com/acdlite/flummox) avoidance of singletons makes it
   easy to inject fake/mock actions in unit and integration tests.
 * [Rewire](https://github.com/jhnns/rewire) is used to show one approach to mocking out
   React components in tests.
 * [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) provides a uniform API for fetching data in the browser and Node.

## Recommended Reading & Videos
 * [Awesome React - Testing React Tutorials](https://github.com/enaqx/awesome-react#testing-react-tutorials) - Awesome React is a great collection
   of links for all aspects of building React apps. The section on testing references a number of useful tutorials.
 * Separating visual and data-fetching components
  * [React.js Conf 2015 - Making your app fast with high-performance components](https://www.youtube.com/watch?v=KYzlpRvWZ6c). This talk introduces a policy of separating pure visual components from containers which contain data fetching logic.
 * Beyond unit testing
  * [Dave McCabe - Property Testing for React](https://vimeo.com/122070164). This is a great talk on how to do property testing, where tests are fed a stream of random but repeatable and plausible inputs, and the testing framework checks that various invariants that you specify hold for all inputs.
