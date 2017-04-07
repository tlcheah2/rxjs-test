
import Rx from 'rxjs/Rx';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import { createStore } from 'redux'
import deepFreeze from 'deep-freeze';
// import { combineReducers } from 'redux'
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
/**
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
 */

//Redux Store Method 
/**
const store = createStore(counter);

// const render = () => {
//     document.body.innerText = store.getState();
// }
// render();

store.dispatch({type: 'INCREMENT'});

store.subscribe(render);
 */

//Redux:- Avoiding Array Mutations with concat(), slice(), and ...spread
/** 
const addCounter = (list) => {
    //list.push(0); // Instead of push , use concat to avoid mutation
    //return [list.concat([0])];

    // ES6 syntax
    return [...list, 0];
    
}

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    
    deepFreeze(listBefore);
    expect(addCounter(listBefore)).toEqual(listAfter);
}

const removeCounter = (list, index) => {
    return [...list.slice(0, index), ...list.slice(index + 1)];
}

const testRemoveCounter = () => {
    const listBefore = [0,10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);
    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
console.log('All test passed');
*/

// Redux - Reducer composition with arrays
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
            }
        case 'TOGGLE_TODO':
            if (state.id != action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state;
    }
};

//Redux - Reducer Composition with Object




//Redux - writing a todolist reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo('undefined', action),
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))
        // return Object.assign({}, todo, {completed: !todo.completed})

        default:
            return state;
    }
}

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    }
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
}

const testToggleTodo = () => {
    const stateBefore = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];
    const action = {
        type: 'TOGGLE_TODO',
        id: 0,
    }
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: true
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);

}

const visibiilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// testAddTodo();
// testToggleTodo();
// console.log('All test passed');

// Combining Reducer Here - Instead doing this manually, we can use combineReducer
// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibiilityFilter(state.visibiilityFilter, action)
//     }
// }

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        console.log('reducer', reducers);
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                console.log('nextState b4 ', nextState);
                console.log('reducer key', reducers[key](state[key], action));
                nextState[key] = reducers[key](state[key], action);
                console.log('nextState after', nextState);
                // console.log('key', key);
                return nextState;
            },
            {}
        );
    };
};

const todoApp = combineReducers({
    todos,
    visibiilityFilter
})


const store = createStore(todoApp);
// console.log('Initial state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching Add Todo');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Learn Redux',
// })
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching Add Todo');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 1,
//     text: 'Go Shopping',
// })
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching Toggle Todo');
// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 1,
// })
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

// console.log('Dispatching SET_VISIBILITY_FILTER');
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED',
// })
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');





