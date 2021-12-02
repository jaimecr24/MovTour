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
			token: "",
			activeUserId: null,
			singlePlace: null,
			infoFilms: null
		},
		actions: {
			addUser: (name, lastname, username, email, password, category = false) => {
				return fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					body: JSON.stringify({
						name: name,
						lastname: lastname,
						username: username,
						email: email,
						password: password,
						category: category
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
			},

			login: (email, username, password) => {
				// Llamada a /login para obtener el token
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({ email: email, username: username, password: password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(res => {
						if (res.token) {
							setStore({ token: res.token });
							setStore({ activeUserId: res.id });
						}
					})
					.catch(error => console.error("Error: ", error));
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setActiveUserId: id => setStore({ activeUserId: id }),

			setToken: tk => setStore({ token: tk }),

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getPlaces: () => {
				// fetching data from the backend
				console.log(process.env.BACKEND_URL + "/api/places");
				//fetch(process.env.BACKEND_URL + "api/places")
				fetch("https://3001-olive-woodpecker-e6w7oxdp.ws-eu17.gitpod.io/api/places")
					.then(resp => resp.json())
					.then(data => setStore({ places: data }))
					.catch(error => console.log("Error loading places from backend", error));
			},
			getSinglePlace: id => {
				fetch("https://3001-olive-woodpecker-e6w7oxdp.ws-eu17.gitpod.io/api/places/" + id)
					.then(res => res.json())
					.then(data => {
						console.log(data);
						setStore({
							singlePlace: data
						});
					})
					.catch(error => console.log("Error loading place from backend", error));
			},
			resetSinglePlace: () => {
				setStore({
					singlePlace: null
				});
				localStorage.removeItem("id");
			},

			fetchFilms: () => {
				console.log(process.env.BACKEND_URL + "/api/films");
				fetch("https://3001-turquoise-tuna-zuu2xgjy.ws-eu21.gitpod.io/api/films")
					.then(resp => resp.json())
					.then(data => setStore({ films: data }))
					.catch(error => console.log("Error loading message from backend", error));
			},

			getInfoFilms: id => {
				fetch("https://3001-turquoise-tuna-zuu2xgjy.ws-eu21.gitpod.io/api/films/" + id)
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
