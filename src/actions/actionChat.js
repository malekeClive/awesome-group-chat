export const CHAT = 'CHAT';

export function actionStoreChat(chat) {
  return {
    type: CHAT,
    chat: chat
  }
}