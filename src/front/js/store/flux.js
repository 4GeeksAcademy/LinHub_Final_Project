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
			createNewUser: (userInfo) => {

				fetch("/api/users", {
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
					.catch(error => console.log("There was an error creating the user", error));
			},
			loginUser: (userInfo) => {

				fetch("/api/login", {
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
