import { useSyncExternalStore } from "react";
import { toast } from "sonner";

const KEY = "ph-favorites";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { cache = []; }
  return cache!;
}
const EMPTY: string[] = [];

export function useFavorites() {
  const ids = useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, read, () => EMPTY);
  const toggle = (id: string) => {
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    cache = next;
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
    toast.success(next.includes(id) ? "Adicionado aos favoritos" : "Removido dos favoritos");
  };
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

export async function shareLink(title: string, path: string) {
  const url = `${window.location.origin}${path}`;
  if (navigator.share) {
    try { await navigator.share({ title, url }); return; } catch { return; }
  }
  await navigator.clipboard.writeText(url);
  toast.success("Link copiado!");
}
