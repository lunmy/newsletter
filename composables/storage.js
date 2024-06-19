export function getStorage(key) {
  let storedValue = localStorage.getItem(key);
  return storedValue;
}

export function setStorage(key, value) {
  localStorage.setItem(key, value);
}
