import { combineReducers } from 'redux'

// thunk reducers imports
import UserReducer from './user'

// ui reducer imports
import AuthModalReducer from './ui/auth'
import StorageReducer from './ui/storage'
import CurrencyUIReducer from './ui/currency'

const rootReducer = combineReducers({
  // thunk reducers
  UserReducer,
  // ui reducers
  authModal: AuthModalReducer,
  storage: StorageReducer,
  currencyUI: CurrencyUIReducer
})

export default rootReducer
