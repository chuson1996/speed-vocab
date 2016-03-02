import a from '../a.js';

class DisplayTermPipe {
	transform (val, args) {
		// return `${val.word} is ${val.meaning}. Point: ${val.point}`;
		
		// Immutable.js
		return `${val.get('word')} is ${val.get('meaning')}. Point: ${val.get('point')}. Tags: ${val.get('tags')}`;
	}
}
a.Pipe({
	name: 'displayTerm'
}).for(DisplayTermPipe);
export default {DisplayTermPipe};