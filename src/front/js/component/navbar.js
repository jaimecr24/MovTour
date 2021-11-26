import React from "react";
import { Link } from "react-router-dom";
import "bootstrap";
import "bootstrap/js/dist/dropdown";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-success" style={{ fontSize: "large" }}>
			<div className="container">
				<Link to="/">
					<img
						src="http://assets.stickpng.com/images/5f54a242cce59c0004901cbc.png"
						className="navbar-brand "
						style={{ width: "73px", marginLeft: "500px" }}
					/>
				</Link>
			</div>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="nav navbar-nav navbar-center">
					<li className="nav-item active">
						<a
							className="nav-link"
							style={{
								marginRight: "30px",
								color: "white",
								fontFamily: "Permanent Marker",
								fontStyle: "cursive"
							}}>
							Películas
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link"
							style={{
								marginRight: "30px",
								color: "white",
								fontFamily: "Permanent Marker",
								fontStyle: "cursive"
							}}>
							Países
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link"
							style={{
								color: "white",
								fontFamily: "Permanent Marker",
								fontStyle: "cursive"
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
						<img
							src="http://assets.stickpng.com/thumbs/585e4bf3cb11b227491c339a.png"
							style={{ width: "73px" }}
						/>
					</a>

					<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<a className="dropdown-item" href="#">
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
	);
};
