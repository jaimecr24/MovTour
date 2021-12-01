import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const FormSignUp = () => {
	const { actions } = useContext(Context);
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password1: "",
		password2: "",
		signed: false
	});

	const handleChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		let msg = "";

		if (!data.signed) {
			if (!isValidName(data.firstName)) msg = "Nombre no válido\n";
			else if (!isValidName(data.lastName)) msg = "Apellido no válido\n";
			else if (!isValidUserName(data.username)) msg = "Nombre de usuario no válido\n";
			else if (!isValidEmail(data.email)) msg = "Email no válido\n";
			else if (data.password1.length < 6) msg = "Password debe tener como mínimo 6 caracteres\n";
			else if (data.password1 !== data.password2) msg = "Error en confirmación de password";
			if (msg !== "") {
				let form = document.getElementById("formReg");
				for (let i = 0; i < form.children.length; i++) {
					if (form.children[i].localName === "input") form.children[i].required = true;
				}
				document.getElementById("errorReg").innerText = msg;
				document.getElementById("errorReg").style.display = "block";
			} else {
				actions
					.addUser(data.firstName, data.lastName, data.username, data.email, data.password1)
					.then(res => res.json())
					.then(json => {
						if (json["message"] == "ok") {
							//alert("user added ok");
							//closeModal(e);
						}
					});
				let label = document.getElementById("errorReg");
				label.innerText = "Registro completo";
				label.style.background = "#dcf0db";
				label.style.color = "green";
				label.style.display = "block";
				setData({ ...data, signed: true });
			}
		}
	};

	return (
		<div className="custom-modal" style={{ paddingTop: "10rem" }}>
			<div className="custom-modal-content mx-auto" style={{ width: "50rem" }}>
				<div className="header d-flex flex-row">
					<h3 className="text-white mx-auto my-3">Registro</h3>
					<Link to="/">
						<button
							className="ms-auto mb-5 border-0 px-2"
							type="button"
							style={{ color: "white", background: "blue" }}>
							X
						</button>
					</Link>
				</div>
				<div align="center">
					<form className="w-75 mt-3" id="formReg" onSubmit={handleSubmit}>
						<div
							id="errorReg"
							style={{
								background: "#ffeeee",
								color: "#cc3350",
								marginBottom: "1rem",
								display: "none"
							}}>
							Texto de error
						</div>
						<input
							className="form-control fs-4 mb-3"
							name="firstName"
							placeholder="Nombre"
							onChange={handleChange}
							value={data.firstName}
							pattern="[a-zA-Z0-9\s]+"
							minLength="1"
						/>
						<input
							className="form-control fs-4 mb-3"
							name="lastName"
							placeholder="Apellido(s)"
							onChange={handleChange}
							value={data.lastName}
							pattern="[a-zA-Z0-9\s]+"
							minLength="1"
						/>
						<input
							className="form-control fs-4 mb-3"
							name="username"
							placeholder="Nombre de usuario"
							onChange={handleChange}
							value={data.username}
							pattern="[a-zA-Z0-9]+"
							minLength="4"
						/>
						<input
							className="form-control fs-4 mb-3"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							value={data.email}
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						/>
						<input
							type="password"
							name="password1"
							className="form-control fs-4 mb-3"
							placeholder="Password"
							onChange={handleChange}
							value={data.password1}
							minLength="6"
						/>
						<input
							type="password"
							name="password2"
							className="form-control fs-4 mb-3"
							placeholder="Confirme password"
							onChange={handleChange}
							value={data.password2}
							minLength="6"
						/>
						{data.signed ? (
							<Link to="/login">
								<button
									type="submit"
									id="btnReg"
									className="btn w-50 fs-5 text-white mt-3 mb-5"
									style={{ background: "blue" }}>
									IR A LOGIN
								</button>
							</Link>
						) : (
							<button
								type="submit"
								id="btnReg"
								className="btn w-50 fs-5 text-white mt-3 mb-5"
								style={{ background: "blue" }}>
								REGISTRO
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

function isValidName(name) {
	let regName = /^[a-zA-Z ]+$/;
	return regName.test(name);
}

function isValidEmail(email) {
	let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regEmail.test(email);
}

function isValidUserName(username) {
	let regUsername = /^[a-zA-Z0-9]+$/;
	return regUsername.test(username);
}
