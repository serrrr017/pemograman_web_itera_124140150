import { useMemo } from 'react';

/**
 * Custom hook: menghitung statistik koleksi buku.
 * Hasil di-memo agar hanya dihitung ulang ketika daftar buku berubah.
 */
function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const owned = books.filter((b) => b.status === 'milik').length;
    const reading = books.filter((b) => b.status === 'baca').length;
    const wishlist = books.filter((b) => b.status === 'beli').length;

    // Hitung jumlah buku per penulis (tidak peka huruf besar/kecil)
    const authorMap = {};
    books.forEach((b) => {
      const name = b.author.trim();
      const key = name.toLowerCase();
      if (!key) return;
      if (!authorMap[key]) authorMap[key] = { name, count: 0 };
      authorMap[key].count += 1;
    });
    const authorList = Object.values(authorMap);
    const top = authorList.sort((a, b) => b.count - a.count)[0];

    // Persentase buku yang sudah dimiliki dari seluruh koleksi
    const ownedRate = total > 0 ? Math.round((owned / total) * 100) : 0;

    return {
      total,
      owned,
      reading,
      wishlist,
      uniqueAuthors: authorList.length,
      topAuthor: top ? top.name : null,
      topAuthorCount: top ? top.count : 0,
      ownedRate,
    };
  }, [books]);
}

export default useBookStats;
