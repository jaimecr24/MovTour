import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "bootstrap";
import "bootstrap/js/dist/dropdown";
import cameraImgUrl from "../../img/camera.png";
import profileImgUrl from "../../img/profile.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg" style={{ fontSize: "large", backgroundColor: "transparent" }}>
			<div className="container">
				<Link to="/">
					<img src={cameraImgUrl} className="navbar-brand " style={{ width: "73px" }} />
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
							<Link to="/films" style={{ textDecoration: "none", color: "white" }}>
								Películas
							</Link>
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link"
							style={{
								marginRight: "30px",
								color: "white"
							}}>
							<Link to="/countries" style={{ textDecoration: "none", color: "white" }}>
								Países
							</Link>
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link"
							style={{
								color: "white"
							}}>
							<Link to="/places" style={{ textDecoration: "none", color: "white" }}>
								Sitios
							</Link>
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
						{store.activeUserId ? (
							<>
								<a className="dropdown-item" href="#">
									Mi perfil
								</a>
								<a
									className="dropdown-item"
									href="#"
									onClick={() => {
										actions.setToken("");
										actions.setActiveUserId(null);
									}}>
									Logout
								</a>
							</>
						) : (
							<>
								<Link to="/signup">
									<span className="dropdown-item btn">Registrarme</span>
								</Link>
								<Link to="/login">
									<span className="dropdown-item">Iniciar sesión</span>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
