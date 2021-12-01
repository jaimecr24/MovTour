const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			infoFilms: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			fetchFilms: () => {
				console.log(process.env.BACKEND_URL + "/api/films");
				fetch("https://3001-lime-cat-0lc0af7e.ws-eu20.gitpod.io/api/films")
					.then(resp => resp.json())
					.then(data => setStore({ films: data }))
					.catch(error => console.log("Error loading message from backend", error));
			},

			getInfoFilms: id => {
				fetch("https://3001-lime-cat-0lc0af7e.ws-eu20.gitpod.io/api/films/" + id)
					.then(res => res.json())
					.then(data => {
						console.log(data);
						setStore({
							infoFilms: data
						});
					})
					.catch(error => console.log("Error loading place from backend", error));
			},
			resetInfoFilms: () => {
				setStore({
					infoFilms: null
				});
				localStorage.removeItem("id");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
