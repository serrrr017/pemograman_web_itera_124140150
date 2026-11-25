import datetime

from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
)
from pyramid.view import view_config

from ..models import Mahasiswa


def _parse_tanggal(value):
    """Konversi string ISO (YYYY-MM-DD) menjadi date."""
    try:
        return datetime.datetime.fromisoformat(value).date()
    except (TypeError, ValueError):
        raise ValueError(
            'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD')


def _not_found(mahasiswa_id):
    return HTTPNotFound(json_body={
        'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'})


# 1. READ ALL
@view_config(route_name='mahasiswa_list', renderer='json')
def mahasiswa_list(request):
    """Mengambil semua data mahasiswa"""
    mahasiswas = (
        request.dbsession.query(Mahasiswa).order_by(Mahasiswa.id.asc()).all()
    )
    return {'mahasiswas': [m.to_dict() for m in mahasiswas]}


# 2. READ ONE
@view_config(route_name='mahasiswa_detail', renderer='json')
def mahasiswa_detail(request):
    """Melihat detail satu mahasiswa berdasarkan ID"""
    mahasiswa_id = request.matchdict['id']
    mahasiswa = (
        request.dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()
    )
    if mahasiswa is None:
        return _not_found(mahasiswa_id)
    return {'mahasiswa': mahasiswa.to_dict()}


# 3. CREATE
@view_config(route_name='mahasiswa_add', request_method='POST',
             renderer='json')
def mahasiswa_add(request):
    """Menambahkan mahasiswa baru dari payload JSON"""
    try:
        json_data = request.json_body
        if not isinstance(json_data, dict):
            raise ValueError('Body request harus berupa objek JSON')

        for field in ('nim', 'nama', 'jurusan'):
            if not json_data.get(field):
                return HTTPBadRequest(
                    json_body={'error': f'Field {field} wajib diisi!'})

        tanggal_lahir = None
        if json_data.get('tanggal_lahir'):
            tanggal_lahir = _parse_tanggal(json_data['tanggal_lahir'])

        dbsession = request.dbsession
        if dbsession.query(Mahasiswa).filter_by(
                nim=json_data['nim']).first():
            return HTTPBadRequest(json_body={
                'error': f"NIM {json_data['nim']} sudah terdaftar"})

        mahasiswa = Mahasiswa(
            nim=json_data['nim'],
            nama=json_data['nama'],
            jurusan=json_data['jurusan'],
            tanggal_lahir=tanggal_lahir,
            alamat=json_data.get('alamat'),
        )
        dbsession.add(mahasiswa)
        # flush agar primary key (id) dari PostgreSQL langsung terisi
        dbsession.flush()
        return {'success': True, 'mahasiswa': mahasiswa.to_dict()}
    except Exception as e:
        request.tm.doom()  # batalkan transaksi, jangan di-commit
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE
@view_config(route_name='mahasiswa_update', request_method='PUT',
             renderer='json')
def mahasiswa_update(request):
    """Mengubah data mahasiswa berdasarkan ID"""
    dbsession = request.dbsession
    mahasiswa_id = request.matchdict['id']
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()
    if mahasiswa is None:
        return _not_found(mahasiswa_id)

    try:
        json_data = request.json_body
        if not isinstance(json_data, dict):
            raise ValueError('Body request harus berupa objek JSON')

        for field in ('nim', 'nama', 'jurusan', 'alamat'):
            if field in json_data:
                setattr(mahasiswa, field, json_data[field])
        if 'tanggal_lahir' in json_data:
            value = json_data['tanggal_lahir']
            mahasiswa.tanggal_lahir = _parse_tanggal(value) if value else None
        dbsession.flush()
        return {'success': True, 'mahasiswa': mahasiswa.to_dict()}
    except Exception as e:
        request.tm.doom()
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE
@view_config(route_name='mahasiswa_delete', request_method='DELETE',
             renderer='json')
def mahasiswa_delete(request):
    """Menghapus mahasiswa berdasarkan ID"""
    dbsession = request.dbsession
    mahasiswa_id = request.matchdict['id']
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()
    if mahasiswa is None:
        return _not_found(mahasiswa_id)

    dbsession.delete(mahasiswa)
    return {
        'success': True,
        'message': f'Mahasiswa dengan ID {mahasiswa_id} berhasil dihapus',
    }
