import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserCacheScope } from "../utils/staleCache";

const FAVORITES_EVENT = "chula-essence:favoriteschange";

function storageKey() {
  return `chula-essence:favorites:${getUserCacheScope()}`;
}

function readFavorites() {
  try {
    const favorites = JSON.parse(localStorage.getItem(storageKey()) || "[]");
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites);

  useEffect(() => {
    function syncFavorites() {
      setFavoriteIds(readFavorites());
    }

    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener("storage", syncFavorites);
    window.addEventListener("authchange", syncFavorites);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("authchange", syncFavorites);
    };
  }, []);

  function toggleFavorite(productId) {
    if (!localStorage.getItem("token")) {
      toast.info("Log in to save items to your favorites.");
      return;
    }

    const nextFavorites = favoriteIds.includes(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    try {
      localStorage.setItem(storageKey(), JSON.stringify(nextFavorites));
      setFavoriteIds(nextFavorites);
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    } catch {
      toast.error("Couldn't update your favorites.");
    }
  }

  return { favoriteIds, toggleFavorite };
}
