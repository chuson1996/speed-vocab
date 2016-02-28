import a from 'a';


class FloatingSpan {
	constructor(elementRef, getTextBoundingRect) {
		_.assign(this, {
			getTextBoundingRect
		});
		this.elem = elementRef.nativeElement;
		let $floatingSpanContainer;
		if ($(this.elem).parent().children().length > 1) {
			$(this.elem).wrap(`<div></div>`);
		}
		$floatingSpanContainer = $(this.elem).parent();
		$floatingSpanContainer.addClass('floating-span-container');

		this.$floatingSpanElem = $(`<span class="floating-span">${$(this.elem).attr('floating-span')}</span>`);
		if ($(this.elem).attr('floating-span-class')) {
			this.$floatingSpanElem.addClass($(this.elem).attr('floating-span-class'));
		}
		$(this.elem).before(this.$floatingSpanElem);

		this.moveFloatingSpan();
	}
	moveFloatingSpan() {
		let marginLeft = this.getTextBoundingRect(this.elem, 0, this.elem.value.length).width;
		this.$floatingSpanElem.css('margin-left', marginLeft);
		if (!this.elem.value) {
			this.$floatingSpanElem.addClass('hide');
		} else {
			this.$floatingSpanElem.removeClass('hide');
		}
	}
}
FloatingSpan.parameters = [
	new ng.core.Inject(ng.core.ElementRef),
	new ng.core.Inject('getTextBoundingRect')
];
a.Directive({
	selector: '[floating-span]',
	host: {
		'role': 'input',
		'(input)': 'moveFloatingSpan()'
	},
	properties: ['floatingSpanClass: floating-span-class']
}).for(FloatingSpan);
export default {FloatingSpan};
