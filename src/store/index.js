import { applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'

const composeEnhancers = compose
const store = configureStore({reducer: rootReducer}, composeEnhancers(applyMiddleware(thunk)))

export default store