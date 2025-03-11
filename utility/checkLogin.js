function isLoggedIn() {
  return JSON.parse(localStorage.getItem("user-session"));
}

export { isLoggedIn };