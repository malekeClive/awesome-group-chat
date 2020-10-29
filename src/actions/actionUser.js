export const USER = 'USER';

export function setUserData(user) {
  return {
    type: USER,
    user: user,
  }
}