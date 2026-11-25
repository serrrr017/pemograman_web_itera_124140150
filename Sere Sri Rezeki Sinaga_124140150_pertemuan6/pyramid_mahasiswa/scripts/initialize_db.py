import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models

MAHASISWA_AWAL = [
    {
        'nim': '12345',
        'nama': 'Budi Santoso',
        'jurusan': 'Teknik Informatika',
        'tanggal_lahir': date(2000, 5, 15),
        'alamat': 'Jl. Merdeka No. 123, Bandung',
    },
    {
        'nim': '54321',
        'nama': 'Siti Aminah',
        'jurusan': 'Sistem Informasi',
        'tanggal_lahir': date(2001, 8, 22),
        'alamat': 'Jl. Mawar No. 45, Jakarta',
    },
]

MATAKULIAH_AWAL = [
    {'kode_mk': 'IF2110', 'nama_mk': 'Pemrograman Web',
     'sks': 3, 'semester': 3},
    {'kode_mk': 'IF3140', 'nama_mk': 'Basis Data',
     'sks': 4, 'semester': 5},
    {'kode_mk': 'IF2120', 'nama_mk': 'Algoritma dan Struktur Data',
     'sks': 4, 'semester': 3},
    {'kode_mk': 'IF3130', 'nama_mk': 'Jaringan Komputer',
     'sks': 3, 'semester': 5},
]


def _seed(dbsession, model, key, rows):
    """Tambahkan baris yang belum ada (aman dijalankan berulang kali)."""
    ditambahkan = 0
    for row in rows:
        ada = dbsession.query(model).filter_by(**{key: row[key]}).first()
        if ada is None:
            dbsession.add(model(**row))
            ditambahkan += 1
    return ditambahkan


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan mata kuliah"""
    n_mhs = _seed(dbsession, models.Mahasiswa, 'nim', MAHASISWA_AWAL)
    n_mk = _seed(dbsession, models.Matakuliah, 'kode_mk', MATAKULIAH_AWAL)
    return n_mhs, n_mk


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)
    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            n_mhs, n_mk = setup_models(dbsession)
        print(f'Berhasil seeding: {n_mhs} mahasiswa, '
              f'{n_mk} mata kuliah baru ditambahkan.')
    except OperationalError:
        print('Pyramid gagal terhubung ke database SQL.')
        print('Pastikan service PostgreSQL berjalan dan connection string '
              'di development.ini benar, serta migrasi sudah dijalankan '
              '(alembic -c development.ini upgrade head).')
    finally:
        env['closer']()


if __name__ == '__main__':
    main()
