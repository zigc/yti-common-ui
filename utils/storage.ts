/**
 * Try (best effort) to fetch a value from localStorage. If a string is successfully fetched then it is returned even if it is empty.
 *
 * @param key storage key
 * @return any actual string value retrieved; or null if access failed / no value was found
 */
export function getFromLocalStorageOrNull(key: string): string | null {
  try {
    const value = localStorage.getItem(key);
    if (typeof value === 'string') {
      return value;
    }
  } catch (error) {
    console.warn('Could not use local storage: "' + error + '"');
  }
  return null;
}

/**
 * Try (best effort) to fetch a value from localStorage. If a string is successfully fetched then it is returned even if it is empty.
 *
 * @param key storage key
 * @param defaultValue default value to return if localStorage access fails or there is no value stored
 * @return any actual string value retrieved; or defaultValue if access failed / no value was found
 */
export function getFromLocalStorage(key: string, defaultValue: string): string {
  const fetched = getFromLocalStorageOrNull(key);
  return fetched === null ? defaultValue : fetched;
}

/**
 * Try (best effort) to store a value to localStorage.
 *
 * @param key storage key
 * @param value string value (maybe empty) to store; if undefined/null then try to remove key
 * @return true if operation seems to have succeeded; false if it quite certainly failed
 */
export function setToLocalStorage(key: string, value: string | undefined | null): boolean {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
    return true;
  } catch (error) {
    console.warn('Could not use local storage: "' + error + '"');
  }
  return false;
}
