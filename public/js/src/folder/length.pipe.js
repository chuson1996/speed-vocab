import a from '../a.js';

class LengthPipe {
	transform(value, args) {
		return value.size || value.length;
	}
}
a.Pipe({
	name: 'length'
}).for(LengthPipe);
export default {LengthPipe}