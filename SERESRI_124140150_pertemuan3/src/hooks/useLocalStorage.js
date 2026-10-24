import { useState, useEffect } from 'react';

/**
 * Custom hook: state yang otomatis tersinkron dengan localStorage.
 * - Inisialisasi malas (lazy) membaca nilai tersimpan saat pertama dimuat.
 * - useEffect menulis ulang nilai setiap kali berubah.
 * - Error (mis. JSON rusak / storage penuh) ditangani agar aplikasi tidak crash.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Gagal membaca localStorage "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Gagal menulis localStorage "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
