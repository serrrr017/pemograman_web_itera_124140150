import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('Hook useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('memakai nilai awal jika localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('kunci', ['a']));
    expect(result.current[0]).toEqual(['a']);
  });

  test('membaca nilai yang sudah tersimpan', () => {
    window.localStorage.setItem('kunci', JSON.stringify({ x: 1 }));
    const { result } = renderHook(() => useLocalStorage('kunci', {}));
    expect(result.current[0]).toEqual({ x: 1 });
  });

  test('menyimpan perubahan state ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('kunci', 0));
    act(() => result.current[1](42));
    expect(JSON.parse(window.localStorage.getItem('kunci'))).toBe(42);
  });
});
