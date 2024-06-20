export function getStorage(key) {
  if (process.client) {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    } else {
      return false;
    }
  }
  return null;
}

export function setStorage(key, value) {
  if (process.client) {
    localStorage.setItem(key, value);
  }
}
