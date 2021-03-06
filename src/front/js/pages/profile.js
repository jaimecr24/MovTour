import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/modal.scss";
import usericon from "../../img/users.png";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	const [data, setData] = useState({
		name: "",
		lastName: "",
		username: "",
		email: "",
		lastTime: null,
		listItems: []
	});

	let itemsChecked = 0;

	useEffect(() => {
		document.getElementById("btnDel").disabled = itemsChecked < 1;
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
							email: responseUser.email,
							lastTime: new Date(store.previousLoginTime).toLocaleString(),
							listItems: responsePlaces.items
						});
					})
					.catch(error => console.error("Error:", error));
			})
			.catch(error => console.error("Error:", error));
	}, []);

	const handleCheckBox = e => {
		// Disable btnDel if itemsChecked<1 or enable it if itemsChecked>=1
		let btn = document.getElementById("btnDel");
		if (e.target.checked) {
			itemsChecked++;
			if (itemsChecked == 1) {
				btn.disabled = false;
				btn.style.color = "white";
			}
		} else {
			itemsChecked--;
			if (itemsChecked == 0) {
				btn.disabled = true;
				btn.style.color = "gray";
			}
		}
	};

	async function handleDeleteFav(e) {
		let btn = document.getElementById("btnDel");
		let list = document.getElementById("favList");
		let newlistitems = data.listItems;
		try {
			for (let i = 0; i < list.childElementCount; i++) {
				if (list.childNodes[i].firstChild.checked) {
					let id = parseInt(list.childNodes[i].getAttribute("datakey"));
					let res = await actions.delFavPlace(id); // await to wait promise is completed.
					//let resj = await res.json();  ---- Here not necessary -----
					if (res.ok) {
						newlistitems = newlistitems.filter(e => e["id"] != id);
						itemsChecked--;
						if (itemsChecked == 0) {
							btn.disabled = true;
							btn.style.color = "gray";
						}
					}
				}
			}
			// Finally we update the listItems in data to render new list of favorites.
			setData({ ...data, listItems: newlistitems });
		} catch (error) {
			console.log("Error: ", error);
		}
	}

	return (
		<div className="container bg-success text-white mt-4 pt-5">
			<div className="fs-2 ps-3">{`Bienvenido, ${data.username}`}</div>
			<div className="row">
				<div className="col-5 offset-1">
					<div className="mt-4">
						<div className="fs-3 border-bottom border-light pb-1">Tus datos</div>
						<div className="mt-3">{`Nombre: ${data.name}`}</div>
						<div className="mt-2">{`Apellidos: ${data.lastName}`}</div>
						<div className="mt-2">{`Email: ${data.email}`}</div>
						<div className="mt-2">{`??ltimo inicio de sesi??n: ${data.lastTime}`}</div>
					</div>
				</div>
				<div className="col-5 mt-5 align-items-center" align="center">
					<img src={usericon} width="180px" />
				</div>
			</div>

			<div className="py-5">
				<div className="row">
					<div className="fs-3 col-5 offset-1">{`Lugares favoritos: ${data["listItems"].length}`}</div>
					<button
						id="btnDel"
						className="col-2 offset-3 fs-5"
						style={{ background: "#154c79", color: "lightgray" }}
						onClick={handleDeleteFav}>
						Eliminar
					</button>
				</div>
				<div className="row mt-2">
					<div className="col-10 offset-1" id="favList">
						{data["listItems"].map(value => (
							<div
								key={value.id}
								datakey={value.id}
								className="row border-top border-light py-1 align-items-center">
								<input
									className="col-1"
									type="checkbox"
									style={{ width: "20px", height: "20px" }}
									onClick={handleCheckBox}
								/>
								<img className="col-2" src={value.urlPhoto} />
								<div className="col-4">{`${value.name} (${value.countryName})`}</div>
								{
									//<Link to={`/place/${value.id.toString()}`}></Link>
								}
								<div className="col-5">{value.description}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
