const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentIdiom: "Español"
		},
		actions: {
			// Use getActions to call a function within a fuction
			changeLanguage: (lenguage) => {
				setStore({ currentIdiom: lenguage })
			}
		}
	};
};

export default getState;
