import jwt_decode from 'jwt-decode';

// Singleton
class Auth {
 constructor() {
  this.authenticated = this.tokenCheck();
  this.user          = this.tokenCheck() ? this.setUser(localStorage.getItem('token')) : {};
 }

 tokenCheck() {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
 }

 setUser(jwtAuth) {
  const decoded = jwt_decode(jwtAuth).data[0];
  const user = {
    userId: decoded.user_id,
    email: decoded.email,
    username: decoded.username
  }
  return user;
 }

 login(cb) {
   this.authenticated = true;
   cb();
 }

 logout(cb) {
   this.authenticated = false;
   cb();
 }

 isAuthenticated() {
   return this.authenticated;
 }
} 

export default new Auth();