import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Films = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		// actions.fetchPlanets();
	}, []);
	return (
		<div className="container-fluid content-row">
			<div className="title" style={{ textAlign: "center", paddingBottom: "20px" }}>
				<h1>Películas</h1>
				<span>Descubre nuestro listado de peliculas!</span>
			</div>
			<div className="cards-content">
				<div className="row col-auto" style={{ margin: "10px", width: "15 rem" }}>
					<div className="card bg-dark">
						<img
							src="https://starwarsblog.starwars.com/wp-content/uploads/2018/10/mustafar-tall.jpg"
							className="characters card-img-top mx-auto"
							alt="..."
						/>
						<div className="card-body">
							<h5
								className="card-title text-warning"
								style={{ textAlign: "center", paddingBottom: "40px" }}>
								Titulo
							</h5>
							<a href="#" className="btn btn-primary float-start">
								<span className="text-warning ">Aprender más</span>
							</a>
							<button className="btn btn-outline-warning float-end">
								<i className="fas fa-heart" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
