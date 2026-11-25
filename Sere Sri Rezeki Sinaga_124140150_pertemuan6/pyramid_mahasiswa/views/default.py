from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def home(request):
    """Halaman utama: ringkasan endpoint API yang tersedia"""
    return {
        'aplikasi': 'Pyramid Mahasiswa RESTful API',
        'endpoints': {
            'mahasiswa': '/api/mahasiswa',
            'matakuliah': '/api/matakuliah',
        },
    }
