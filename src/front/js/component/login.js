import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const FormSignUp = params => {
	const { actions } = useContext(Context);
	const [data, setData] = useState({
		name: "",
		last_name: "",
		username: "",
		newemail: "",
		password1: "",
		password2: ""
	});

	const handleChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	// To active accept button
	let validation =
		data.name !== "" &&
		data.username !== "" &&
		data.newemail !== "" &&
		data.password1 !== "" &&
		data.password1 == data.password2;

	const handleSignUp = e => {
		e.preventDefault();

		actions.addUser(data.name, data.last_name, data.username, data.newemail, data.password1);
		setData({
			...data,
			["newemail"]: "",
			["password1"]: "",
			["password2"]: "",
			["username"]: "",
			["name"]: "",
			["last_name"]: ""
		});
	};

	return (
		<div
			className="modal fade"
			id={params.idmodal}
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h3 className="modal-title" id="exampleModalLabel">
							Sign Up
						</h3>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
					</div>
					<div className="modal-body">
						<form className="w-100" onSubmit={handleSignUp}>
							<div className="form-group mb-3">
								<input
									className="form-control rounded fs-4"
									id="InputName"
									name="name"
									placeholder="Name"
									onChange={handleChange}
									value={data.name}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									className="form-control rounded fs-4"
									id="InputLastName"
									name="last_name"
									placeholder="Last name"
									onChange={handleChange}
									value={data.last_name}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									className="form-control rounded fs-4"
									id="InputUsername"
									name="username"
									placeholder="Username"
									onChange={handleChange}
									value={data.username}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									type="email"
									className="form-control rounded fs-4"
									id="InputNewEmail"
									name="newemail"
									placeholder="Email adress"
									onChange={handleChange}
									value={data.newemail}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									type="password"
									name="password1"
									className="form-control rounded fs-4"
									id="InputPassword1"
									placeholder="New password"
									onChange={handleChange}
									value={data.password1}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									type="password"
									name="password2"
									className="form-control rounded fs-4"
									id="InputPassword2"
									placeholder="Confirm password"
									onChange={handleChange}
									value={data.password2}
								/>
							</div>
							<button
								type="button"
								className={`btn btn-success rounded w-100 fs-5 fw-bold ${
									validation ? "active" : "disabled"
								}`}
								data-bs-dismiss="modal"
								onClick={handleSignUp}>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

FormSignUp.propTypes = {
	idmodal: PropTypes.string
};
