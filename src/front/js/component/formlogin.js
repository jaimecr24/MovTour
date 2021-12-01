import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import usericon from "../../img/users.png";
import "../../styles/modal.scss";

export const FormLogin = () => {
	const { actions } = useContext(Context);
	const [data, setData] = useState({
		identifier: "",
		password: ""
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
		let isUsername = false;

		if (!isValidEmail(data.identifier)) {
			// Must be username
			isUsername = isValidUserName(data.identifier);
			if (!isUsername) msg = "Identificador no válido";
		}
		if (msg == "") {
			// validation password
			if (data.password.length < 6) msg = "Password debe tener como mínimo 6 caracteres";
			else {
				if (isUsername) {
					actions.login(null, data.identifier, data.password);
				} else {
					actions.login(data.identifier, null, data.password);
				}
			}
		}
		if (msg !== "") {
			let form = document.getElementById("formLogin");
			for (let i = 0; i < form.children.length; i++) {
				if (form.children[i].localName === "input") form.children[i].required = true;
			}
			document.getElementById("errorReg").innerText = msg;
			document.getElementById("errorReg").style.display = "block";
		}
	};

	return (
		<div className="custom-modal" style={{ paddingTop: "10rem" }}>
			<div className="custom-modal-content mx-auto" style={{ width: "50rem" }}>
				<div className="header d-flex flex-row">
					<h3 className="text-white mx-auto my-3">Login</h3>
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
					<img src={usericon} width="180" />
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
					<form id="formLogin" className="w-75 mt-3" onSubmit={handleSubmit}>
						<div className="input-group mb-3">
							<span className="input-group-text border-0" style={{ background: "blue", color: "white" }}>
								<i className="fas fa-user" />
							</span>
							<input
								className="form-control fs-4"
								name="identifier"
								placeholder="email or username"
								onChange={handleChange}
								value={data.identifier}
							/>
						</div>
						<div className="input-group mb-3">
							<span className="input-group-text border-0" style={{ background: "blue", color: "white" }}>
								<i className="fas fa-lock" />
							</span>
							<input
								type="password"
								name="password"
								className="form-control fs-4"
								placeholder="Password"
								onChange={handleChange}
								value={data.password}
							/>
						</div>
						<button
							type="submit"
							className="btn w-50 fs-5 text-white mt-3"
							style={{ background: "blue" }}
							onClick={handleSubmit}>
							LOGIN
						</button>
					</form>
					<div className="mt-5 fs-5 text-white">You are not a member?</div>
					<Link to="/signup">
						<button type="button" className="btn w-50 fs-5 text-white my-4" style={{ background: "blue" }}>
							REGISTER NOW
						</button>
					</Link>
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
