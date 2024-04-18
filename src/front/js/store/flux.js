const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentIdiom: "Español",
			userToken: JSON.parse(sessionStorage.getItem('userData')) || ""
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
					console.log(error);
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
					});
					const data = await res.json();
					if (!res.ok) throw new Error("Invalid credentials");

					// Guardar el token en sessionStorage
					sessionStorage.setItem("userData", JSON.stringify(data));

					// Actualizar el store con el token
					setStore({ userToken: data });
					// const store = getStore()
					// console.log(store.userToken);

					return true;
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},
			logOut: () => {
				console.log('out')
				sessionStorage.clear()
				setStore({ userToken: "" })
				window.location.href = '/'
			}
		}
	}
};

export default getState;
