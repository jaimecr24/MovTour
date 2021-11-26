from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    category = db.Column(db.Boolean(), unique=False, nullable=False) #false for user, true for admin
    lastTime = db.Column(db.Date)
    customer = db.relationship("Customer", back_populates="user", uselist=False)
    
    def __repr__(self):
        return '<Login %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=True)

    user = db.relationship("User", back_populates="customer")

    def __repr__(self):
        return '<Customer %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Film(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    director = db.Column(db.String(80), unique=True, nullable=False)
    year = db.Column(db.Integer)
    description = db.Column(db.String)

    def __repr__(self):
        return '<Film %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idCountry = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    description = db.Column(db.String)
    countLikes = db.Column(db.Integer)
    entryDate = db.Column(db.Date)
    country = db.relationship('Country')

    def __repr__(self):
        return '<Place %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    urlFlag = db.Column(db.String)
    description = db.Column(db.String)

    def __repr__(self):
        return '<Country %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idFilm = db.Column(db.Integer, db.ForeignKey('film.id'), nullable=False)
    idPlace = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    description = db.Column(db.String)
    film = db.relationship('Film')
    place = db.relationship('Place')
    
    def __repr__(self):
        return '<Scene %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }



class FavPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    idPlace = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    user = db.relationship('User')
    place = db.relationship('Place')
    
    def __repr__(self):
        return '<FavPlace %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    idPlace = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    description = db.Column(db.String)
    time = db.Column(db.Date)
    user = db.relationship('User')
    place = db.relationship('Place')
    
    def __repr__(self):
        return '<FavPlace %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }


class PhotoFilm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idFilm = db.Column(db.Integer, db.ForeignKey('film.id'), nullable=False)
    urlPhoto = db.Column(db.String)
    description = db.Column(db.String)
    film = db.relationship('Film')
    
    def __repr__(self):
        return '<PhotoFilm %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }


class PhotoPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idPlace = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=False)
    urlPhoto = db.Column(db.String)
    description = db.Column(db.String)
    place = db.relationship('Place')
    
    def __repr__(self):
        return '<PhotoPlace %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
        }
