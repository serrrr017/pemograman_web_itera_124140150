import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

const books = [
  { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', status: 'baca' },
];

describe('Komponen BookList', () => {
  test('merender semua buku beserta label statusnya', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.getByText('Milik')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  test('menampilkan pesan kosong jika tidak ada buku', () => {
    render(
      <BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} emptyMessage="Kosong nih" />
    );
    expect(screen.getByText('Kosong nih')).toBeInTheDocument();
  });

  test('memanggil onDelete dengan objek buku saat tombol Hapus diklik', () => {
    const onDelete = vi.fn();
    render(<BookList books={books} onEdit={vi.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByLabelText('Hapus Bumi Manusia'));
    expect(onDelete).toHaveBeenCalledWith(books[1]);
  });

  test('memanggil onEdit dengan objek buku saat tombol Edit diklik', () => {
    const onEdit = vi.fn();
    render(<BookList books={books} onEdit={onEdit} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByLabelText('Edit Laskar Pelangi'));
    expect(onEdit).toHaveBeenCalledWith(books[0]);
  });
});
