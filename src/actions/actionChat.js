export const CHAT = 'CHAT';
export const CHAT_LIST = 'CHAT_LIST';

export function actionStoreChat(chat) {
  return {
    type: CHAT,
    payload: chat
  }
}

export function actionStoreChatList(list) {
  return {
    type: CHAT_LIST,
    payload: list
  }
}