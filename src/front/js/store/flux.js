const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentIdiom: "Español",
			userToken: sessionStorage.getItem("token") || ""
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
					if (!res.ok) throw new Error
					return true
				} catch (error) {
					console.log("There was an error creating a new user", error);
					return false
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
					if (!res.ok) throw new Error
					sessionStorage.setItem("token", data.token)
					setStore({ userToken: data.token })
					return true
				}
				catch (err) {
					console.log('There was an error', err)
					return false
				}
			},
		}
	}
};

export default getState;
