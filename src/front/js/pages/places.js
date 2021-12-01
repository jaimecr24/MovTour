import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Places = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h2 className="text-center py-3 text-light">Sitios de rodaje</h2>
			<div className="row d-flex  justify-content-between">
				{store.places
					? store.places.map((value, index) => {
							return (
								<div
									className="card px-0 mx-4 col rounded col-3 mb-5"
									key={index}
									style={{ minWidth: "350px" }}>
									<img
										className="card-img-top bg-dark"
										src="..."
										alt="..."
										style={{ height: "200px" }}
									/>
									<div className="card-body">
										<h5 className="card-title text-success text-center">{value.name}</h5>
										<div style={{ fontSize: "10px" }}>
											<div className="text-dark">{value.description}</div>

											<div className="text-danger">Harry Potter...</div>
											<Link to="/place" onClick={() => localStorage.setItem("id", value.id)}>
												<span className="btn btn-outline-primary">Learn More!</span>
											</Link>
										</div>
									</div>
								</div>
							);
					  })
					: "Cargando"}
			</div>
		</div>
	);
};
