import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/modal.scss";

export const Profile = () => {
	const { actions } = useContext(Context);
	let name, lastName, username, lastTime;
	let favorites = [];
	let listItems = "";

	actions
		.getUser()
		.then(res => res.json())
		.then(response => {
			name = response.name;
			lastName = response.last_name;
			username = response.username;
			lastTime = new Date(response.lastTime);
			document.getElementById("elemLastTime").innerHTML = lastTime.toLocaleString();
			document.getElementById("elemUsername").innerHTML = username;
			document.getElementById("elemName").innerHTML = name;
			document.getElementById("elemLastName").innerHTML = lastName;
		})
		.catch(error => console.error("Error:", error));

	actions
		.getFavPlaces()
		.then(res => res.json())
		.then(response => {
			favorites = response.items;
			document.getElementById("elemCountFav").innerHTML = favorites.length.toString();
			listItems = favorites.map(value => `<div>${value.name} (${value.countryName})</div>`).join("");
			console.log(listItems);
			document.getElementById("ListFav").innerHTML = listItems.toString();
		})
		.catch(error => console.error("Error:", error));

	return (
		<div className="container">
			<div className="row">
				<h2>Bienvenido, </h2>
				<h2 id="elemUsername">Username</h2>
			</div>
			<div className="row">
				<h4>Nombre: </h4>
				<h4 id="elemName">Nombre</h4>
			</div>
			<div className="row">
				<h4>Apellidos: </h4>
				<h4 id="elemLastName">Apellidos</h4>
			</div>
			<div className="row">
				<h4>Último inicio de sesión: </h4>
				<h4 id="elemLastTime">DateTime</h4>
			</div>
			<div className="row">
				<h4>Lugares favoritos: </h4>
				<h4 id="elemCountFav">NumFavoritos</h4>
			</div>
			<div className="row">
				<h4>Lista: </h4>
				<h4 id="ListFav">Lista de favoritos</h4>
			</div>
		</div>
	);
};
