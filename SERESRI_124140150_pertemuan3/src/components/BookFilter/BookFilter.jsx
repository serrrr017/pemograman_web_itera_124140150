import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../context/BookContext';
import './BookFilter.css';

export const SORT_OPTIONS = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'judul', label: 'Judul (A-Z)' },
  { value: 'penulis', label: 'Penulis (A-Z)' },
];

/**
 * Kontrol pencarian (judul / penulis), filter status berbentuk chip
 * (lengkap dengan jumlah buku), dan pengurutan.
 * Komponen terkontrol: nilai disimpan oleh parent (Home).
 */
function BookFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  counts,
}) {
  const chips = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS];

  return (
    <div className="book-filter">
      <div className="filter-row">
        <div className="search-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="search-input"
            placeholder="Cari judul atau penulis..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari buku"
          />
        </div>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Urutkan"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="chip-row" role="group" aria-label="Filter status">
        {chips.map((chip) => (
          <button
            key={chip.value}
            type="button"
            className={`chip ${statusFilter === chip.value ? 'chip-active' : ''}`}
            aria-pressed={statusFilter === chip.value}
            onClick={() => onStatusChange(chip.value)}
          >
            {chip.label}
            <span className="chip-count">{counts[chip.value] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default BookFilter;
