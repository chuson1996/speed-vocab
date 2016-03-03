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
			// Add tag
			if (!previousValue
				|| currentValue.split(',').length > previousValue.split(',').length) {
				this.http.get(`http://localhost:8080/api/crawle-google-image/${_.last(currentValue.split(','))}`)
					.map((data) => data.json())
					.map((images) => {
						return {
							images,
							index: 0
						};
					})
					.subscribe((imageGroup) => {
						this.imageGroups.push(imageGroup);
					});
			} else {
				// Remove tag
				this.imageGroups = _.dropRight(this.imageGroups);
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
