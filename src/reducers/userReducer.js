import { USER } from '../actions/actionUser';

function userReducer(user = {}, action) {
  switch (action.type) {
    case USER:
      return {
        ...user,
        ...action.payload
      }
    default:
      return user;
  }
}

export default userReducer;