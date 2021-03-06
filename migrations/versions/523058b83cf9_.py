"""empty message

Revision ID: 523058b83cf9
Revises: 
Create Date: 2021-12-03 19:10:14.438601

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '523058b83cf9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('country',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('urlFlag', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('film',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('director', sa.String(length=80), nullable=False),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('urlPhoto', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('director')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('category', sa.Boolean(), nullable=False),
    sa.Column('lastTime', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('customer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idUser', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['idUser'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('place',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idCountry', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('latitude', sa.String(), nullable=True),
    sa.Column('longitude', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('countLikes', sa.Integer(), nullable=True),
    sa.Column('entryDate', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['idCountry'], ['country.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idUser', sa.Integer(), nullable=False),
    sa.Column('idPlace', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('time', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['idPlace'], ['place.id'], ),
    sa.ForeignKeyConstraint(['idUser'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fav_place',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idUser', sa.Integer(), nullable=False),
    sa.Column('idPlace', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['idPlace'], ['place.id'], ),
    sa.ForeignKeyConstraint(['idUser'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photo_place',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idPlace', sa.Integer(), nullable=False),
    sa.Column('urlPhoto', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['idPlace'], ['place.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('scene',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('idFilm', sa.Integer(), nullable=False),
    sa.Column('idPlace', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['idFilm'], ['film.id'], ),
    sa.ForeignKeyConstraint(['idPlace'], ['place.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('scene')
    op.drop_table('photo_place')
    op.drop_table('fav_place')
    op.drop_table('comment')
    op.drop_table('place')
    op.drop_table('customer')
    op.drop_table('user')
    op.drop_table('film')
    op.drop_table('country')
    # ### end Alembic commands ###
