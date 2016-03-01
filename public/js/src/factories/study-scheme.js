import a from 'a';

class StudyScheme {
	constructor(terms) {
		this.terms = terms; // Mutable object / JSON object

		this.learnTermEvent = new ng.core.EventEmitter();
		this.completeEvent = new ng.core.EventEmitter();

		this.reset();
	}
	divideTermsIntoGroups (terms) {
		return _.chunk(_.shuffle(terms), 7);
	}
	next() {
		if (!this.active) throw new Error('StudyLogic is not active at the moment');

		if (this.groups[this.currentGroupIndex]
			&& this.currentTermIndex < this.groups[this.currentGroupIndex].length) {
			this.currentTermIndex++;
			if (this.groups[this.currentGroupIndex][this.currentTermIndex] &&
				this.groups[this.currentGroupIndex][this.currentTermIndex].pass) {
				return this.next();
			}
		} else {
			if (this.currentGroupIndex < this.groups.length) {
				// Check if some terms in this group are still not passed. If there're, study them.
				if (_.some(this.groups[this.currentGroupIndex], (term) => !term.pass)) {
					console.log(`There're some terms in this group are still not passed, study them.`);
					this.currentTermIndex = _.findIndex(this.groups[this.currentGroupIndex], (term) => !term.pass);
				} else {
					console.log('Next group');
					this.currentTermIndex = 0;
					this.currentGroupIndex++;
				}
			} else {
				return this.complete();
			}
		}

		if (this.currentGroupIndex == this.groups.length 
			|| this.currentTermIndex == this.groups[this.currentGroupIndex].length) {
			this.next();
		}
	}
	complete () {
		console.log('Complete');
		this.completeEvent.emit(null);
		this.active = false;
	}
	check ({ id, field, answer }){
		let term = _.find(this.terms, { id });
		console.log(term[field].toLowerCase(), answer.toLowerCase());
		return term[field].toLowerCase() == answer.toLowerCase();
	}
	checkAndUpdate ({ id, field, answer }) {
		let result = this.check({ id, field, answer });
		if (result) {
			let currentTerm = _.find(this.terms, { id });
			this.learnTermEvent.emit(currentTerm);
			currentTerm.pass = true;
		}
		return result;

	}
	checkAndReact({ id, field, answer }, goToNext = true) {
		if (this.check({ id, field, answer })) {
			let currentTerm = _.find(this.terms, { id });
			this.learnTermEvent.emit(currentTerm);
			currentTerm.pass = true;
		}
		if (goToNext) this.next();
	}
	reset () {
		this.active = true;
		this.groups = this.divideTermsIntoGroups(this.terms);
		for (let term of this.terms) {
			_.assign(term, { pass: false });
		}
		this.currentGroupIndex = 0;
		this.currentTermIndex = 0;
	}
	get currentTerm () {
		return _.get(this.groups, `[${this.currentGroupIndex}][${this.currentTermIndex}]`) || {};
	}
}

export function studyScheme () {
	return function (terms) {
		return new StudyScheme(terms);
	}
}
