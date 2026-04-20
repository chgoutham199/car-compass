export type SavedRef = {
  id: string;
  name: string;
  savedAt: string;
};

const KEY = "carcompass.savedShortlists";

function read(): SavedRef[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedRef[]) : [];
  } catch {
    return [];
  }
}

function write(list: SavedRef[]) {
  sessionStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("carcompass:shortlists"));
}

export function listSaved(): SavedRef[] {
  return read().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export function rememberShortlist(ref: SavedRef) {
  const list = read().filter((r) => r.id !== ref.id);
  list.unshift(ref);
  write(list.slice(0, 50));
}

export function forgetShortlist(id: string) {
  write(read().filter((r) => r.id !== id));
}

export function subscribe(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener("carcompass:shortlists", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("carcompass:shortlists", handler);
    window.removeEventListener("storage", handler);
  };
}
