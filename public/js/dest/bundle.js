require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

// Folder

var _folderLengthPipeJs = require('./folder/length.pipe.js');

var _folderContainsPipeJs = require('./folder/contains.pipe.js');

var _folderFolderComponentJs = require('./folder/folder.component.js');

var _folderGeneralizeFolderPipeJs = require('./folder/generalize-folder.pipe.js');

// Term

var _termDisplayTermPipeJs = require('./term/display-term.pipe.js');

var _termTermComponentJs = require('./term/term.component.js');

// Study

var _studyStudyComponentJs = require('./study/study.component.js');

// Global Injectables

var _injectablesLocalStorageManagementJs = require('./injectables/local-storage-management.js');

var _injectablesTermsLogicJs = require('./injectables/terms-logic.js');

var _injectablesTermsLogicMockJs = require('./injectables/terms-logic-mock.js');

// Directives

var _directivesFloatingSpanJs = require('./directives/floating-span.js');

var _directivesTagsInputJs = require('./directives/tags-input.js');

// Global Factories

var _factoriesGetTextBoundingRectJs = require('./factories/get-text-bounding-rect.js');

var _factoriesStudySchemeJs = require('./factories/study-scheme.js');

var AppComponent = function AppComponent() {
	_classCallCheck(this, AppComponent);
};

AppComponent.parameters = [new ng.core.Inject(_injectablesLocalStorageManagementJs.LocalStorageManagement), new ng.core.Inject(_injectablesTermsLogicJs.TermsLogic)];
_a2['default'].RouteConfig([{ path: '/folder', name: 'Folder', component: _folderFolderComponentJs.FolderComponent, useAsDefault: true }, { path: '/study', name: 'Study', component: _studyStudyComponentJs.StudyComponent }]).Component({
	templateUrl: 'app/app.tmpl',
	selector: 'app',
	providers: [_injectablesLocalStorageManagementJs.LocalStorageManagement, ng.core.provide(_injectablesTermsLogicJs.TermsLogic, { useClass: _injectablesTermsLogicJs.TermsLogic }), ng.core.ElementRef, ng.core.provide('getTextBoundingRect', { useFactory: function useFactory() {
			return _factoriesGetTextBoundingRectJs.getTextBoundingRect;
		} }), ng.router.ROUTER_PROVIDERS, ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.HashLocationStrategy }), ng.core.provide('studyScheme', { useFactory: _factoriesStudySchemeJs.studyScheme }), _directivesTagsInputJs.TagsInput],
	directives: [ng.router.RouterOutlet, ng.router.RouterLink]

})['for'](AppComponent);

ng.platform.browser.bootstrap(AppComponent);

},{"./directives/floating-span.js":2,"./directives/tags-input.js":3,"./factories/get-text-bounding-rect.js":4,"./factories/study-scheme.js":5,"./folder/contains.pipe.js":6,"./folder/folder.component.js":7,"./folder/generalize-folder.pipe.js":8,"./folder/length.pipe.js":9,"./injectables/local-storage-management.js":11,"./injectables/terms-logic-mock.js":12,"./injectables/terms-logic.js":13,"./study/study.component.js":14,"./term/display-term.pipe.js":15,"./term/term.component.js":16,"a":"a"}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var FloatingSpan = (function () {
	function FloatingSpan(elementRef, getTextBoundingRect) {
		_classCallCheck(this, FloatingSpan);

		_.assign(this, {
			getTextBoundingRect: getTextBoundingRect
		});
		this.elem = elementRef.nativeElement;
		var $floatingSpanContainer = undefined;
		if ($(this.elem).parent().children().length > 1) {
			$(this.elem).wrap('<div></div>');
		}
		$floatingSpanContainer = $(this.elem).parent();
		$floatingSpanContainer.addClass('floating-span-container');

		this.$floatingSpanElem = $('<span class="floating-span">' + $(this.elem).attr('floating-span') + '</span>');
		if ($(this.elem).attr('floating-span-class')) {
			this.$floatingSpanElem.addClass($(this.elem).attr('floating-span-class'));
		}
		$(this.elem).before(this.$floatingSpanElem);

		this.moveFloatingSpan();
	}

	FloatingSpan.prototype.moveFloatingSpan = function moveFloatingSpan() {
		var marginLeft = this.getTextBoundingRect(this.elem, 0, this.elem.value.length).width;
		this.$floatingSpanElem.css('margin-left', marginLeft);
		if (!this.elem.value) {
			this.$floatingSpanElem.addClass('hide');
		} else {
			this.$floatingSpanElem.removeClass('hide');
		}
	};

	return FloatingSpan;
})();

FloatingSpan.parameters = [new ng.core.Inject(ng.core.ElementRef), new ng.core.Inject('getTextBoundingRect')];
_a2['default'].Directive({
	selector: '[floating-span]',
	host: {
		'role': 'input',
		'(input)': 'moveFloatingSpan()'
	},
	properties: ['floatingSpanClass: floating-span-class']
})['for'](FloatingSpan);
exports['default'] = { FloatingSpan: FloatingSpan };
module.exports = exports['default'];

},{"a":"a"}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var TagsInput = (function () {
	function TagsInput(elementRef) {
		_classCallCheck(this, TagsInput);

		_.assign(this, {
			elementRef: elementRef
		});

		this.onTagChanged = new ng.core.EventEmitter();
		this.onTagAdded = new ng.core.EventEmitter();
		this.onTagRemoved = new ng.core.EventEmitter();

		this.elem = this.elementRef.nativeElement;
	}

	TagsInput.prototype.ngAfterViewInit = function ngAfterViewInit() {
		console.log('ngAfterViewInit');
		this.integrateNgForm();
	};

	TagsInput.prototype.integrateNgForm = function integrateNgForm() {
		var _this = this;

		setTimeout(function () {
			_this.tagsInputControlName.control.valueChanges.subscribe(function (value) {
				$(_this.elem).importTags(value);
			});
		});

		var onChange = (function () {
			var oldVal = undefined;
			return function () {
				var newVal = $(_this.elem).val();
				if (oldVal !== newVal) {
					oldVal = newVal;
					_this.tagsInputControlName.control.updateValue(newVal, { emitEvent: false });
					_this.onTagChanged.emit(newVal);
				}
			};
		})();
		$(this.elem).tagsInput({
			onAddTag: onChange,
			onRemoveTag: onChange,
			// onChange: () => {
			// },
			delimiter: ','
		});
	};

	return TagsInput;
})();

TagsInput.parameters = [new ng.core.Inject(ng.core.ElementRef)];
_a2['default'].Directive({
	selector: '[tags-input]',
	outputs: ['onTagChanged', 'onTagAdded', 'onTagRemoved'],
	inputs: ['tagsInputControlName: tags-input-control-name']
})['for'](TagsInput);

exports['default'] = { TagsInput: TagsInput };
module.exports = exports['default'];

},{"a":"a"}],4:[function(require,module,exports){
// Solution from http://stackoverflow.com/questions/6930578/get-cursor-or-text-position-in-pixels-for-input-element
"use strict";

exports.__esModule = true;
exports.getTextBoundingRect = getTextBoundingRect;

function getTextBoundingRect(input, selectionStart, selectionEnd, debug) {
	// Basic parameter validation
	if (!input || !('value' in input)) return input;
	if (typeof selectionStart == "string") selectionStart = parseFloat(selectionStart);
	if (typeof selectionStart != "number" || isNaN(selectionStart)) {
		selectionStart = 0;
	}
	if (selectionStart < 0) selectionStart = 0;else selectionStart = Math.min(input.value.length, selectionStart);
	if (typeof selectionEnd == "string") selectionEnd = parseFloat(selectionEnd);
	if (typeof selectionEnd != "number" || isNaN(selectionEnd) || selectionEnd < selectionStart) {
		selectionEnd = selectionStart;
	}
	if (selectionEnd < 0) selectionEnd = 0;else selectionEnd = Math.min(input.value.length, selectionEnd);

	// If available (thus IE), use the createTextRange method
	if (typeof input.createTextRange == "function") {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveStart('character', selectionStart);
		range.moveEnd('character', selectionEnd - selectionStart);
		return range.getBoundingClientRect();
	}
	// createTextRange is not supported, create a fake text range
	var offset = getInputOffset(),
	    topPos = offset.top,
	    leftPos = offset.left,
	    width = getInputCSS('width', true),
	    height = getInputCSS('height', true);

	// Styles to simulate a node in an input field
	var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
	    listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];

	topPos += getInputCSS('padding-top', true);
	topPos += getInputCSS('border-top-width', true);
	leftPos += getInputCSS('padding-left', true);
	leftPos += getInputCSS('border-left-width', true);
	leftPos += 1; //Seems to be necessary

	for (var i = 0; i < listOfModifiers.length; i++) {
		var property = listOfModifiers[i];
		cssDefaultStyles += property + ':' + getInputCSS(property) + ';';
	}
	// End of CSS variable checks

	var text = input.value,
	    textLen = text.length,
	    fakeClone = document.createElement("div");
	if (selectionStart > 0) appendPart(0, selectionStart);
	var fakeRange = appendPart(selectionStart, selectionEnd);
	if (textLen > selectionEnd) appendPart(selectionEnd, textLen);

	// Styles to inherit the font styles of the element
	fakeClone.style.cssText = cssDefaultStyles;

	// Styles to position the text node at the desired position
	fakeClone.style.position = "absolute";
	fakeClone.style.top = topPos + "px";
	fakeClone.style.left = leftPos + "px";
	fakeClone.style.width = width + "px";
	fakeClone.style.height = height + "px";
	document.body.appendChild(fakeClone);
	var returnValue = fakeRange.getBoundingClientRect(); //Get rect

	if (!debug) fakeClone.parentNode.removeChild(fakeClone); //Remove temp
	return returnValue;

	// Local functions for readability of the previous code
	function appendPart(start, end) {
		var span = document.createElement("span");
		span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
		span.textContent = text.substring(start, end);
		fakeClone.appendChild(span);
		return span;
	}
	// Computing offset position
	function getInputOffset() {
		var body = document.body,
		    win = document.defaultView,
		    docElem = document.documentElement,
		    box = document.createElement('div');
		box.style.paddingLeft = box.style.width = "1px";
		body.appendChild(box);
		var isBoxModel = box.offsetWidth == 2;
		body.removeChild(box);
		box = input.getBoundingClientRect();
		var clientTop = docElem.clientTop || body.clientTop || 0,
		    clientLeft = docElem.clientLeft || body.clientLeft || 0,
		    scrollTop = win.pageYOffset || isBoxModel && docElem.scrollTop || body.scrollTop,
		    scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
		return {
			top: box.top + scrollTop - clientTop,
			left: box.left + scrollLeft - clientLeft };
	}
	function getInputCSS(prop, isnumber) {
		var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
		return isnumber ? parseFloat(val) : val;
	}
}

},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.studyScheme = studyScheme;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var StudyScheme = (function () {
	function StudyScheme(terms) {
		_classCallCheck(this, StudyScheme);

		this.terms = terms; // Mutable object / JSON object

		this.learnTermEvent = new ng.core.EventEmitter();
		this.completeEvent = new ng.core.EventEmitter();

		this.reset();
	}

	StudyScheme.prototype.divideTermsIntoGroups = function divideTermsIntoGroups(terms) {
		return _.chunk(_.shuffle(terms), 7);
	};

	StudyScheme.prototype.next = function next() {
		if (!this.active) throw new Error('StudyLogic is not active at the moment');

		if (this.groups[this.currentGroupIndex] && this.currentTermIndex < this.groups[this.currentGroupIndex].length) {
			this.currentTermIndex++;
			if (this.groups[this.currentGroupIndex][this.currentTermIndex] && this.groups[this.currentGroupIndex][this.currentTermIndex].pass) {
				return this.next();
			}
		} else {
			if (this.currentGroupIndex < this.groups.length) {
				// Check if some terms in this group are still not passed. If there're, study them.
				if (_.some(this.groups[this.currentGroupIndex], function (term) {
					return !term.pass;
				})) {
					console.log('There\'re some terms in this group are still not passed, study them.');
					this.currentTermIndex = _.findIndex(this.groups[this.currentGroupIndex], function (term) {
						return !term.pass;
					});
				} else {
					console.log('Next group');
					this.currentTermIndex = 0;
					this.currentGroupIndex++;
				}
			} else {
				return this.complete();
			}
		}

		if (this.currentGroupIndex == this.groups.length || this.currentTermIndex == this.groups[this.currentGroupIndex].length) {
			this.next();
		}
	};

	StudyScheme.prototype.complete = function complete() {
		console.log('Complete');
		this.completeEvent.emit(null);
		this.active = false;
	};

	StudyScheme.prototype.check = function check(_ref2) {
		var id = _ref2.id;
		var field = _ref2.field;
		var answer = _ref2.answer;

		var term = _.find(this.terms, { id: id });
		console.log(term[field].toLowerCase(), answer.toLowerCase());
		return term[field].toLowerCase() == answer.toLowerCase();
	};

	StudyScheme.prototype.checkAndUpdate = function checkAndUpdate(_ref3) {
		var id = _ref3.id;
		var field = _ref3.field;
		var answer = _ref3.answer;

		var result = this.check({ id: id, field: field, answer: answer });
		if (result) {
			var currentTerm = _.find(this.terms, { id: id });
			this.learnTermEvent.emit(currentTerm);
			currentTerm.pass = true;
		}
		return result;
	};

	StudyScheme.prototype.checkAndReact = function checkAndReact(_ref4) {
		var id = _ref4.id;
		var field = _ref4.field;
		var answer = _ref4.answer;
		var goToNext = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		if (this.check({ id: id, field: field, answer: answer })) {
			var currentTerm = _.find(this.terms, { id: id });
			this.learnTermEvent.emit(currentTerm);
			currentTerm.pass = true;
		}
		if (goToNext) this.next();
	};

	StudyScheme.prototype.reset = function reset() {
		this.active = true;
		this.groups = this.divideTermsIntoGroups(this.terms);
		for (var _iterator = this.terms, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var term = _ref;

			_.assign(term, { pass: false });
		}
		this.currentGroupIndex = 0;
		this.currentTermIndex = 0;
	};

	_createClass(StudyScheme, [{
		key: 'currentTerm',
		get: function get() {
			return _.get(this.groups, '[' + this.currentGroupIndex + '][' + this.currentTermIndex + ']') || {};
		}
	}]);

	return StudyScheme;
})();

function studyScheme() {
	return function (terms) {
		return new StudyScheme(terms);
	};
}

},{"a":"a"}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var ContainsPipe = (function () {
	function ContainsPipe() {
		_classCallCheck(this, ContainsPipe);
	}

	ContainsPipe.prototype.transform = function transform(value, args) {
		return value.filter(function (term) {
			// return term.word.includes(args[0]);
			return term.get('word').includes(args[0]);
		});
	};

	return ContainsPipe;
})();

_a2['default'].Pipe({
	name: 'contains'
})['for'](ContainsPipe);
exports['default'] = { ContainsPipe: ContainsPipe };
module.exports = exports['default'];
// pure: false

},{"a":"a"}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var _injectablesLocalStorageManagementJs = require('../injectables/local-storage-management.js');

var _injectablesTermsLogicJs = require('../injectables/terms-logic.js');

var _termDisplayTermPipeJs = require('../term/display-term.pipe.js');

var _folderLengthPipeJs = require('../folder/length.pipe.js');

var _folderContainsPipeJs = require('../folder/contains.pipe.js');

var _folderGeneralizeFolderPipeJs = require('../folder/generalize-folder.pipe.js');

var _termTermComponentJs = require('../term/term.component.js');

var _directivesFloatingSpanJs = require('../directives/floating-span.js');

var _directivesTagsInputJs = require('../directives/tags-input.js');

var _studyStudyComponentJs = require('../study/study.component.js');

var _folderSearchByTagPipeJs = require('../folder/search-by-tag.pipe.js');

var FolderComponent = (function () {
	function FolderComponent(localStorageManagement, termsLogic) {
		var _this = this;

		_classCallCheck(this, FolderComponent);

		{
			var injector = ng.core.Injector.resolveAndCreate([ng.core.provide(_injectablesLocalStorageManagementJs.LocalStorageManagement, { useClass: _injectablesLocalStorageManagementJs.LocalStorageManagement }), ng.core.provide('OtherLocalStorageManagement', { useExisting: _injectablesLocalStorageManagementJs.LocalStorageManagement }), ng.core.provide(String, { useValue: 'Hi from babel to Angular 2' })]);
			// console.log(injector.get(LocalStorageManagement) == injector.get('OtherLocalStorageManagement'));
			console.log(injector.get(String));
		}

		_.assign(this, {
			localStorageManagement: localStorageManagement,
			termsLogic: termsLogic
		});

		// Deprecated
		this.terms = this.termsLogic.terms;

		this.immTerms = this.termsLogic._terms;
		this.termsLogic.termsChanged.subscribe(function (newTerms) {
			_this.terms = _this.termsLogic.terms;
			_this.immTerms = _this.termsLogic._terms;
		});
	}

	FolderComponent.prototype.submit = function submit(ngForm) {
		var _ngForm$value = ngForm.value;
		var word = _ngForm$value.word;
		var meaning = _ngForm$value.meaning;
		var tags = _ngForm$value.tags;

		this.termsLogic.addTerm({
			word: word, meaning: meaning, tags: tags,
			point: 0
		});

		this.clearForm(ngForm);
	};

	FolderComponent.prototype.log = function log(text) {
		console.log(text);
	};

	FolderComponent.prototype.clearForm = function clearForm(ngForm) {
		console.log(ngForm);
		var controls = ngForm.controls;
		for (var _iterator = _.keys(controls), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var field = _ref;

			controls[field].updateValue('');
		}
	};

	return FolderComponent;
})();

FolderComponent.parameters = [new ng.core.Inject(_injectablesLocalStorageManagementJs.LocalStorageManagement), new ng.core.Inject(_injectablesTermsLogicJs.TermsLogic)];
_a2['default'].Component({
	templateUrl: '/app/folder.tmpl',
	pipes: [_folderLengthPipeJs.LengthPipe, _termDisplayTermPipeJs.DisplayTermPipe, _folderContainsPipeJs.ContainsPipe, _folderGeneralizeFolderPipeJs.GeneralizeFolderPipe, _folderSearchByTagPipeJs.SearchByTagPipe],
	directives: [_termTermComponentJs.TermComponent, _directivesFloatingSpanJs.FloatingSpan, _studyStudyComponentJs.StudyComponent, _directivesTagsInputJs.TagsInput]
})['for'](FolderComponent);

exports['default'] = { FolderComponent: FolderComponent };
module.exports = exports['default'];

},{"../directives/floating-span.js":2,"../directives/tags-input.js":3,"../folder/contains.pipe.js":6,"../folder/generalize-folder.pipe.js":8,"../folder/length.pipe.js":9,"../folder/search-by-tag.pipe.js":10,"../injectables/local-storage-management.js":11,"../injectables/terms-logic.js":13,"../study/study.component.js":14,"../term/display-term.pipe.js":15,"../term/term.component.js":16,"a":"a"}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aJs = require('../a.js');

var _aJs2 = _interopRequireDefault(_aJs);

var GeneralizeFolderPipe = (function () {
	function GeneralizeFolderPipe() {
		_classCallCheck(this, GeneralizeFolderPipe);
	}

	GeneralizeFolderPipe.prototype.transform = function transform(value, args) {
		return value.reduce(function (pre, val) {
			return pre + ' + ' + val.word + ' ';
		}, '');
	};

	return GeneralizeFolderPipe;
})();

_aJs2['default'].Pipe({
	name: 'generalizeFolder'
})['for'](GeneralizeFolderPipe);
exports['default'] = { GeneralizeFolderPipe: GeneralizeFolderPipe };
module.exports = exports['default'];

},{"../a.js":"a"}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aJs = require('../a.js');

var _aJs2 = _interopRequireDefault(_aJs);

var LengthPipe = (function () {
	function LengthPipe() {
		_classCallCheck(this, LengthPipe);
	}

	LengthPipe.prototype.transform = function transform(value, args) {
		return value.size || value.length;
	};

	return LengthPipe;
})();

_aJs2['default'].Pipe({
	name: 'length'
})['for'](LengthPipe);
exports['default'] = { LengthPipe: LengthPipe };
module.exports = exports['default'];

},{"../a.js":"a"}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var SearchByTagPipe = (function () {
	function SearchByTagPipe() {
		_classCallCheck(this, SearchByTagPipe);
	}

	SearchByTagPipe.prototype.transform = function transform(value, _ref) {
		var keyTags = _ref[0];

		return value.filter(function (term) {
			return _.every(keyTags.split(','), function (keyTag) {
				return term.get('tags').includes(keyTag.trim());
			});
		});
	};

	return SearchByTagPipe;
})();

_a2['default'].Pipe({
	name: 'searchByTag'
})['for'](SearchByTagPipe);
exports['default'] = { SearchByTagPipe: SearchByTagPipe };
module.exports = exports['default'];

},{"a":"a"}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aJs = require('../a.js');

var _aJs2 = _interopRequireDefault(_aJs);

var LocalStorageManagement = function LocalStorageManagement() {
	_classCallCheck(this, LocalStorageManagement);

	_.assign(this, {
		save: function save(place, data) {
			saveToLocalStorage(data);
			return function () {
				var newData = arguments.length <= 0 || arguments[0] === undefined ? data : arguments[0];

				saveToLocalStorage(newData);
			};

			function saveToLocalStorage(data) {
				var savedData = undefined;
				if (typeof data == "function") {
					savedData = data();
				} else {
					savedData = data;
				}
				localStorage.setItem(place, JSON.stringify(savedData));
			}
		},
		load: function load(place) {
			if (!localStorage[place]) return {};
			return JSON.parse(localStorage[place]);
		}
	});
};

_aJs2["default"].Injectable()["for"](LocalStorageManagement);
exports["default"] = { LocalStorageManagement: LocalStorageManagement };
module.exports = exports["default"];

},{"../a.js":"a"}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var TermsLogicMock = (function () {
	function TermsLogicMock() {
		var _terms;

		_classCallCheck(this, TermsLogicMock);

		this.termsChanged = new ng.core.EventEmitter();

		this._terms = [];

		// let oldData = this.localStorageManagement.load('terms');
		var oldData = [{
			word: 'Mock word',
			meaning: 'Mock meaning',
			point: -1
		}];
		if (!oldData.length) oldData = [];
		console.log(oldData);
		(_terms = this._terms).push.apply(_terms, oldData);
		this._terms = Immutable.fromJS(this._terms);
		// this.termsLSUpdater = this.localStorageManagement.save('terms', () => this._terms.toJS());
		this.termsLSUpdater = function () {
			console.log('Update to localStorage');
		};
	}

	TermsLogicMock.prototype.addTerm = function addTerm(newTerm) {
		this._terms = this._terms.push(Immutable.fromJS(newTerm));
		this.onTermsChange();
	};

	TermsLogicMock.prototype.updateTermByValue = function updateTermByValue(term, mergeValue) {
		var _terms$findEntry = this._terms.findEntry(function (value, key) {
			return Immutable.is(Immutable.fromJS(term), value);
		});

		var index = _terms$findEntry[0];

		if (index < 0) throw new Error('Index out of bound.');
		this.updateTermByIndex(index, mergeValue);
	};

	TermsLogicMock.prototype.updateTermByIndex = function updateTermByIndex(index, mergeValue) {
		this._terms = this._terms.mergeIn([index], mergeValue);
		this.onTermsChange();
	};

	TermsLogicMock.prototype.deleteTermByValue = function deleteTermByValue(term) {
		var _terms$findEntry2 = this._terms.findEntry(function (value, key) {
			return Immutable.is(Immutable.fromJS(term), value);
		});

		var index = _terms$findEntry2[0];

		this.deleteTermByIndex(index);
	};

	TermsLogicMock.prototype.deleteTermByIndex = function deleteTermByIndex(index) {
		this._terms = this._terms['delete'](index);
		this.onTermsChange();
	};

	TermsLogicMock.prototype.onTermsChange = function onTermsChange() {
		this.termsLSUpdater();
		this.termsChanged.emit(this._terms.toJS());
	};

	_createClass(TermsLogicMock, [{
		key: 'terms',
		get: function get() {
			return this._terms.toJS();
		},
		set: function set(newTerms) {
			this._terms = this._terms.merge(newTerms);
			this.onTermsChange();
		}
	}]);

	return TermsLogicMock;
})();

_a2['default'].Injectable()['for'](TermsLogicMock);

exports['default'] = { TermsLogicMock: TermsLogicMock };
module.exports = exports['default'];

},{"a":"a"}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var _localStorageManagementJs = require('./local-storage-management.js');

var TermsLogic = (function () {
	function TermsLogic(localStorageManagement) {
		var _terms,
		    _this = this;

		_classCallCheck(this, TermsLogic);

		this.termsChanged = new ng.core.EventEmitter();

		_.assign(this, {
			localStorageManagement: localStorageManagement
		});

		this._terms = [];

		var oldData = this.localStorageManagement.load('terms');
		if (!oldData.length) oldData = [];
		console.log(oldData);
		(_terms = this._terms).push.apply(_terms, oldData);
		this._terms = Immutable.fromJS(this._terms);
		this.termsLSUpdater = this.localStorageManagement.save('terms', function () {
			return _this._terms.toJS();
		});
	}

	TermsLogic.prototype.addTerm = function addTerm(newTerm) {
		this._terms = this._terms.push(Immutable.fromJS(_extends({ id: this.guid() }, newTerm)));
		this.onTermsChange();
	};

	TermsLogic.prototype.updateTermByValue = function updateTermByValue(term, mergeValue) {
		var _terms$findEntry = this._terms.findEntry(function (value, key) {
			return Immutable.is(Immutable.fromJS(term), value);
		});

		var index = _terms$findEntry[0];

		if (index < 0) throw new Error('Index out of bound.');
		this.updateTermByIndex(index, mergeValue);
	};

	TermsLogic.prototype.updateTermById = function updateTermById(id, mergeValue) {
		var _terms$findEntry2 = this._terms.findEntry(function (term) {
			return term.get('id') == id;
		});

		var index = _terms$findEntry2[0];

		this.updateTermByIndex(index, mergeValue);
	};

	TermsLogic.prototype.updateTermByIndex = function updateTermByIndex(index, mergeValue) {
		this._terms = this._terms.mergeIn([index], mergeValue);
		this.onTermsChange();
	};

	TermsLogic.prototype.deleteTermByValue = function deleteTermByValue(term) {
		var _terms$findEntry3 = this._terms.findEntry(function (value, key) {
			return Immutable.is(Immutable.fromJS(term), value);
		});

		var index = _terms$findEntry3[0];

		this.deleteTermByIndex(index);
	};

	TermsLogic.prototype.deleteTermById = function deleteTermById(id) {
		var _terms$findEntry4 = this._terms.findEntry(function (term) {
			return term.get('id') == id;
		});

		var index = _terms$findEntry4[0];

		this.deleteTermByIndex(index);
	};

	TermsLogic.prototype.deleteTermByIndex = function deleteTermByIndex(index) {
		this._terms = this._terms['delete'](index);
		this.onTermsChange();
	};

	TermsLogic.prototype.onTermsChange = function onTermsChange() {
		this.termsLSUpdater();
		this.termsChanged.emit(this._terms.toJS());
	};

	TermsLogic.prototype.guid = function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};

	_createClass(TermsLogic, [{
		key: 'terms',
		get: function get() {
			return this._terms.toJS();
		},
		set: function set(newTerms) {
			this._terms = this._terms.merge(newTerms);
			this.onTermsChange();
		}
	}]);

	return TermsLogic;
})();

TermsLogic.parameters = [new ng.core.Inject(_localStorageManagementJs.LocalStorageManagement)];
_a2['default'].Injectable()['for'](TermsLogic);

exports['default'] = { TermsLogic: TermsLogic };
module.exports = exports['default'];

},{"./local-storage-management.js":11,"a":"a"}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _a = require('a');

var _a2 = _interopRequireDefault(_a);

var _injectablesTermsLogicJs = require('../injectables/terms-logic.js');

var StudyComponent = (function () {
	function StudyComponent(termsLogic, studyScheme) {
		var _this = this;

		_classCallCheck(this, StudyComponent);

		_.assign(this, {
			termsLogic: termsLogic,
			studyScheme: studyScheme,
			// Local properties
			showCorrectAnswer: false
		});

		this.studyLogic = this.studyScheme(this.termsLogic._terms.toJSON());
		this.currentTerm = this.studyLogic.currentTerm;

		this.studyLogic.learnTermEvent.subscribe(function (term) {
			_this.termsLogic.updateTermById(term.id, {
				point: term.point + 1
			});
		});
	}

	// ngOnInit() {
	// }

	StudyComponent.prototype.onSubmit = function onSubmit($event) {
		$event.preventDefault();

		if (this.showCorrectAnswer) {
			this.showCorrectAnswer = false;
			this.studyLogic.next();
			this.currentTerm = this.studyLogic.currentTerm;
		} else {
			var result = this.studyLogic.checkAndUpdate({
				id: this.currentTerm.id,
				field: 'meaning',
				answer: $event.target.answer.value
			});
			console.log('result: ', result);
			this.showCorrectAnswer = true;
		}
		$event.target.reset();
		console.log(this.studyLogic.currentTermIndex, this.studyLogic.currentGroupIndex);
	};

	StudyComponent.prototype.reset = function reset() {
		this.studyLogic.reset();
		this.currentTerm = this.studyLogic.currentTerm;
	};

	return StudyComponent;
})();

StudyComponent.parameters = [new ng.core.Inject(_injectablesTermsLogicJs.TermsLogic), new ng.core.Inject('studyScheme')];
_a2['default'].Component({
	selector: 'study',
	templateUrl: '/app/study'
})['for'](StudyComponent);
exports['default'] = { StudyComponent: StudyComponent };
module.exports = exports['default'];

},{"../injectables/terms-logic.js":13,"a":"a"}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aJs = require('../a.js');

var _aJs2 = _interopRequireDefault(_aJs);

var DisplayTermPipe = (function () {
	function DisplayTermPipe() {
		_classCallCheck(this, DisplayTermPipe);
	}

	DisplayTermPipe.prototype.transform = function transform(val, args) {
		// return `${val.word} is ${val.meaning}. Point: ${val.point}`;

		// Immutable.js
		return val.get('word') + ' is ' + val.get('meaning') + '. Point: ' + val.get('point') + '. Tags: ' + val.get('tags');
	};

	return DisplayTermPipe;
})();

_aJs2['default'].Pipe({
	name: 'displayTerm'
})['for'](DisplayTermPipe);
exports['default'] = { DisplayTermPipe: DisplayTermPipe };
module.exports = exports['default'];

},{"../a.js":"a"}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aJs = require('../a.js');

var _aJs2 = _interopRequireDefault(_aJs);

var _termDisplayTermPipeJs = require('../term/display-term.pipe.js');

var _injectablesTermsLogicJs = require('../injectables/terms-logic.js');

var TermComponent = (function () {
	function TermComponent(termsLogic) {
		_classCallCheck(this, TermComponent);

		_.assign(this, {
			termsLogic: termsLogic,
			// Public variables initialization
			editing: false
		});
	}

	TermComponent.prototype.updateTerm = function updateTerm(wordInput, meaningInput) {
		// console.log(wordInput, meaningInput);
		this.termsLogic.updateTermById(this.term.get('id'), {
			word: wordInput.value,
			meaning: meaningInput.value
		});
	};

	TermComponent.prototype.learnTerm = function learnTerm() {
		this.termsLogic.updateTermById(this.term.get('id'), {
			point: this.term.get('point') + 1
		});
	};

	TermComponent.prototype.deleteTerm = function deleteTerm() {
		this.termsLogic.deleteTermByValue(this.term);
	};

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
	return TermComponent;
})();

TermComponent.parameters = [new ng.core.Inject(_injectablesTermsLogicJs.TermsLogic)];
_aJs2['default'].Component({
	selector: 'term',
	pipes: [_termDisplayTermPipeJs.DisplayTermPipe],
	templateUrl: 'app/term.tmpl',
	inputs: ['term']
})['for'](TermComponent);

exports['default'] = { TermComponent: TermComponent };
module.exports = exports['default'];
// changeDetection: ng.core.ChangeDetectionStrategy.OnPush

},{"../a.js":"a","../injectables/terms-logic.js":13,"../term/display-term.pipe.js":15}],"a":[function(require,module,exports){
'use strict';

var _createAnnotator = createAnnotator();

var register = _createAnnotator.register;
var registerFactory = _createAnnotator.registerFactory;
var annotator = _createAnnotator.annotator;

var a = annotator;

register('Component', ng.core.Component);
register('View', ng.core.View);
register('Directive', ng.core.Directive);
register('Pipe', ng.core.Pipe);
register('RouteConfig', ng.router.RouteConfig);
register('Injectable', ng.core.Injectable);
register('Provide', ng.core.Provider);
// register('Injector', ng.core.Injector);
// register('Inject', ng.core.Inject);

module.exports = a;
function createAnnotator() {
    var registry = {};
    var a = {};

    var A = function A() {
        this._annotations = [];
        this._factories = [];
    };
    A.prototype['for'] = function (SomeClass) {
        var annotations = this._annotations;
        if (SomeClass.annotations) {
            SomeClass.annotations = SomeClass.annotations.concat();
        }
        SomeClass.annotations = this._annotations;
        this._factories.forEach(function (fn, params) {
            fn(SomeClass, params);
        });
        return SomeClass;
    };

    var register = function register(name, impl) {
        registry[name] = impl;
        A.prototype[name] = function (param) {
            var Annotation = registry[name];
            if (typeof param === 'function') {
                this._annotations.push(new Annotation());
                return this['for'](param);
            }
            var Annotation = registry[name];
            this._annotations.push(new Annotation(param));

            // chaining
            return this;
        };
        a[name] = function (param) {
            var instance = new A();
            return instance[name](param);
        };
    };

    var registerFactory = function registerFactory(name, impl) {
        registry[name] = impl;
        A.prototype[name] = function () {
            var args = arguments;
            var fn = registry[name];
            this._factories.push(function (SomeClass) {
                fn(SomeClass, args);
            });

            // chaining
            return this;
        };
        a[name] = function (param) {
            var instance = new A();
            return instance[name](param);
        };
    };

    return {
        annotator: a,
        register: register,
        registerFactory: registerFactory
    };
};

},{}]},{},[1]);
