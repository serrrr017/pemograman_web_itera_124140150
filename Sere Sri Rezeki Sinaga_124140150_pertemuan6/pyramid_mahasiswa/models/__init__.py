import zope.sqlalchemy
from sqlalchemy import engine_from_config
from sqlalchemy.orm import configure_mappers, sessionmaker

# Import model classes agar terdaftar pada metadata SQLAlchemy
from .mahasiswa import Mahasiswa  # noqa: F401
from .matakuliah import Matakuliah  # noqa: F401

# Jalankan configure_mappers setelah seluruh model diimpor
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """Membuat SQLAlchemy Session yang terikat ke transaction manager.

    Transaksi otomatis di-commit saat response sukses dan di-rollback
    jika terjadi error tak tertangani.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """Inisialisasi konfigurasi database saat Pyramid startup"""
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # pyramid_tm mengikat transaksi ke lifecycle request HTTP
    config.include('pyramid_tm')

    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    # Menyediakan properti request.dbsession di setiap request HTTP
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True,
    )
