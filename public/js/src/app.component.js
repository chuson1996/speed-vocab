import a from 'a';

// Folder
import { LengthPipe } from './folder/length.pipe.js';
import { ContainsPipe } from './folder/contains.pipe.js';
import { FolderComponent } from './folder/folder.component.js';
import { GeneralizeFolderPipe } from './folder/generalize-folder.pipe.js';

// Term
import { DisplayTermPipe } from './term/display-term.pipe.js';
import { TermComponent } from './term/term.component.js';

// Study
import { StudyComponent } from './study/study.component.js';


// Global Injectables
import { LocalStorageManagement } from './injectables/local-storage-management.js';
import { TermsLogic } from './injectables/terms-logic.js';
import { TermsLogicMock } from './injectables/terms-logic-mock.js';

// Directives
import { FloatingSpan } from './directives/floating-span.js';
import { TagsInput } from './directives/tags-input.js';

// Global Factories
import { getTextBoundingRect } from './factories/get-text-bounding-rect.js';
import { studyScheme } from './factories/study-scheme.js';


class AppComponent {

}
AppComponent.parameters = [
	new ng.core.Inject(LocalStorageManagement),
	new ng.core.Inject(TermsLogic),
];
a
	.RouteConfig([
		{ path: '/folder', name: 'Folder', component: FolderComponent, useAsDefault: true },
		{ path: '/study', name: 'Study', component: StudyComponent }
	])
	.Component({
		templateUrl: 'app/app.tmpl',
		selector: 'app',
		providers: [
			LocalStorageManagement,
			ng.core.provide(TermsLogic, { useClass: TermsLogic }),
			ng.core.ElementRef,
			ng.core.provide('getTextBoundingRect', { useFactory: () => getTextBoundingRect }),
			ng.router.ROUTER_PROVIDERS,
			ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.HashLocationStrategy }),
			ng.core.provide('studyScheme', { useFactory: studyScheme }),
			TagsInput,
			ng.http.HTTP_PROVIDERS
		],
		directives: [ng.router.RouterOutlet, ng.router.RouterLink],

	})
	.for(AppComponent);


ng.platform.browser.bootstrap(AppComponent);
