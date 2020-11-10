export const USER = 'USER';

export function setUserData(user) {
  return {
    type: USER,
    payload: user,
  }
}