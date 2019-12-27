const Key = 'UserName'
export default {
  setUser (user) {
    window.sessionStorage.setItem(Key, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(Key) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(Key)
  }
}
