import React, { useState, useMemo, useCallback } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import Toast from '../../components/Toast/Toast';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const stats = useBookStats(books);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [sortBy, setSortBy] = useState('terbaru');
  const [editingBook, setEditingBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };
  const closeToast = useCallback(() => setToast(null), []);

  // Jumlah buku per chip filter
  const counts = {
    semua: stats.total,
    milik: stats.owned,
    baca: stats.reading,
    beli: stats.wishlist,
  };

  // Terapkan filter status + pencarian (judul atau penulis), lalu urutkan
  const visibleBooks = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const filtered = books.filter((book) => {
      const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
      const matchSearch =
        keyword === '' ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);
      return matchStatus && matchSearch;
    });

    const sorted = [...filtered];
    if (sortBy === 'judul') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    } else if (sortBy === 'penulis') {
      sorted.sort((a, b) => a.author.localeCompare(b.author, 'id'));
    } else {
      sorted.sort((a, b) => b.id - a.id); // terbaru di atas
    }
    return sorted;
  }, [books, searchTerm, statusFilter, sortBy]);

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
      showToast(`Buku "${data.title.trim()}" berhasil diperbarui`);
    } else {
      addBook(data);
      showToast(`Buku "${data.title.trim()}" berhasil ditambahkan`);
    }
  };

  const confirmDelete = () => {
    deleteBook(bookToDelete.id);
    // Jika buku yang sedang diedit dihapus, batalkan mode edit
    if (editingBook && editingBook.id === bookToDelete.id) setEditingBook(null);
    showToast(`Buku "${bookToDelete.title}" dihapus`, 'danger');
    setBookToDelete(null);
  };

  const emptyMessage =
    books.length === 0
      ? 'Rak masih kosong. Tambahkan buku pertamamu di atas!'
      : 'Tidak ada buku yang cocok dengan pencarian / filter.';

  return (
    <main className="container">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-eyebrow">Koleksi pribadi</span>
          <h1>Rak Bukuku ☕</h1>
          <p>Catat buku yang kamu miliki, sedang kamu baca, dan ingin kamu beli.</p>
        </div>
        <div className="hero-stats">
          <div className="hero-pill">
            <strong>{stats.total}</strong>
            <span>Buku</span>
          </div>
          <div className="hero-pill">
            <strong>{stats.reading}</strong>
            <span>Dibaca</span>
          </div>
          <div className="hero-pill">
            <strong>{stats.wishlist}</strong>
            <span>Wishlist</span>
          </div>
        </div>
      </section>

      <BookForm
        onSubmit={handleSubmit}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <h2 className="section-title">
        Daftar Buku <span className="count">({visibleBooks.length})</span>
      </h2>

      <BookFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        counts={counts}
      />

      <BookList
        books={visibleBooks}
        onEdit={setEditingBook}
        onDelete={setBookToDelete}
        emptyMessage={emptyMessage}
      />

      {bookToDelete && (
        <ConfirmDialog
          title="Hapus buku ini?"
          message={`"${bookToDelete.title}" akan dihapus dari rakmu.`}
          onConfirm={confirmDelete}
          onCancel={() => setBookToDelete(null)}
        />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </main>
  );
}

export default Home;
