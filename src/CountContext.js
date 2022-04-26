import * as React from 'react'

// A context that holds the count
const CountContext = React.createContext()

/**
 * A component that implements the count reducer dispatch function
 * @param state
 * @param action
 * @returns {{count: *}|{count: number}}
 */
function countReducer(state, action) {
    switch (action.type) {
        case 'increment': {
            return {count: state.count + 1}
        }
        case 'decrement': {
            return {count: state.count - 1}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

/**
 * A component that renders some children wrapped
 * in a CountContext.Provider so they can access the count context
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function CountProvider({children}) {
    const [state, dispatch] = React.useReducer(countReducer, {count: 0})
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

/**
 * A function that returns the count context
 * the consumer will of context must have access, in other words
 * it must be be below a CountContext.Provider.
 * The function CountProvider.Consumer is a shorthand for it
 * @returns {unknown}
 */
function useCount() {
    const context = React.useContext(CountContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export {CountProvider, useCount}