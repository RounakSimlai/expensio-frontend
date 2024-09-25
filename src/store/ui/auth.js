
export default function AuthModalReducer (state = {}, action) {
  switch (action.type) {
  case 'authModal/open': {
    return {isOpen: true}
  }
  case 'authModal/close': {
    return {isOpen: false}
  }
  default:
    return state
  }
}