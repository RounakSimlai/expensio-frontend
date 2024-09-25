export default function AuthModalReducer (state = {}, action) {
  switch (action.type) {
  case 'localstorage/get': {
    return {authUser: JSON.parse(localStorage.getItem('authUser')), accessToken: JSON.parse(localStorage.getItem('accessToken'))}
  }
  default:
    return state
  }
}