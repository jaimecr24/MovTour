import React from "react";
import { Link } from "react-router-dom";
import "bootstrap";
import "bootstrap/js/dist/dropdown";
import cameraImgUrl from "../../img/camera.png";
import profileImgUrl from "../../img/profile.png";
import { FormSignUp } from "./login";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-success" style={{ fontSize: "large" }}>
				<div className="container">
					<Link to="/">
						<img
							src={cameraImgUrl}
							className="navbar-brand "
							style={{ width: "73px", marginLeft: "500px" }}
						/>
					</Link>
				</div>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul
						className="nav navbar-nav navbar-center"
						style={{ fontFamily: "Permanent Marker", fontStyle: "cursive", fontSize: "40px" }}>
						<li className="nav-item active">
							<a
								className="nav-link"
								style={{
									marginRight: "30px",
									color: "white"
								}}>
								Películas
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								style={{
									marginRight: "30px",
									color: "white"
								}}>
								Países
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								style={{
									color: "white"
								}}>
								Sitios
							</a>
						</li>
					</ul>
					<div className="dropdown show">
						<a
							className="dropdown-toggle"
							href="#"
							role="button"
							id="dropdownMenuLink"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							{" "}
							<img src={profileImgUrl} style={{ width: "73px" }} />
						</a>

						<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<a className="dropdown-item btn" data-toggle="modal" href="#mymodal">
								Registrarme
							</a>
							<a className="dropdown-item" href="#">
								Iniciar sesión
							</a>
							<a className="dropdown-item" href="#">
								Mi perfil
							</a>
						</div>
					</div>
				</div>
			</nav>
			<FormSignUp idmodal="mymodal" />
		</>
	);
};
