import a from 'a';

import { LocalStorageManagement } from '../injectors/local-storage-management.js';
import { TermsLogic } from '../injectors/terms-logic.js';
import { DisplayTermPipe } from '../term/display-term-pipe.js';
import { LengthPipe } from '../folder/length-pipe.js';
import { ContainsPipe } from '../folder/contains-pipe.js';
import { GeneralizeFolderPipe } from '../folder/generalize-folder-pipe.js';
import { TermComponent } from '../term/term.component.js';
import { FloatingSpan } from '../directives/floating-span.js';

class FolderComponent {
	constructor(localStorageManagement, termsLogic) {
		{
			let injector = ng.core.Injector.resolveAndCreate([
				ng.core.provide(LocalStorageManagement, { useClass: LocalStorageManagement }),
				ng.core.provide('OtherLocalStorageManagement', { useExisting: LocalStorageManagement }),
				ng.core.provide(String, { useValue: 'Hi from babel to Angular 2' })
			]);
			// console.log(injector.get(LocalStorageManagement) == injector.get('OtherLocalStorageManagement'));
			console.log(injector.get(String))
		}


		_.assign(this, {
			localStorageManagement,
			termsLogic
		});


		this.terms = this.termsLogic.terms;
		this.immTerms = this.termsLogic._terms;
		this.termsLogic.termsChanged.subscribe((newTerms) => {
			this.terms = this.termsLogic.terms;
			this.immTerms = this.termsLogic._terms;
		});
	}
	clearForm(newTermForm) {
		newTermForm.reset();
	}
	submit($event) {
		$event.preventDefault();
		let newTermForm = $event.target;
		this.termsLogic.addTerm({
			word: newTermForm.word.value,
			meaning: newTermForm.meaning.value,
			point: 0
		});

		this.clearForm(newTermForm);
	}
}
FolderComponent.parameters = [
	new ng.core.Inject(LocalStorageManagement),
	new ng.core.Inject(TermsLogic),
];
a.Component({
	templateUrl: '/app/folder.tmpl',
	pipes: [LengthPipe, DisplayTermPipe, ContainsPipe, GeneralizeFolderPipe],
	directives: [TermComponent, FloatingSpan],
}).for(FolderComponent);

export default {FolderComponent};

