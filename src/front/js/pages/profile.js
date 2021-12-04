import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/modal.scss";
import usericon from "../../img/users.png";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	const [data, setData] = useState({
		name: "",
		lastName: "",
		username: "",
		lastTime: null,
		listItems: []
	});

	useEffect(() => {
		actions
			.getUser()
			.then(res => res.json())
			.then(responseUser => {
				actions
					.getFavPlaces()
					.then(res => res.json())
					.then(responsePlaces => {
						setData({
							name: responseUser.name,
							lastName: responseUser.last_name,
							username: responseUser.username,
							//last time login is stored when login function is called.
							lastTime: new Date(store.previousLoginTime).toLocaleString(),
							listItems: responsePlaces.items
						});
					})
					.catch(error => console.error("Error:", error));
			})
			.catch(error => console.error("Error:", error));
	}, []);

	return (
		<div className="container bg-success text-white mt-4 pt-5">
			<div className="fs-2 ps-3">{`Bienvenido, ${data.name}`}</div>
			<div className="row">
				<div className="col-5 offset-1">
					<div className="mt-4">
						<div className="fs-3">Tus datos</div>
						<hr />
						<div className="mt-2">{`Nombre: ${data.name}`}</div>
						<div className="mt-2">{`Apellidos: ${data.lastName}`}</div>
						<div className="mt-2">{`Último inicio de sesión: ${data.lastTime}`}</div>
					</div>
				</div>
				<div className="col-5 mt-5" align="center">
					<img src={usericon} width="180px" />
				</div>
			</div>

			<div className="py-5">
				<div className="fs-3 col-10 offset-1">{`Lugares favoritos: ${data["listItems"].length}`}</div>
				<div className="row mt-2">
					<div className="col-10 offset-1">
						{data["listItems"].map((value, index) => (
							<div key={index} className="row border-top border-light py-1">
								<img className="col-2" src={value.urlPhoto} />
								<div className="col-4">{`${value.name} (${value.countryName})`}</div>
								<div className="col-6">{value.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
