"""empty message

Revision ID: 2f26c596c5f6
Revises: 0c7145e9a5fc
Create Date: 2024-04-23 18:02:33.989452

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f26c596c5f6'
down_revision = '0c7145e9a5fc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=3000), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###