import a from '../a.js';
import {DisplayTermPipe} from '../term/display-term-pipe.js';
import {TermsLogic} from '../injectors/terms-logic.js';


class TermComponent {
	constructor(termsLogic) {
		_.assign(this, {
			termsLogic
		});
	}
	updateTerm (wordInput, meaningInput) {
		// console.log(wordInput.value, meaningInput.value);
		this.termsLogic.updateTermByValue(this.term, {
			word: wordInput.value, 
			meaning: meaningInput.value
		});
		// this.termChange.emit(this.term);
	}
	learnTerm () {
		// this.term = {...this.term, point: this.term.point + 1};
		this.termsLogic.updateTermByValue(this.term, {
			point: this.term.get('point') + 1
		});
		// this.termChange.emit(this.term);
	}
	deleteTerm() {
		this.termsLogic.deleteTermByValue(this.term);
	}
	//
	ngOnChanges(changes) {
		console.log(changes)
	}
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
