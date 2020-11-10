export const CHAT = 'CHAT';

export function actionStoreChat(chat) {
  return {
    type: CHAT,
    payload: chat
  }
}