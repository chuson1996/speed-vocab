import a from 'a';

class TagsInput {
	constructor(elementRef) {
		_.assign(this, {
			elementRef
		})

		this.onChange = new ng.core.EventEmitter();
		this.onTagAdded = new ng.core.EventEmitter();
		this.onTagRemoved = new ng.core.EventEmitter();

		this.elem = this.elementRef.nativeElement;
		console.log(this.elem);
	}
	ngAfterViewInit() {
		console.log('ngAfterViewInit');
		$(this.elem).tagsInput({
			onAddTag: (event) => this.onTagAdded.emit(event),
			onTagRemoved: (event) => this.onTagRemoved.emit(event),
			onChange: (event) => this.onChange.emit(event),
			delimiter: ','
		});
	}
}
TagsInput.parameters = [
	new ng.core.Inject(ng.core.ElementRef)
];
a.Directive({
	selector: '[tags-input]',
	outputs: ['onChange', 'onTagAdded', 'onTagRemoved']
}).for(TagsInput);

export default { TagsInput };
