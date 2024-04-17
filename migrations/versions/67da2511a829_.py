"""empty message

Revision ID: 67da2511a829
Revises: 2f58db16ad03
Create Date: 2024-04-17 04:01:49.092098

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '67da2511a829'
down_revision = '2f58db16ad03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=200),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    # ### end Alembic commands ###
