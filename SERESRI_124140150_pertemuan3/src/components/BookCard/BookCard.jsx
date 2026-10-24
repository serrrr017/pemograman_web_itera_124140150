import React from 'react';
import PropTypes from 'prop-types';
import { getStatusLabel } from '../../context/BookContext';
import './BookCard.css';

// Warna sampul buku (selaras dengan tema cream mocha)
const COVER_COLORS = [
  '#8b5e3c',
  '#c97b84',
  '#a67c6d',
  '#c9a27e',
  '#b5838d',
  '#7a5c4a',
  '#b88a6a',
  '#d19a8f',
];

/** Memilih warna sampul secara konsisten berdasarkan judul buku. */
export function getCoverColor(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) % 9973;
  }
  return COVER_COLORS[hash % COVER_COLORS.length];
}

/**
 * Kartu satu buku: sampul berwarna, judul, penulis, badge status,
 * serta tombol edit dan hapus. Murni presentasional.
 */
function BookCard({ book, index = 0, onEdit, onDelete }) {
  const initial = book.title.trim().charAt(0).toUpperCase() || '?';

  return (
    <li
      className="book-card"
      style={{
        '--cover': getCoverColor(book.title),
        animationDelay: `${Math.min(index, 8) * 50}ms`,
      }}
    >
      <div className="book-cover" aria-hidden="true">
        <span>{initial}</span>
      </div>

      <div className="book-body">
        <span className={`badge badge-${book.status}`}>
          {getStatusLabel(book.status)}
        </span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>

        <div className="book-actions">
          <button
            type="button"
            className="btn-edit"
            onClick={() => onEdit(book)}
            aria-label={`Edit ${book.title}`}
          >
            ✏️ Edit
          </button>
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(book)}
            aria-label={`Hapus ${book.title}`}
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
    </li>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  index: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard;
