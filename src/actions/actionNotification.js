export const NOTIFICATION = 'NOTIFICATION';

export function actionNotification(notif) {
  return {
    type: NOTIFICATION,
    notif: notif
  }
}