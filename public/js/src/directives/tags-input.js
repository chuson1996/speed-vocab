import a from 'a';

class TagsInput {
	constructor(elementRef) {
		_.assign(this, {
			elementRef
		})

		this.onTagChanged = new ng.core.EventEmitter();
		this.onTagAdded = new ng.core.EventEmitter();
		this.onTagRemoved = new ng.core.EventEmitter();

		this.elem = this.elementRef.nativeElement;
	}
	ngAfterViewInit() {
		console.log('ngAfterViewInit');
		this.integrateNgForm();
	}
	integrateNgForm () {
		setTimeout(() => {
			this.tagsInputControlName.control.valueChanges.subscribe((value) => {
				$(this.elem).importTags(value);
			});
		});

		
		let onChange = (() => {
			let oldVal;
			return () => {
				let newVal = $(this.elem).val();
				if (oldVal !== newVal) {
					oldVal = newVal;
					this.tagsInputControlName.control.updateValue(newVal, {emitEvent: false});
					this.onTagChanged.emit(newVal);
				}
			}
		})();
		$(this.elem).tagsInput({
			onAddTag: onChange,
			onRemoveTag: onChange,
			// onChange: () => {
			// },
			delimiter: ','
		});
	}
}
TagsInput.parameters = [
	new ng.core.Inject(ng.core.ElementRef)
];
a.Directive({
	selector: '[tags-input]',
	outputs: ['onTagChanged', 'onTagAdded', 'onTagRemoved'],
	inputs: ['tagsInputControlName: tags-input-control-name']
}).for(TagsInput);

export default { TagsInput };
