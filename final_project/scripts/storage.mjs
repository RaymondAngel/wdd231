const key = 'big-saved-services';
export function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter(item => typeof item === 'string') : [];
  } catch { return []; }
}
export function writeSaved(ids) {
  try { localStorage.setItem(key, JSON.stringify(ids)); return true; }
  catch { return false; }
}
