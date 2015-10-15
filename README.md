

StateBank
=========

helper library for updating nested state object.

this library is mostly a test to see if this will be useful
for piecing together ajax requests/websocket messages to a state
for react.

not much work done on error handling.

## Installation

  npm install

## Run the tests

  npm test

## methods

   state parameter is expected to be an object

   StateBank.set(state, path, value)
   StateBank.del(state, path)
   StateBank.merge(state, path, newValues)
   StateBank.unshift(state, pathToArray, value)
   StateBank.push(state, pathToArray, value)
   StateBank.apply(state, pathToArray, cb)

## path syntax

  property
  property.anotherProperty
  property.arr[1]


