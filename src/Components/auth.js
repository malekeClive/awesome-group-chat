// Singleton
class Auth {
  authenticated = localStorage.getItem('token') ? true : false;

  login = (cb) => {
    this.authenticated = true;
    cb();
  }

   logout = (cb) => {
    this.authenticated = false;
    localStorage.clear();
    cb();
  }

  isAuthenticated = () => {
    return this.authenticated;
  }
} 

export default new Auth();