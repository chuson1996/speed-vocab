import a from 'a';

import { TermsLogic } from '../injectables/terms-logic.js';

class StudyComponent {
	constructor(termsLogic, studyScheme) {
		
		_.assign(this, {
			termsLogic,
			studyScheme,
			// Local properties
			showCorrectAnswer: false
		});

		this.studyLogic = this.studyScheme(this.termsLogic._terms.toJSON());
		this.currentTerm = this.studyLogic.currentTerm;


		this.studyLogic.learnTermEvent.subscribe((term) => {
			this.termsLogic.updateTermById(term.id, {
				point: term.point + 1
			})
		});

	}
	// ngOnInit() {
	// }
	onSubmit ($event) {
		$event.preventDefault();


		if (this.showCorrectAnswer) {
			this.showCorrectAnswer = false;
			this.studyLogic.next();
			this.currentTerm = this.studyLogic.currentTerm;
		} else {
			let result = this.studyLogic.checkAndUpdate({
				id: this.currentTerm.id, 
				field: 'meaning', 
				answer: $event.target.answer.value
			});
			console.log('result: ', result);
			this.showCorrectAnswer = true;
		}
		$event.target.reset();
		console.log(this.studyLogic.currentTermIndex, this.studyLogic.currentGroupIndex);

	}
	reset () {
		this.studyLogic.reset();
		this.currentTerm = this.studyLogic.currentTerm;
	}
}
StudyComponent.parameters = [
	new ng.core.Inject(TermsLogic),
	new ng.core.Inject('studyScheme')
];
a.Component({
	selector: 'study',
	templateUrl: '/app/study'
}).for(StudyComponent);
export default { StudyComponent }
