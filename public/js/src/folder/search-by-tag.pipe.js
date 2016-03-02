import a from 'a';

class SearchByTagPipe {
	transform(value, [keyTags]) {
		return value.filter( 
			(term) => _.every(
				keyTags.split(','), 
				(keyTag) => term.get('tags').includes(keyTag.trim())))
	}
}
a.Pipe({
	name: 'searchByTag'
}).for(SearchByTagPipe);
export default { SearchByTagPipe };
