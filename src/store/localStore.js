export default{
  get (key) {
    return JSON.parse(window.localStorage.getItem(
      key || '[]'))
  },
  put (key, items) {
    window.localStorage.setItem(key, JSON.stringify(items))
  }
}
