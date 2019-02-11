const storageModule = {
  getItem(key) {
    return sessionStorage.getItem(key)
  },
  setItem(key, value) {
    sessionStorage[key] = value
  },
  removeItem(key) {
    sessionStorage.removeItem(key)
  }
}
export default storageModule