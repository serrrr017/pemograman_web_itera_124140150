import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('Komponen BookForm', () => {
  test('menampilkan pesan error saat form kosong dikirim', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('memberi kelas input-error pada kolom yang kosong', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByLabelText('Judul')).toHaveClass('input-error');
    expect(screen.getByLabelText('Penulis')).toHaveClass('input-error');
  });

  test('memanggil onSubmit dengan data benar dan mengosongkan form', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), {
      target: { value: 'Bumi Manusia' },
    });
    fireEvent.change(screen.getByLabelText('Penulis'), {
      target: { value: 'Pramoedya Ananta Toer' },
    });
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'baca' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'baca',
    });
    expect(screen.getByLabelText('Judul')).toHaveValue('');
  });

  test('mode edit memuat data awal dan menampilkan tombol Batal', () => {
    const book = { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };
    render(<BookForm onSubmit={vi.fn()} initialData={book} onCancel={vi.fn()} />);

    expect(screen.getByLabelText('Judul')).toHaveValue('Laskar Pelangi');
    expect(screen.getByRole('button', { name: 'Simpan Perubahan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Batal' })).toBeInTheDocument();
  });
});
