const STORAGE_KEY = "authUser";

export function setStoredUser(user, persistInLocalStorage = true) {
  clearStoredUser();
  const storage = persistInLocalStorage ? window.localStorage : window.sessionStorage;
  storage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getStoredUser() {
  const savedValue =
    window.localStorage.getItem(STORAGE_KEY) || window.sessionStorage.getItem(STORAGE_KEY);

  if (!savedValue) {
    return null;
  }

  try {
    return JSON.parse(savedValue);
  } catch (error) {
    clearStoredUser();
    return null;
  }
}

export function hasStoredUser() {
  return Boolean(getStoredUser());
}

export function clearStoredUser() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

