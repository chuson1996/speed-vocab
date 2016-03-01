import a from '../a.js';

class GeneralizeFolderPipe {
	transform(value, args) {
		return value.reduce((pre, val) => {
			return `${pre} + ${val.word} `;
		}, '');
	}
}
a.Pipe({
	name: 'generalizeFolder'
}).for(GeneralizeFolderPipe);
export default {GeneralizeFolderPipe}