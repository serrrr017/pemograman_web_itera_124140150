import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from './ConfirmDialog';

describe('Komponen ConfirmDialog', () => {
  const setup = () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        title="Hapus buku ini?"
        message="Buku akan dihapus."
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
    return { onConfirm, onCancel };
  };

  test('menampilkan judul dan pesan', () => {
    setup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Hapus buku ini?')).toBeInTheDocument();
    expect(screen.getByText('Buku akan dihapus.')).toBeInTheDocument();
  });

  test('memanggil onConfirm saat tombol konfirmasi diklik', () => {
    const { onConfirm } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Hapus' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('memanggil onCancel saat tombol Batal diklik atau tombol Escape ditekan', () => {
    const { onCancel } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});
