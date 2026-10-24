import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider } from '../../context/BookContext';
import Home from './Home';

function renderHome() {
  return render(
    <BookProvider>
      <Home />
    </BookProvider>
  );
}

function tambahBuku(title, author, status = 'milik') {
  fireEvent.change(screen.getByLabelText('Judul'), { target: { value: title } });
  fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: author } });
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
  fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
}

describe('Halaman Home (integrasi)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('menambah buku dan menyimpannya ke localStorage', () => {
    renderHome();
    tambahBuku('Laskar Pelangi', 'Andrea Hirata');

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    const saved = JSON.parse(window.localStorage.getItem('books_data'));
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe('Laskar Pelangi');
  });

  test('filter status hanya menampilkan buku dengan status terpilih', () => {
    renderHome();
    tambahBuku('Laskar Pelangi', 'Andrea Hirata', 'milik');
    tambahBuku('Bumi Manusia', 'Pramoedya', 'beli');

    fireEvent.click(screen.getByRole('button', { name: /Ingin Dibeli/ }));

    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  test('pencarian bekerja untuk judul maupun nama penulis', () => {
    renderHome();
    tambahBuku('Laskar Pelangi', 'Andrea Hirata');
    tambahBuku('Bumi Manusia', 'Pramoedya Ananta Toer');

    const search = screen.getByLabelText('Cari buku');

    fireEvent.change(search, { target: { value: 'pramoedya' } });
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'laskar' } });
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi Manusia')).not.toBeInTheDocument();
  });

  test('mengedit buku mengubah datanya', () => {
    renderHome();
    tambahBuku('Judul Lama', 'Penulis A');

    fireEvent.click(screen.getByLabelText('Edit Judul Lama'));
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Judul Baru' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan Perubahan' }));

    expect(screen.getByText('Judul Baru')).toBeInTheDocument();
    expect(screen.queryByText('Judul Lama')).not.toBeInTheDocument();
  });

  test('menghapus buku setelah konfirmasi di dialog', () => {
    renderHome();
    tambahBuku('Akan Dihapus', 'Penulis B');

    fireEvent.click(screen.getByLabelText('Hapus Akan Dihapus'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Hapus' }));

    expect(screen.queryByText('Akan Dihapus')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('membatalkan penghapusan menyimpan buku tetap ada', () => {
    renderHome();
    tambahBuku('Tetap Ada', 'Penulis C');

    fireEvent.click(screen.getByLabelText('Hapus Tetap Ada'));
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));

    expect(screen.getByText('Tetap Ada')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('menampilkan toast setelah buku ditambahkan', () => {
    renderHome();
    tambahBuku('Buku Toast', 'Penulis D');

    expect(screen.getByRole('status')).toHaveTextContent('Buku Toast');
  });

  test('pengurutan judul A-Z mengubah urutan kartu', () => {
    renderHome();
    tambahBuku('Apel', 'Penulis X');
    tambahBuku('Zebra', 'Penulis Y');

    const judul = () =>
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);

    // Default: terbaru di atas
    expect(judul()).toEqual(['Zebra', 'Apel']);

    fireEvent.change(screen.getByLabelText('Urutkan'), {
      target: { value: 'judul' },
    });
    expect(judul()).toEqual(['Apel', 'Zebra']);
  });
});
