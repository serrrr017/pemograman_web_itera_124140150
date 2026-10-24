import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard, { getCoverColor } from './BookCard';

const book = { id: 5, title: 'Pulang', author: 'Tere Liye', status: 'baca' };

describe('Komponen BookCard', () => {
  test('menampilkan judul, penulis, dan badge status', () => {
    render(<BookCard book={book} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Pulang' })).toBeInTheDocument();
    expect(screen.getByText('oleh Tere Liye')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  test('getCoverColor konsisten untuk judul yang sama', () => {
    expect(getCoverColor('Pulang')).toBe(getCoverColor('Pulang'));
    expect(getCoverColor('Pulang')).toMatch(/^#[0-9a-f]{6}$/i);
  });

  test('memanggil onEdit dan onDelete dengan objek buku', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<BookCard book={book} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByLabelText('Edit Pulang'));
    fireEvent.click(screen.getByLabelText('Hapus Pulang'));

    expect(onEdit).toHaveBeenCalledWith(book);
    expect(onDelete).toHaveBeenCalledWith(book);
  });
});
