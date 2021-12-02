"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Customer, Film, Place, Country, FavPlace, Scene
from api.utils import generate_sitemap, APIException
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

#registro del usuario
@api.route("/signup", methods=["POST"])
def signup():
    #Get data from request
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    name = request.json.get("name", None)
    lastname = request.json.get("lastname", None)
    username = request.json.get("username", None)
    category = request.json.get("category", None)

    #Check if user exists in database
    user = User.query.filter_by(email=email).first()
    if user is None:
        user = User.query.filter_by(username=username).first()
        if user is None:
            #Create registres in User and Login
            newuser = User(email=email, password=password, username=username, lastTime=None, category=category)
            db.session.add(newuser)
            #Query to get the id of new user
            userdata = User.query.filter_by(username=username).first()
            customer = Customer(idUser=userdata.id, name=name, last_name=lastname)
            db.session.add(customer)
            db.session.commit()
            return jsonify({"message": "ok", "id": userdata.id, "name":customer.name, "last_name":customer.last_name}), 200
        else:
            return jsonify({"error":"username already exists"}), 400
    else:
        return jsonify({"error":"user already exists"}), 400


@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    # Query your database for email/username and password
    if username is None:
        user = User.query.filter_by(email=email).first()
    else:
        user = User.query.filter_by(username=username).first()

    if user is None:
        # the user was not found on the database
        return jsonify({"error": "bad identifier"}), 401
    elif user.password != password:
        # bad password
        return jsonify({"error": "bad password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "id": user.id }), 200


    #ALL PLACES GET
@api.route('/places', methods=['GET', 'POST'])
def listPlaces():
     # GET all places
    list_places = Place.query.all()
    if request.method == 'GET':
        return jsonify([place.serialize() for place in list_places]), 200

    # POST a new place
    if request.method == 'POST':
        data = request.json
        id = data.get("id")
        existsPlace = Place.query.filter_by(id=id).first()
        existsCountry = Country.query.filter_by(id=data.get("idCountry")).first()
        likes=FavPlace.query.filter_by(idPlace=id).count()

    # Data validation
    if existsPlace is not None:        
        raise APIException(f"place with id {id} already exists", status_code=400)
    if existsCountry is None:        
        raise APIException("Country not found in data base", status_code=400)
    if data is None:
        raise APIException("You need to add the request body as a json object", status_code=400)
    if 'name' not in data:
        raise APIException('You need to add the name', status_code=400)
    if 'idCountry' not in data:
        raise APIException('You need to add the country id', status_code=400)
    
    if 'id' in data:
        new_place = Place(id=data.get("id"), idCountry=data.get("idCountry"), name=data.get("name"), latitude=data.get("latitude"), longitude=data.get("longitude"), description=data.get("description"), countLikes=likes, entryDate=datetime.now())
    elif 'id' not in data:
        new_place = Place(idCountry=data.get("idCountry"), name=data.get("name"), latitude=data.get("latitude"), longitude=data.get("longitude"), description=data.get("description"), countLikes=likes, entryDate=datetime.now())
    db.session.add(new_place)
    db.session.commit()
    return jsonify([{'message': 'added ok'}, new_place.serialize()]),200


#SINGLE PLACE GET AND DELETE
@api.route('/places/<int:place_id>', methods=['GET', 'DELETE'])
def getPlace(place_id):

    place = Place.query.filter_by(id=place_id).first()

    # Data validation
    if place is None:
        raise APIException(f"place with id {place_id} not found in data base", status_code=404)

    #GET a place
    if request.method == 'GET':
        return jsonify(place.serialize()), 200

    #DELETE a place
    if request.method == 'DELETE':
        db.session.delete(place)
        db.session.commit()
        return jsonify({'message': f'place with id {place_id} deleted'}), 200

      
@api.route('/films', methods=['GET', 'POST'])
def list_film():
     # GET all films
    if request.method == 'GET':
        list_film = Film.query.all()
    return jsonify([film.serialize() for film in list_film]), 200

    # POST a new film
    if request.method == 'POST':
        film_to_add = request.json

    # Data validation
    if film_to_add is None:
        raise APIException("You need to add the request body as a json object", status_code=400)
    if 'name' not in film_to_add:
        raise APIException('You need to add the name', status_code=400)
    if 'img_url' not in film_to_add:
         url = None
    else: url = film_to_add["img_url"]

    new_film = Film(name=film_to_add["name"], img_url=url)
    db.session.add(new_film)
    db.session.commit()
    return jsonify(new_film.serialize()), 200

@api.route('/films/<int:film_id>', methods=['GET', 'DELETE'])
def getfilm(film_id):

    film = Film.query.filter_by(id=film_id).first()

    # GET a film
    if request.method == 'GET':
        return jsonify(film.serialize()), 200

    # DELETE a film
    if request.method == 'DELETE':
        db.session.delete(film)
        db.session.commit()


    #ALL SCENES GET
@api.route('/scenes', methods=['GET', 'POST'])
def listScenes():
     # GET all scenes
    list_scenes = Scene.query.all()
    if request.method == 'GET':
        return jsonify([scene.serialize() for scene in list_scenes]), 200

    # POST a new scene
    if request.method == 'POST':
        data = request.json
        id = data.get("id")
        existsScene = Scene.query.filter_by(id=id).first()
        existsPlace = Place.query.filter_by(id=data.get("idPlace")).first()
        existsFilm = Film.query.filter_by(id=data.get("idFilm")).first()
        #likes=FavPlace.query.filter_by(idPlace=id).count()

    # Data validation
    if existsScene is not None:        
        raise APIException(f"scene with id {id} already exists", status_code=400)
    if existsPlace is None:        
        raise APIException("Place not found in data base", status_code=400)
    if existsFilm is None:        
        raise APIException("Film not found in data base", status_code=400)
    if data is None:
        raise APIException("You need to add the request body as a json object", status_code=400)
    if 'idPlace' not in data:
        raise APIException('You need to add the place id', status_code=400)
    if 'idFilm' not in data:
        raise APIException('You need to add the film id', status_code=400)
    
    if 'id' in data:
        new_scene = Scene(id=data.get("id"), idPlace=data.get("idPlace"), idFilm=data.get("idFilm"), description=data.get("description"))
    elif 'id' not in data:
        new_scene = Scene(idPlace=data.get("idPlace"), idFilm=data.get("idFilm"), description=data.get("description"))
    db.session.add(new_scene)
    db.session.commit()
    return jsonify([{'message': 'added ok'}, new_scene.serialize()]),200


    #GET SCENES BY PLACE
@api.route('/scenes/place/<int:place_id>', methods=['GET'])
def listScenesByPlace(place_id):    
    list_scenes_byPlace = Scene.query.filter_by(idPlace=place_id) 
    return jsonify([scene.serialize() for scene in list_scenes_byPlace]), 200

    #GET SCENES BY FILM
@api.route('/scenes/film/<int:film_id>', methods=['GET'])
def listScenesByFilm(film_id):    
    list_scenes_byFilm = Scene.query.filter_by(idFilm=film_id) 
    return jsonify([scene.serialize() for scene in list_scenes_byFilm]), 200


   


#SINGLE SCENE GET AND DELETE
@api.route('/scenes/<int:scene_id>', methods=['GET', 'DELETE'])
def getScene(scene_id):

    scene = Scene.query.filter_by(id=scene_id).first()

    # Data validation
    if scene is None:
        raise APIException(f"scene with id {scene_id} not found in data base", status_code=404)

    #GET a scene
    if request.method == 'GET':
        return jsonify(scene.serialize()), 200

    #DELETE a place
    if request.method == 'DELETE':
        db.session.delete(scene)
        db.session.commit()
        return jsonify({'message': f'scene with id {scene_id} deleted'}), 200