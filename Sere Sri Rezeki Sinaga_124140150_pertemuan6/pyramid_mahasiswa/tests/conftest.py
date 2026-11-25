import pytest
from sqlalchemy import create_engine
from webtest import TestApp

from pyramid_mahasiswa import main
from pyramid_mahasiswa.models.meta import Base


@pytest.fixture
def testapp(tmp_path):
    """Aplikasi Pyramid dengan database SQLite sementara untuk pengujian."""
    url = f'sqlite:///{tmp_path / "test.sqlite"}'
    engine = create_engine(url)
    Base.metadata.create_all(engine)
    app = main({}, **{'sqlalchemy.url': url})
    yield TestApp(app)
    engine.dispose()
