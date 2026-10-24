import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../context/BookContext';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

/**
 * Form terkontrol untuk menambah / mengedit buku.
 * - Jika prop `initialData` diberikan, form berada pada mode edit.
 * - Validasi: judul dan penulis wajib diisi, dengan feedback visual.
 */
function BookForm({ onSubmit, initialData = null, onCancel = () => {} }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(initialData);

  // Sinkronkan form ketika buku yang diedit berganti
  useEffect(() => {
    setForm(initialData || EMPTY_FORM);
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Judul buku wajib diisi';
    if (!form.author.trim()) newErrors.author = 'Nama penulis wajib diisi';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error pada kolom yang sedang diperbaiki
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    if (!isEditing) {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  };

  return (
    <form
      className={`book-form ${isEditing ? 'is-editing' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>{isEditing ? '✏️ Edit Buku' : '📖 Tambah Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Contoh: Laskar Pelangi"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <span className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Contoh: Andrea Hirata"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
          aria-invalid={Boolean(errors.author)}
        />
        {errors.author && (
          <span className="error-message" role="alert">
            {errors.author}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onCancel: PropTypes.func,
};

export default BookForm;
