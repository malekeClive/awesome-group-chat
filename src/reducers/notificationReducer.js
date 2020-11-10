import { NOTIFICATION } from '../actions/actionNotification';

function notificationReducer(notification={}, action) {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...notification,
        ...action.payload
      }
    default:
      return notification;
  }
}

export default notificationReducer;