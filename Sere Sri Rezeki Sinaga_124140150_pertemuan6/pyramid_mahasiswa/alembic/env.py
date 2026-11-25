from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config, pool

# Import models agar seluruh tabel terdaftar pada Base.metadata
from pyramid_mahasiswa import models  # noqa: F401
from pyramid_mahasiswa.models.meta import Base

config = context.config

setup_logging(config.config_file_name)
settings = get_appsettings(config.config_file_name)
target_metadata = Base.metadata


def run_migrations_offline():
    """Mode offline: hanya menghasilkan SQL tanpa koneksi ke database."""
    context.configure(
        url=settings['sqlalchemy.url'],
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Mode online: menjalankan migrasi langsung ke database."""
    engine = engine_from_config(
        settings, prefix='sqlalchemy.', poolclass=pool.NullPool)

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
