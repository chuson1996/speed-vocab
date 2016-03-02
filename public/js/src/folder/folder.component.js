import a from 'a';

import { LocalStorageManagement } from '../injectables/local-storage-management.js';
import { TermsLogic } from '../injectables/terms-logic.js';
import { DisplayTermPipe } from '../term/display-term.pipe.js';
import { LengthPipe } from '../folder/length.pipe.js';
import { ContainsPipe } from '../folder/contains.pipe.js';
import { GeneralizeFolderPipe } from '../folder/generalize-folder.pipe.js';
import { TermComponent } from '../term/term.component.js';
import { FloatingSpan } from '../directives/floating-span.js';
import { TagsInput } from '../directives/tags-input.js';
import { StudyComponent } from '../study/study.component.js';
import { SearchByTagPipe } from '../folder/search-by-tag.pipe.js';

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


		// Deprecated
		this.terms = this.termsLogic.terms;
		
		this.immTerms = this.termsLogic._terms;
		this.termsLogic.termsChanged.subscribe((newTerms) => {
			this.terms = this.termsLogic.terms;
			this.immTerms = this.termsLogic._terms;
		});
	}
	submit(ngForm) {
		let {word, meaning, tags} = ngForm.value;
		this.termsLogic.addTerm({
			word, meaning, tags,
			point: 0
		});

		this.clearForm(ngForm);
	}
	log (text) {
		console.log(text);
	}
	clearForm (ngForm) {
		console.log(ngForm);
		let controls = ngForm.controls;
		for (let field of _.keys(controls)) {
			controls[field].updateValue('');
		}
	}
}
FolderComponent.parameters = [
	new ng.core.Inject(LocalStorageManagement),
	new ng.core.Inject(TermsLogic),
];
a.Component({
	templateUrl: '/app/folder.tmpl',
	pipes: [LengthPipe, DisplayTermPipe, ContainsPipe, GeneralizeFolderPipe,
		SearchByTagPipe],
	directives: [TermComponent, FloatingSpan, StudyComponent, TagsInput],
}).for(FolderComponent);

export default {FolderComponent};

