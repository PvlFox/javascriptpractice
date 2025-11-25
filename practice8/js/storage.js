
const KEY = "savedChar";

export function saveCharacter(obj) {
  localStorage.setItem(KEY, JSON.stringify(obj));
}

export function loadCharacter() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}
