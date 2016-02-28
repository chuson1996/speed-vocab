import a from 'a';

class TermsLogicMock {
	constructor () {
		this.termsChanged = new ng.core.EventEmitter();

		this._terms = [];

		// let oldData = this.localStorageManagement.load('terms');
		let oldData = [{
			word: 'Mock word',
			meaning: 'Mock meaning',
			point: -1
		}];
		if (!oldData.length) oldData = [];
		console.log(oldData);
		this._terms.push(...oldData);
		this._terms = Immutable.fromJS(this._terms);
		// this.termsLSUpdater = this.localStorageManagement.save('terms', () => this._terms.toJS());
		this.termsLSUpdater = () => {
			console.log('Update to localStorage');
		};
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

a.Injectable().for(TermsLogicMock);

export default {TermsLogicMock};
