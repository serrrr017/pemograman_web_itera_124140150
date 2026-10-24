import React, { createContext, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

// Daftar status yang valid + label tampilannya (dipakai di banyak komponen)
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

export function getStatusLabel(value) {
  const found = STATUS_OPTIONS.find((s) => s.value === value);
  return found ? found.label : value;
}

/** Hook konsumen: melempar error jika dipakai di luar BookProvider. */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data', []);
  const lastIdRef = useRef(0);

  // ID unik berurutan: berbasis waktu, tetapi selalu lebih besar dari ID sebelumnya
  const nextId = () => {
    const maxExisting = books.reduce((max, b) => Math.max(max, b.id), 0);
    const id = Math.max(Date.now(), lastIdRef.current + 1, maxExisting + 1);
    lastIdRef.current = id;
    return id;
  };

  const addBook = ({ title, author, status }) => {
    const newBook = {
      id: nextId(),
      title: title.trim(),
      author: author.trim(),
      status,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id, changes) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...changes,
              title: (changes.title ?? b.title).trim(),
              author: (changes.author ?? b.author).trim(),
            }
          : b
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
