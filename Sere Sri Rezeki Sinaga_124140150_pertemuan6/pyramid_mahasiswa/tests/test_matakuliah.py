import pytest

PAYLOAD = {
    'kode_mk': 'IF2110',
    'nama_mk': 'Pemrograman Web',
    'sks': 3,
    'semester': 3,
}


def _create(testapp, **override):
    data = dict(PAYLOAD, **override)
    return testapp.post_json('/api/matakuliah', data, status=200)


def test_list_kosong(testapp):
    res = testapp.get('/api/matakuliah', status=200)
    assert res.json == {'matakuliahs': []}


def test_create_dan_detail(testapp):
    res = _create(testapp)
    assert res.json['success'] is True
    assert res.json['matakuliah']['id'] == 1

    detail = testapp.get('/api/matakuliah/1', status=200)
    assert detail.json['matakuliah']['kode_mk'] == 'IF2110'


@pytest.mark.parametrize('field', ['kode_mk', 'nama_mk', 'sks', 'semester'])
def test_create_field_wajib(testapp, field):
    data = {k: v for k, v in PAYLOAD.items() if k != field}
    res = testapp.post_json('/api/matakuliah', data, status=400)
    assert res.json == {'error': f'Field {field} wajib diisi!'}


@pytest.mark.parametrize('field', ['sks', 'semester'])
@pytest.mark.parametrize('value', [0, -1, '3', 2.5, True])
def test_create_angka_tidak_valid(testapp, field, value):
    data = dict(PAYLOAD, **{field: value})
    res = testapp.post_json('/api/matakuliah', data, status=400)
    assert field in res.json['error']


def test_create_kode_duplikat(testapp):
    _create(testapp)
    res = testapp.post_json('/api/matakuliah', PAYLOAD, status=400)
    assert 'sudah terdaftar' in res.json['error']


def test_create_body_bukan_json(testapp):
    res = testapp.post('/api/matakuliah', 'bukan json',
                       content_type='application/json', status=400)
    assert 'JSON' in res.json['error']


def test_detail_tidak_ditemukan(testapp):
    res = testapp.get('/api/matakuliah/99', status=404)
    assert res.json == {
        'error': 'Mata kuliah dengan ID 99 tidak ditemukan'}


def test_id_non_numerik_404(testapp):
    testapp.get('/api/matakuliah/abc', status=404)


def test_update_parsial(testapp):
    _create(testapp)
    res = testapp.put_json('/api/matakuliah/1', {'sks': 4}, status=200)
    assert res.json['matakuliah']['sks'] == 4
    assert res.json['matakuliah']['nama_mk'] == 'Pemrograman Web'
    # perubahan harus tersimpan permanen
    assert testapp.get('/api/matakuliah/1').json['matakuliah']['sks'] == 4


def test_update_tidak_valid(testapp):
    _create(testapp)
    testapp.put_json('/api/matakuliah/1', {'sks': 0}, status=400)
    testapp.put_json('/api/matakuliah/1', {'semester': -2}, status=400)
    # data tidak berubah
    assert testapp.get('/api/matakuliah/1').json['matakuliah']['sks'] == 3


def test_update_kode_duplikat(testapp):
    _create(testapp)
    _create(testapp, kode_mk='IF3140', nama_mk='Basis Data')
    testapp.put_json('/api/matakuliah/2', {'kode_mk': 'IF2110'}, status=400)


def test_update_tidak_ditemukan(testapp):
    testapp.put_json('/api/matakuliah/99', {'sks': 2}, status=404)


def test_delete(testapp):
    _create(testapp)
    res = testapp.delete('/api/matakuliah/1', status=200)
    assert res.json['success'] is True
    testapp.get('/api/matakuliah/1', status=404)


def test_delete_tidak_ditemukan(testapp):
    testapp.delete('/api/matakuliah/99', status=404)


def test_predikat_request_method(testapp):
    """POST dan GET pada path sama harus diarahkan ke view berbeda."""
    assert testapp.get('/api/matakuliah').json == {'matakuliahs': []}
    _create(testapp)
    assert len(testapp.get('/api/matakuliah').json['matakuliahs']) == 1
