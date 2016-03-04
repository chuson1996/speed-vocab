import a from 'a';

class ImageTag {
	constructor(http) {
		_.assign(this, {
			http
		});
		this.imageGroups = [];
	}
	ngOnChanges(changes) {
		if (this.tags) {
			let { currentValue, previousValue } = changes.tags;
			let currentValueArr = currentValue.split(',');
			let previousValueArr = !!previousValue ? previousValue.split(',') : [];
			// Add tag
			if (!previousValue
				|| currentValueArr.length > previousValueArr.length) {
				let newTag = _.last(currentValue.split(','));
				this.http.get(`http://localhost:8080/api/crawle-google-image/${newTag}`)
					.map((data) => data.json())
					.map((images) => {
						return {
							images,
							index: 0,
							tag: newTag
						};
					})
					.subscribe((imageGroup) => {
						this.imageGroups.push(imageGroup);
					});
			} else {
				// Remove tag
				const toRemoveTag = _.difference(previousValueArr, currentValueArr)[0];
				_.remove(this.imageGroups, (imageGroup) => imageGroup.tag == toRemoveTag);
			}
		} else {
			this.imageGroups = [];
		}
	}
	nextImage (imageGroup) {
		imageGroup.index = (imageGroup.index + 1) % imageGroup.images.length;
	}
}
ImageTag.parameters = [
	new ng.core.Inject(ng.http.Http)
];
a.Component({
	selector: 'image-tag',
	inputs: ['tags'],
	templateUrl: '/app/image-tag.tmpl'
}).for(ImageTag);
export default { ImageTag };
