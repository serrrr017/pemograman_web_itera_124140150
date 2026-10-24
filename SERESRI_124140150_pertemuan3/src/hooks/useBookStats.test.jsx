import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('mengembalikan nol untuk daftar kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current).toEqual({
      total: 0,
      owned: 0,
      reading: 0,
      wishlist: 0,
      uniqueAuthors: 0,
      topAuthor: null,
      topAuthorCount: 0,
      ownedRate: 0,
    });
  });

  test('menghitung jumlah per status, penulis unik, dan persentase', () => {
    const books = [
      { id: 1, title: 'A', author: 'Tere Liye', status: 'milik' },
      { id: 2, title: 'B', author: 'tere liye', status: 'baca' },
      { id: 3, title: 'C', author: 'Andrea Hirata', status: 'beli' },
      { id: 4, title: 'D', author: 'Andrea Hirata', status: 'milik' },
    ];
    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(4);
    expect(result.current.owned).toBe(2);
    expect(result.current.reading).toBe(1);
    expect(result.current.wishlist).toBe(1);
    expect(result.current.uniqueAuthors).toBe(2);
    expect(result.current.topAuthor).toBe('Tere Liye');
    expect(result.current.topAuthorCount).toBe(2);
    expect(result.current.ownedRate).toBe(50);
  });
});
