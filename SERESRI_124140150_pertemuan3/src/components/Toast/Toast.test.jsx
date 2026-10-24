import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from './Toast';

describe('Komponen Toast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('menampilkan pesan notifikasi', () => {
    render(<Toast message="Berhasil disimpan" onClose={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Berhasil disimpan');
  });

  test('menutup otomatis setelah durasi habis', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Halo" duration={1000} onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('menutup saat tombol tutup diklik', () => {
    const onClose = vi.fn();
    render(<Toast message="Halo" onClose={onClose} />);

    fireEvent.click(screen.getByLabelText('Tutup notifikasi'));
    expect(onClose).toHaveBeenCalled();
  });
});
