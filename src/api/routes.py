"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Customer, Film
from api.utils import generate_sitemap, APIException

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
    last_name = request.json.get("last_name", None)
    username = request.json.get("username", None)
    category = False #User not admin

    #Check if user exists in database
    user = User.query.filter_by(email=email).first()
    if user is None:
        #Create registres in User and Login
        newuser = User(email=email, password=password, username=username, lastTime=None, category=category)
        db.session.add(newuser)
        #Query to get the id of new user
        userdata = User.query.filter_by(username=username).first()
        customer = Customer(idUser=userdata.id, name=name, last_name=last_name)
        db.session.add(customer)
        db.session.commit()
        return jsonify({"message": "ok", "id": userdata.id, "name":customer.name, "last_name":customer.last_name}), 200
    else:
        return jsonify({"error":"user already exists"}), 400


@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"error": "email not exists"}), 401
    elif user.password != password:
        # bad password
        return jsonify({"error": "bad password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }), 200

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

    # GET a film
    if request.method == 'GET':
        film = Film.query.filter_by(id=film_id) 
    return jsonify(film.serialize()), 200

    # DELETE a film
    if request.method == 'DELETE':
        db.session.delete(film)
        db.session.commit()

