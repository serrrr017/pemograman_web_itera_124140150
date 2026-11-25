"""View CRUD untuk resource Matakuliah (RESTful API)."""
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
)
from pyramid.view import view_config

from ..models import Matakuliah

REQUIRED_FIELDS = ('kode_mk', 'nama_mk', 'sks', 'semester')
TEXT_FIELDS = ('kode_mk', 'nama_mk')
INT_FIELDS = ('sks', 'semester')


def _bad_request(message):
    return HTTPBadRequest(json_body={'error': message})


def _not_found(matakuliah_id):
    return HTTPNotFound(json_body={
        'error': f'Mata kuliah dengan ID {matakuliah_id} tidak ditemukan'})


def _get_json_dict(request):
    """Ambil body JSON dan pastikan berupa objek (dictionary)."""
    try:
        data = request.json_body
    except ValueError:
        raise ValueError('Body request harus berupa JSON yang valid')
    if not isinstance(data, dict):
        raise ValueError('Body request harus berupa objek JSON')
    return data


def _validate(data, partial=False):
    """Validasi dan bersihkan payload.

    - partial=False (POST): seluruh field wajib ada.
    - partial=True (PUT): hanya field yang dikirim yang divalidasi.
    Melempar ValueError berisi pesan kesalahan jika tidak valid.
    """
    values = {}
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] in (None, ''):
            if partial and field not in data:
                continue
            raise ValueError(f'Field {field} wajib diisi!')

        value = data[field]
        if field in TEXT_FIELDS:
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f'Field {field} harus berupa teks')
            values[field] = value.strip()
        else:
            if isinstance(value, bool) or not isinstance(value, int):
                raise ValueError(f'Field {field} harus berupa bilangan bulat')
            if value <= 0:
                raise ValueError(f'Field {field} harus lebih besar dari 0')
            values[field] = value
    return values


# 1. READ ALL
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """Menampilkan seluruh daftar mata kuliah"""
    daftar = (
        request.dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    )
    return {'matakuliahs': [mk.to_dict() for mk in daftar]}


# 2. READ ONE
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """Menampilkan detail mata kuliah berdasarkan ID"""
    matakuliah_id = request.matchdict['id']
    matakuliah = (
        request.dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
    )
    if matakuliah is None:
        return _not_found(matakuliah_id)
    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE
@view_config(route_name='matakuliah_add', request_method='POST',
             renderer='json')
def matakuliah_add(request):
    """Menambahkan mata kuliah baru dari payload JSON"""
    try:
        values = _validate(_get_json_dict(request))
    except ValueError as e:
        return _bad_request(str(e))

    dbsession = request.dbsession
    if dbsession.query(Matakuliah).filter_by(
            kode_mk=values['kode_mk']).first():
        return _bad_request(f"Kode MK {values['kode_mk']} sudah terdaftar")

    matakuliah = Matakuliah(**values)
    dbsession.add(matakuliah)
    # flush agar id hasil autoincrement PostgreSQL langsung terisi
    dbsession.flush()
    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 4. UPDATE
@view_config(route_name='matakuliah_update', request_method='PUT',
             renderer='json')
def matakuliah_update(request):
    """Memperbarui data mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
    if matakuliah is None:
        return _not_found(matakuliah_id)

    try:
        values = _validate(_get_json_dict(request), partial=True)
    except ValueError as e:
        return _bad_request(str(e))

    kode_baru = values.get('kode_mk')
    if kode_baru and kode_baru != matakuliah.kode_mk:
        if dbsession.query(Matakuliah).filter_by(kode_mk=kode_baru).first():
            return _bad_request(f'Kode MK {kode_baru} sudah terdaftar')

    for field, value in values.items():
        setattr(matakuliah, field, value)
    dbsession.flush()
    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 5. DELETE
@view_config(route_name='matakuliah_delete', request_method='DELETE',
             renderer='json')
def matakuliah_delete(request):
    """Menghapus mata kuliah berdasarkan ID"""
    dbsession = request.dbsession
    matakuliah_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=matakuliah_id).first()
    if matakuliah is None:
        return _not_found(matakuliah_id)

    dbsession.delete(matakuliah)
    return {
        'success': True,
        'message': f'Mata kuliah dengan ID {matakuliah_id} berhasil dihapus',
    }
