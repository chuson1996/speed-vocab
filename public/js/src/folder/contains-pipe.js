import a from '../a.js';

class ContainsPipe {
	transform (value, args) {
		return value.filter((term) => {
			return term.word.includes(args[0]);
		});
	}
}

a.Pipe({
	name: 'contains',
	// pure: false
}).for(ContainsPipe);
export default {ContainsPipe};
