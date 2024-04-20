const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentIdiom: "Español",
			userToken: JSON.parse(sessionStorage.getItem('userData')) || "",
			courses: [{}],
			lessons: ['ehy']
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

					setStore({ userToken: data });
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
			},

			currentUser: async (token) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + "/api/currentUser", {
						method: "GET",

						headers: {
							"Access-Control-Allow-Credentials": true,
							"Authorization": 'Bearer ' + token
						}
					});
					const data = await res.json();
					if (!res.ok) throw new Error("Invalid credentials");

					return data;
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},

			updateUser: async (token, user) => {
				try {

					const res = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "PUT",
						body: JSON.stringify({
							username: user.username,
							first_name: user.first_name,
							password: user.password,
						}),

						headers: {
							"Access-Control-Allow-Credentials": true,
							"Authorization": 'Bearer ' + token,
							"Content-Type": "application/json"
						}
					});
					const data = await res.json();
					if (!res.ok) throw new Error("Invalid credentials");

					return data;
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},

			getModuleInfo: async (course_id) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + `/api/module/${course_id}`)
					const data = await res.json()
					if (!res.ok) throw new Error
					setStore({ lessons: data[0].lessons })
				}
				catch (err) {
					console.log(err)
				}
			}

		}
	}
};

export default getState;
