def includeme(config):
    """Mendaftarkan seluruh rute aplikasi ke konfigurasi Pyramid"""
    config.add_static_view('static', 'static', cache_max_age=3600)

    # Route default
    config.add_route('home', '/')

    # RESTful API Mahasiswa
    # request_method krusial untuk membedakan HTTP method pada path yang sama
    config.add_route('mahasiswa_list', '/api/mahasiswa',
                     request_method='GET')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id:\\d{1,9}}',
                     request_method='GET')
    config.add_route('mahasiswa_add', '/api/mahasiswa',
                     request_method='POST')
    config.add_route('mahasiswa_update', '/api/mahasiswa/{id:\\d{1,9}}',
                     request_method='PUT')
    config.add_route('mahasiswa_delete', '/api/mahasiswa/{id:\\d{1,9}}',
                     request_method='DELETE')

    # RESTful API Matakuliah
    config.add_route('matakuliah_list', '/api/matakuliah',
                     request_method='GET')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id:\\d{1,9}}',
                     request_method='GET')
    config.add_route('matakuliah_add', '/api/matakuliah',
                     request_method='POST')
    config.add_route('matakuliah_update', '/api/matakuliah/{id:\\d{1,9}}',
                     request_method='PUT')
    config.add_route('matakuliah_delete', '/api/matakuliah/{id:\\d{1,9}}',
                     request_method='DELETE')
