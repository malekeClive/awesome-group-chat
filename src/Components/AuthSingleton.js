export default new class Auth {
  constructor() {
    this.authenticated = localStorage.getItem('token') ? true : false;
    this.userData = {};
    // this.counter = 0;
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

  userData() {
    return this.userData;
  }

  // count() {
  //   return this.counter += 1;
  // }
}