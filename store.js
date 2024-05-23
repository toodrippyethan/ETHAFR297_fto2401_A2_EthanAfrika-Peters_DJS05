// Initial state
const initialState = { count: 0 };

// Reducer function to handle actions
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 };
        case 'SUBTRACT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        default:
            return state;
    }
}

// Create store function
function createStore(reducer) {
    let state;
    let listeners = [];

    // Get the current state
    function getState() {
        return state;
    }

    // Dispatch an action to update the state
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    // Subscribe to state changes
    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    // Initialize the state
    dispatch({}); // dummy action to initialize state

    return {
        getState,
        dispatch,
        subscribe
    };
}

// Create the store with the counterReducer
const store = createStore(counterReducer);

// Subscribe to the store and log the state to the console whenever it changes
store.subscribe(() => {
    console.log(store.getState());
});

// Scenario 1: Initial State Verification
console.log('Initial State');
console.log(store.getState()); // { count: 0 }

// Scenario 2: Incrementing the Counter
console.log('Scenario 2');
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' });
// State {count: 2}

// Scenario 3: Decrementing the Counter
console.log('Scenario 3');
store.dispatch({ type: 'SUBTRACT' });
// State {count: 1}

// Scenario 4: Resetting the Counter
console.log('Scenario 4');
store.dispatch({ type: 'RESET' });
// State {count: 0}
