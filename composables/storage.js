export function getStorage(key) {
  if (import.meta.client) {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    }
  }
  return null;
}

export function setStorage(key, value) {
  if (import.meta.client) {
    localStorage.setItem(key, value);
  }
}
