import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

/**
 * Notifikasi singkat yang menghilang sendiri.
 * useEffect memasang timer saat muncul dan membersihkannya saat unmount.
 */
function Toast({ message, type = 'success', duration = 2800, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">
        {type === 'success' ? '✨' : '🗑️'}
      </span>
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
