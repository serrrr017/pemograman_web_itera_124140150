import React from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

// Warna segmen grafik (selaras dengan badge status)
const COLORS = { milik: '#c9a27e', baca: '#e8b4b8', beli: '#e0b45a' };

function StatCard({ icon, label, value, hint }) {
  return (
    <div className="stat-card">
      <span className="stat-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  hint: PropTypes.string,
};

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  // Hitung sudut segmen donut chart (dalam persen)
  const pct = (n) => (stats.total > 0 ? (n / stats.total) * 100 : 0);
  const endMilik = pct(stats.owned);
  const endBaca = endMilik + pct(stats.reading);

  const donutBackground =
    stats.total > 0
      ? `conic-gradient(${COLORS.milik} 0 ${endMilik}%, ${COLORS.baca} ${endMilik}% ${endBaca}%, ${COLORS.beli} ${endBaca}% 100%)`
      : 'var(--latte)';

  const legend = [
    { key: 'milik', label: 'Milik', value: stats.owned },
    { key: 'baca', label: 'Sedang Dibaca', value: stats.reading },
    { key: 'beli', label: 'Ingin Dibeli', value: stats.wishlist },
  ];

  return (
    <main className="container">
      <h2 className="section-title">Statistik Koleksi 📊</h2>

      <section className="chart-card">
        <div
          className="donut"
          style={{ background: donutBackground }}
          role="img"
          aria-label="Grafik donat komposisi status buku"
        >
          <div className="donut-hole">
            <strong>{stats.total}</strong>
            <span>buku</span>
          </div>
        </div>

        <ul className="legend">
          {legend.map((item) => (
            <li key={item.key}>
              <span className="legend-dot" style={{ background: COLORS[item.key] }} />
              <span className="legend-label">{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      </section>

      <div className="stats-grid">
        <StatCard icon="📚" label="Total Buku" value={stats.total} />
        <StatCard icon="✍️" label="Jumlah Penulis" value={stats.uniqueAuthors} />
        <StatCard icon="🏠" label="Buku Dimiliki" value={`${stats.ownedRate}%`} />
        <StatCard
          icon="💖"
          label="Penulis Favorit"
          value={stats.topAuthor ?? '-'}
          hint={stats.topAuthor ? `${stats.topAuthorCount} buku` : undefined}
        />
      </div>

      {stats.total === 0 && (
        <p className="stats-empty">
          Belum ada data. Tambahkan buku di halaman Beranda untuk melihat statistik.
        </p>
      )}
    </main>
  );
}

export default Stats;
