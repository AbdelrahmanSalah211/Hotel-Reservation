function isLoggedIn() {
  return localStorage.getItem("isLoggedIn");
}

export { isLoggedIn };