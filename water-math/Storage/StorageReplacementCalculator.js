let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');

class StorageReplacementCalculator {

	constructor(storageObject) {
		this.storageObject = storageObject;
		this.currentTime = new Date();
		this.maxAgeConditional = new MaxAgeConditionalModel(3, 2, 1);
		this.costObjects = new CostConditionalModel(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		this.language = {method: '', storageType: ''};
	}

	conditionCheckforTimeToReplacement() {
		let age = this.currentTime.getFullYear() - (this.storageObject.year_constructed * 1); //Change to parseint
		return this.maxAgeConditional[this.storageObject.condition] - age;
	}

	getYearsToReplacement() {
		let end_of_useful_life = '';
		let years_to_replacement = this.conditionCheckforTimeToReplacement();
		// console.log('this is timeToReplacemet', years_to_replacement);

		if (years_to_replacement < 5) {
			years_to_replacement = 5;
			end_of_useful_life = 'It is already at or is approaching the end of its expected useful life.';
		} else if (years_to_replacement >= 5) {
			end_of_useful_life = `Based on the date it was ${this.language.method} and its condition, the ${this.language.storageType} has an expected remaining useful life of ${years_to_replacement} years.`;
		}
		return {end_of_useful_life, years_to_replacement};
	}

	getReplacementCost() {

		let costObject = {};
		if (this.storageObject.capacity <= 15000) {
			costObject = this.costObjects.tiny;
		} else if (this.storageObject.capacity <= 100000) {
			costObject = this.costObjects.small;
		} else if (this.storageObject.capacity <= 500000) {
			costObject = this.costObjects.medium;
		} else if (this.storageObject.capacity <= 1000000) {
			costObject = this.costObjects.large;
		} else if (this.storageObject.capacity > 1000000) {
			costObject = this.costObjects.huge;
		}
		return costObject.fixedCosts + (costObject.variableCosts * this.storageObject.capacity);
	}

	getContributionPerYear() {
		let get_years_to_replacement_return = this.getYearsToReplacement();
		let total_replacement_cost = this.getReplacementCost();
		let annual_reserve_fund_contribution_for_replacement = (total_replacement_cost) / (get_years_to_replacement_return.years_to_replacement);
		this.storageObject.years_to_replacement = get_years_to_replacement_return.years_to_replacement;
		this.storageObject.total_replacement_cost = total_replacement_cost;
		this.storageObject.annual_reserve_fund_contribution_for_replacement = (annual_reserve_fund_contribution_for_replacement.toFixed(0) * 1);
		let storageAlgorithmFindings = `Based on the age, capacity, and condition of the ${this.storageObject.name}, $${annual_reserve_fund_contribution_for_replacement.toFixed(0)} should be contributed to the Reserve Fund annually to account for its eventual replacement.  ` + get_years_to_replacement_return.end_of_useful_life;
		return [storageAlgorithmFindings, this.storageObject];
	}

}

module.exports = StorageReplacementCalculator;
