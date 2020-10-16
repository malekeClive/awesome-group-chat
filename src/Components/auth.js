import jwt_decode from 'jwt-decode';

// Singleton
class Auth {
 constructor() {
  this.authenticated = this.tokenCheck();
  this.user = JSON.parse(localStorage.getItem('user'));
 }

 tokenCheck() {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
 }

 storeUser(jwtAuth) {
  const decoded = jwt_decode(jwtAuth).data[0];
  const user = {
    userId: decoded.user_id,
    email: decoded.email,
    username: decoded.username
  }

  localStorage.setItem('user', JSON.stringify(user));
 }

 login(cb) {
   this.authenticated = true;
   cb();
 }

 logout(cb) {
   this.authenticated = false;
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   cb();
 }

 isAuthenticated() {
   return this.authenticated;
 }
} 

export default new Auth();