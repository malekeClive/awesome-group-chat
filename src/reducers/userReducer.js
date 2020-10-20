import { USER } from '../actions/actionUser';

function userReducer(user = {}, action) {
  switch (action.type) {
    case USER:
      return {
        ...action.user
      }
    default:
      return user;
  }
}

export default userReducer;