export const NOTIFICATION = 'NOTIFICATION';

export function actionNotification(notif) {
  return {
    type: NOTIFICATION,
    payload: notif
  }
}