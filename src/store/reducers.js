import { combineReducers } from 'redux'

// thunk reducers imports
import AuthReducer from './auth'

// ui reducer imports
import AuthModalReducer from './ui/auth'
import StorageReducer from './ui/storage'
import CurrencyUIReducer from './ui/currency'

const rootReducer = combineReducers({
  // thunk reducers
  AuthReducer,
  // ui reducers
  authModal: AuthModalReducer,
  storage: StorageReducer,
  currencyUI: CurrencyUIReducer
})

export default rootReducer
