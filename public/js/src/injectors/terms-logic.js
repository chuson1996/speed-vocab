import a from 'a';
import {LocalStorageManagement} from './local-storage-management.js';

class TermsLogic {
	constructor (localStorageManagement) {
		this.termsChanged = new ng.core.EventEmitter();

		_.assign(this, {
			localStorageManagement
		})

		this._terms = [];

		let oldData = this.localStorageManagement.load('terms');
		if (!oldData.length) oldData = [];
		console.log(oldData);
		this._terms.push(...oldData);
		this._terms = Immutable.fromJS(this._terms);
		this.termsLSUpdater = this.localStorageManagement.save('terms', () => this._terms.toJS());
	}
	get terms () {
		return this._terms.toJS();
	}
	set terms (newTerms) {
		this._terms = this._terms.merge(newTerms);
		this.onTermsChange();
	}
	addTerm (newTerm) {
		this._terms = this._terms.push(Immutable.fromJS(newTerm));
		this.onTermsChange();
	}

	updateTermByValue (term, mergeValue) {
		let [index] = this._terms.findEntry((value, key) => {
			return Immutable.is(Immutable.fromJS(term), value);
		});
		if (index < 0) throw new Error('Index out of bound.');
		this.updateTermByIndex(index, mergeValue);
	}
	updateTermByIndex (index, mergeValue) {
		this._terms = this._terms.mergeIn([index], mergeValue);
		this.onTermsChange();
	}
	
	deleteTermByValue (term) {
		let [index] = this._terms.findEntry((value, key) => {
			return Immutable.is(Immutable.fromJS(term), value);
		});
		this.deleteTermByIndex(index);
	}
	deleteTermByIndex (index) {
		this._terms = this._terms.delete(index);
		this.onTermsChange();
	}

	onTermsChange () {
		this.termsLSUpdater();
		this.termsChanged.emit(this._terms.toJS());
	}
}
TermsLogic.parameters = [
	new ng.core.Inject(LocalStorageManagement)
];
a.Injectable().for(TermsLogic);

export default {TermsLogic};
