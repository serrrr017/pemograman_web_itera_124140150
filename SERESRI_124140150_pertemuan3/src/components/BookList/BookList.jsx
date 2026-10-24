import React from 'react';
import PropTypes from 'prop-types';
import BookCard from '../BookCard/BookCard';
import './BookList.css';

/**
 * Menampilkan daftar buku sebagai grid kartu.
 * Menampilkan keadaan kosong (empty state) jika tidak ada data.
 */
function BookList({ books, onEdit, onDelete, emptyMessage = 'Belum ada buku.' }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">
          📚
        </div>
        <p className="empty-message">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="book-list">
      {books.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};

export default BookList;
