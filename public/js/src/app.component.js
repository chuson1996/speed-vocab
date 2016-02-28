import a from 'a';

// Folder
import { LengthPipe } from './folder/length-pipe.js';
import { ContainsPipe } from './folder/contains-pipe.js';
import { FolderComponent } from './folder/folder.component.js';
import { GeneralizeFolderPipe } from './folder/generalize-folder-pipe.js';

// Term
import { DisplayTermPipe } from './term/display-term-pipe.js';
import { TermComponent } from './term/term.component.js';

// Global Injectables
import { LocalStorageManagement } from './injectors/local-storage-management.js';
import { TermsLogic } from './injectors/terms-logic.js';
import { TermsLogicMock } from './injectors/terms-logic-mock.js';

// Directives
import { FloatingSpan } from './directives/floating-span.js';

// Global Factories
import { getTextBoundingRect } from './factories/get-text-bounding-rect.js';


class AppComponent {
	
}
AppComponent.parameters = [
	new ng.core.Inject(LocalStorageManagement),
	new ng.core.Inject(TermsLogic),
];
a
	.RouteConfig([
		{ path: '/folder', name: 'Folder', component:  FolderComponent, useAsDefault: true},
		// { path: '/study', name: 'Study' }
	])
	.Component({
		templateUrl: 'app/first-try.tmpl',
		selector: 'first-try',
		providers: [
			LocalStorageManagement,
			ng.core.provide(TermsLogic, { useClass: TermsLogic }),
			ng.core.ElementRef,
			ng.core.provide('getTextBoundingRect', { useFactory: () => getTextBoundingRect }),
			ng.router.ROUTER_PROVIDERS,
			ng.core.provide(ng.router.LocationStrategy, {useClass: ng.router.HashLocationStrategy})
		],
		directives: [ng.router.RouterOutlet, ng.router.RouterLink],

	})
	.for(AppComponent);


ng.platform.browser.bootstrap(AppComponent);
