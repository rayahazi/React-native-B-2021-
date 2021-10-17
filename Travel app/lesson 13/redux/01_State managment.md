# State managment & redux

Official Redux Docs: https://redux.js.org/introduction/getting-started

React Redux Docs: https://react-redux.js.org/

## Managing data in our app

- Moving data from part A to B etc...

### Example

If we need one state in 2 diffrent places -> how do we pass it? using props? through each component?
It is very compilcated.

## Redux - central store

Redux is a third-party-library.

#### How redux works:

1. stores the entire app state
2. if component wants to manipulate app state -> it sends Action.
3. The action reaches the reducers (the developer built it according to the need) and reducers update the state.
4. dispatch - the way to activate the progress. It sends data to the reducer - that will check what to do - and redirect to the right place in the action.
   <img src="IMG/2.PNG">
