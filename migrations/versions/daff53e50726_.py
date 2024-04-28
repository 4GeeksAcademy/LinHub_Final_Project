"""empty message

Revision ID: daff53e50726
Revises: 
Create Date: 2024-04-27 22:36:18.373123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'daff53e50726'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('language_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('language_name')
    )
    op.create_table('available_courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('language_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('salt', sa.String(length=90), nullable=False),
    sa.Column('lives', sa.Integer(), nullable=True),
    sa.Column('last_wrong', sa.DateTime(), nullable=True),
    sa.Column('streak', sa.Integer(), nullable=True),
    sa.Column('last_login', sa.DateTime(), nullable=True),
    sa.Column('image', sa.String(length=3000), nullable=True),
    sa.Column('learning_language_id', sa.Integer(), nullable=True),
    sa.Column('native_language_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['learning_language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['native_language_id'], ['languages.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('available_course_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['available_course_id'], ['available_courses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
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
    op.create_table('modules',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('available_course_id', sa.Integer(), nullable=True),
    sa.Column('module_name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['available_course_id'], ['available_courses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lessons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lesson_name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('module_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['module_id'], ['modules.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('question', sa.String(), nullable=False),
    sa.Column('lesson_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['lesson_id'], ['lessons.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('options',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('option', sa.String(), nullable=False),
    sa.Column('correct', sa.Boolean(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('options')
    op.drop_table('questions')
    op.drop_table('lessons')
    op.drop_table('modules')
    op.drop_table('friendship_requests')
    op.drop_table('courses')
    op.drop_table('users')
    op.drop_table('available_courses')
    op.drop_table('languages')
    # ### end Alembic commands ###