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
				try {
					const res = await fetch(process.env.BACKEND_URL + '/api/register', {
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

			loginUser: async (userInfo) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify(userInfo),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await res.json()
					console.log(data)
				}
				catch (err) {
					console.log('There was an error', err)
				}
			},
		}
	}
};

export default getState;
