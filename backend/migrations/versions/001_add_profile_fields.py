"""add profile fields

Revision ID: 001_add_profile_fields
Revises: initial_migration
Create Date: 2025-01-13 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001_add_profile_fields'
down_revision = 'initial_migration'
branch_labels = None
depends_on = None

def upgrade():
    # Добавляем новые поля в таблицу users
    op.add_column('users', sa.Column('parent_name', sa.String(), nullable=True))
    op.add_column('users', sa.Column('parent_email', sa.String(), nullable=True))
    op.add_column('users', sa.Column('age', sa.Integer(), nullable=True))
    op.add_column('users', sa.Column('school', sa.String(), nullable=True))
    op.add_column('users', sa.Column('real_grade', sa.Integer(), nullable=True))
    op.add_column('users', sa.Column('city', sa.String(), nullable=True))
    
    # Создаем таблицу user_teachers
    op.create_table('user_teachers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('teacher_name', sa.String(), nullable=True),
        sa.Column('subject', sa.String(), nullable=True),
        sa.Column('custom_subject', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_teachers_id'), 'user_teachers', ['id'], unique=False)

def downgrade():
    # Удаляем таблицу user_teachers
    op.drop_index(op.f('ix_user_teachers_id'), table_name='user_teachers')
    op.drop_table('user_teachers')
    
    # Удаляем поля из таблицы users
    op.drop_column('users', 'city')
    op.drop_column('users', 'real_grade')
    op.drop_column('users', 'school')
    op.drop_column('users', 'age')
    op.drop_column('users', 'parent_email')
    op.drop_column('users', 'parent_name')
