import React, { useContext } from "react";
import { Context } from "../store/appContext";
import icon from "../../img/icon.png";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const style = {
		width: "200px"
	};
	const cardStyle = {
		width: "15rem"
	};

	return (
		<div className="text-center mt-5">
			<h1>MovTour</h1>
			<p>
				<img src={icon} style={style} />
			</p>
			<p>“The world isnt in your books and maps, it is out there.” ― The Hobbit, J.R.R. Tolkien</p>
			<div className="row">
				<div className="col-6 offset-3">
					<div className="input-group">
						<input
							type="search"
							className="form-control rounded"
							placeholder="Search"
							aria-label="Search"
							aria-describedby="search-addon"
						/>
						<button type="button" className="btn btn-dark">
							search
						</button>
					</div>
				</div>
			</div>
			<br />
			<div className="row">
				<div className="col-3 offset-1">
					<div className="card text-white bg-secondary mb-3" style={cardStyle}>
						<div className="card-header">Sitios de Rodaje</div>
						<div className="card-body">
							<h5 className="card-title">Title</h5>
							<img src="..." style={{ backgroundColor: "white", width: "100px", height: "100px" }} />
						</div>
					</div>
				</div>

				<div className="col-3 offset-1">
					<div className="card text-white bg-secondary mb-3" style={cardStyle}>
						<div className="card-header">Sitios de Rodaje</div>
						<div className="card-body">
							<h5 className="card-title">Title</h5>
							<img src="..." style={{ backgroundColor: "white", width: "100px", height: "100px" }} />
						</div>
					</div>
				</div>

				<div className="col-3 offset-1">
					<div className="card text-white bg-secondary mb-3" style={cardStyle}>
						<div className="card-header">Sitios de Rodaje</div>
						<div className="card-body">
							<h5 className="card-title">Title</h5>
							<img src="..." style={{ backgroundColor: "white", width: "100px", height: "100px" }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
