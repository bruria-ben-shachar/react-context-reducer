import * as React from 'react'
import {CountProvider, useCount} from './CountContext'

function CountDisplay() {
    // here we only need access to the state vatiable
  const {state} = useCount()
  return <div>{`The current count is ${state.count}`}</div>
}

function Counter() {
    // we we need access to the dispatch (set) function of the state reducer
    // to increment the counter upon clicking the button
  const {dispatch} = useCount()
  return (
      <button onClick={() => dispatch({type: 'increment'})}>
        Increment count
      </button>
  )
}
function App() {
  return (
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
  );
}

export default App;
