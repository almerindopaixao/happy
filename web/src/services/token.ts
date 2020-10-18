export function getTokenLocalStorage(): string | null {
  return window.localStorage.getItem('app-token');
}

export function getTokenSessionStorage(): string | null {
  return window.sessionStorage.getItem('app-token');
}

export function setTokenLocalStorage(token: string): void {
  window.localStorage.setItem('app-token', token);
}

export function setTokenSessionStorage(token: string): void {
  window.sessionStorage.setItem('app-token', token);
}

export const token = getTokenLocalStorage() || getTokenSessionStorage();
