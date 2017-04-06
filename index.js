
import Rx from 'rxjs/Rx';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import { createStore } from 'redux'

// console.clear();

// var source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

// // TODO: Create a var `result` that contains the sum
// // of all numbers in source. Use pure array functions
// // such as map, filter, reduce, reduceRight.
// var result = source.map((x) => parseInt(x))
//     .filter((x) => !isNaN(x))
//     .reduce((x, y) => x + y);


// console.log(result);

//Writing a counter Reducer with Tests
const counter = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

expect(counter(0, {type: 'INCREMENT'})).toEqual(1);
expect(counter(1, {type: 'DECREMENT'})).toEqual(0);
expect(counter(1, {type: 'SOMETHING-ELSE'})).toEqual(1);
expect(counter(undefined, {type: 'SOMETHING-ELSE'})).toEqual(0);

console.log('Test passed');


//Redux Store Method 
const store = createStore(counter);

// const render = () => {
//     document.body.innerText = store.getState();
// }
// render();

store.dispatch({type: 'INCREMENT'});

store.subscribe(render);


//Redux:- Avoiding Array Mutations with concat(), slice(), and /