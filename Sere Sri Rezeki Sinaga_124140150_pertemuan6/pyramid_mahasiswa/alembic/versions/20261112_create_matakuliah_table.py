"""create matakuliah table

Revision ID: 7c1d5e9a3b20
Revises: 4a9f3b8c2d1e
Create Date: 2026-11-24 09:30:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c1d5e9a3b20'
down_revision = '4a9f3b8c2d1e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'matakuliah',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('kode_mk', sa.Text(), nullable=False),
        sa.Column('nama_mk', sa.Text(), nullable=False),
        sa.Column('sks', sa.Integer(), nullable=False),
        sa.Column('semester', sa.Integer(), nullable=False),
        sa.CheckConstraint('sks > 0', name=op.f('ck_matakuliah_sks_positif')),
        sa.CheckConstraint(
            'semester > 0', name=op.f('ck_matakuliah_semester_positif')),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_matakuliah')),
        sa.UniqueConstraint('kode_mk', name=op.f('uq_matakuliah_kode_mk')),
    )


def downgrade():
    op.drop_table('matakuliah')
