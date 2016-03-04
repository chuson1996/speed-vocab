import a from 'a';

class ImageTag {
	constructor(http, ngControl) {
		_.assign(this, {
			http
		});
		ngControl.valueAccessor = this;

		this.imageGroups = [];

		this.onChange = () => {};
		this.onTouched = () => {};
		this.selectedImagesControl = new ng.common.Control();
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
						this.selectedImagesControl.updateValue(this.getSelectedImages());
					});
			} else {
				// Remove tag
				const toRemoveTag = _.difference(previousValueArr, currentValueArr)[0];
				_.remove(this.imageGroups, (imageGroup) => imageGroup.tag == toRemoveTag);
				this.selectedImagesControl.updateValue(this.getSelectedImages());
			}
		} else {
			this.imageGroups = [];
			this.selectedImagesControl.updateValue([]);
		}

	}

	getSelectedImages () {
		return _.map(this.imageGroups, (imageGroup) => {
			return imageGroup.images[imageGroup.index];
		});
	}

	nextImage (imageGroup) {
		imageGroup.index = (imageGroup.index + 1) % imageGroup.images.length;
	}

	ngOnInit () {
		this.selectedImagesControl.valueChanges.subscribe((value) => {
			// console.log('value: ', value);
			this.onChange(value);
		})
	}
	registerOnChange (fn) {
		this.onChange = fn;
	}
	registerOnTouched (fn) {
		this.onTouched = fn;
	}
	writeValue (modelValue) {
		// Default value goes here
	}
}
ImageTag.parameters = [
	new ng.core.Inject(ng.http.Http),
	new ng.core.Inject(ng.common.NgControl)
];
a.Component({
	selector: 'image-tag',
	inputs: ['tags'],
	templateUrl: '/app/image-tag.tmpl'
}).for(ImageTag);
export default { ImageTag };
