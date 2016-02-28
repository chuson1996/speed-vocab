import a from '../a.js';

class LocalStorageManagement {
	constructor() {
		_.assign(this, {
			save: (place, data) => {
				saveToLocalStorage(data);
				return (newData = data) => {
					saveToLocalStorage(newData);
				}

				function saveToLocalStorage (data) {
					let savedData;
					if (typeof data == "function") {
						savedData = data();
					} else {
						savedData = data;
					}
					localStorage.setItem(place, JSON.stringify(savedData));
				}
			},
			load: (place) => {
				if (!localStorage[place]) return {};
				return JSON.parse(localStorage[place]);
			}
		});
	}
}
a.Injectable().for(LocalStorageManagement);
export default {LocalStorageManagement};
