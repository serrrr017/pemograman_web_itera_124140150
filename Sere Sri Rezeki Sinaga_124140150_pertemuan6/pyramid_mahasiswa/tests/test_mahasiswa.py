def test_crud_mahasiswa(testapp):
    data = {
        'nim': '67890',
        'nama': 'Ahmad Fadli',
        'jurusan': 'Teknik Elektro',
        'tanggal_lahir': '2001-11-05',
        'alamat': 'Jl. Mawar No. 10, Surabaya',
    }
    res = testapp.post_json('/api/mahasiswa', data, status=200)
    assert res.json['mahasiswa']['id'] == 1

    res = testapp.get('/api/mahasiswa/1', status=200)
    assert res.json['mahasiswa']['tanggal_lahir'] == '2001-11-05'

    res = testapp.put_json('/api/mahasiswa/1', {'jurusan': 'Informatika'},
                           status=200)
    assert res.json['mahasiswa']['jurusan'] == 'Informatika'

    testapp.delete('/api/mahasiswa/1', status=200)
    testapp.get('/api/mahasiswa/1', status=404)


def test_mahasiswa_validasi(testapp):
    res = testapp.post_json(
        '/api/mahasiswa', {'nama': 'Tanpa NIM', 'jurusan': 'Informatika'},
        status=400)
    assert res.json == {'error': 'Field nim wajib diisi!'}

    res = testapp.post_json(
        '/api/mahasiswa',
        {'nim': '1', 'nama': 'A', 'jurusan': 'B', 'tanggal_lahir': '05-11-2001'},
        status=400)
    assert 'YYYY-MM-DD' in res.json['error']
