import { createStore } from 'redux';
import rootReducer from '../reducers/reducers';

import jwt_decode from 'jwt-decode';

const loadState = () => {
  try {
    if (localStorage.getItem('token') === null) {
      return undefined;
    }
    
    const decoded = jwt_decode(localStorage.getItem('token')).user[0];
    const user = {
      userId: decoded.user_id,
      email: decoded.email,
      username: decoded.username
    }
    return { user };
  } catch (error) {
    return undefined;
  }
}
const persistedState = loadState();
export default createStore(rootReducer, persistedState);