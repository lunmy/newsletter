export function getStorage(key) {
  if (localStorage.getItem(key)) {
    let storedValue = localStorage.getItem(key);
    return storedValue;
  }
  return null;
}

export function setStorage(key, value) {
  localStorage.setItem(key, value);
}
