"""empty message

Revision ID: 06ef6f7bec89
Revises: 0c7145e9a5fc
Create Date: 2024-04-24 02:40:03.908830

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '06ef6f7bec89'
down_revision = '0c7145e9a5fc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friendship_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.Column('accepted', sa.Boolean(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('friendship_requests')
    # ### end Alembic commands ###