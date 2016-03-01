import a from '../a.js';
import {DisplayTermPipe} from '../term/display-term.pipe.js';
import {TermsLogic} from '../injectables/terms-logic.js';


class TermComponent {
	constructor(termsLogic) {
		_.assign(this, {
			termsLogic,
			// Public variables initialization
			editing: false
		});
	}
	updateTerm (wordInput, meaningInput) {
		// console.log(wordInput, meaningInput);
		this.termsLogic.updateTermById(this.term.get('id'), {
			word: wordInput.value, 
			meaning: meaningInput.value
		});
	}
	learnTerm () {
		this.termsLogic.updateTermById(this.term.get('id'), {
			point: this.term.get('point') + 1
		});
	}
	deleteTerm() {
		this.termsLogic.deleteTermByValue(this.term);
	}
	// //
	// ngOnChanges(changes) {
	// 	console.log('Term: ngOnChanges', changes)
	// }
	// ngOnInit() {
	// 	console.log('Term: ngOnInit');
	// }
	// ngOnDestroy() {
	// 	console.log('Term: ngOnDestroy');
	// }
}
TermComponent.parameters = [
	new ng.core.Inject(TermsLogic)
];
a.Component({
	selector: 'term',
	pipes: [DisplayTermPipe],
	templateUrl: 'app/term.tmpl',
	inputs: ['term'],
	// changeDetection: ng.core.ChangeDetectionStrategy.OnPush
}).for(TermComponent);

export default {TermComponent}
