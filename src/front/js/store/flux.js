const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentIdiom: "Español"
		},
		actions: {
			// Use getActions to call a function within a fuction
			changeLanguage: (language) => {
				setStore({ currentIdiom: language })
			},
			createNewUser: async (userInfo) => {
				url = process.env.BACKEND_URL + "/api/users";
				try {
					const res = await fetch(url, {
						method: "POST",
						body: JSON.stringify(userInfo),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const data = await res.json();
					console.log(data);
				} catch (error) {
					console.log("There was an error creating a new user", error);
				}
			},
			loginUser: (userInfo) => {
				url = process.env.BACKEND_URL + "/api/login";
				fetch(url, {
					method: "POST",
					body: JSON.stringify(userInfo),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
					})
					.catch(error => console.log("There was an error logging in the user", error));
			},
		}
	}
};

export default getState;
