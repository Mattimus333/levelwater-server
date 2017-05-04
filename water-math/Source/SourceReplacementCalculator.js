let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class SourceReplacementCalculator {

	constructor(sourceObject) {
		this.sourceObject = sourceObject;
		this.currentTime = new Date();
		this.maxAgeConditional = new MaxAgeConditionalModel(3, 2, 1);
		this.costObjects = new CostConditionalModel(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		this.language = {method: '', source: ''};
	}

	conditionCheckforTimeToReplacement() {
		let age = this.currentTime.getFullYear() - (this.sourceObject.year_constructed * 1); //Change to parseint
		return this.maxAgeConditional[this.sourceObject.condition] - age;
	}


	getYearsToReplacement() {
		let end_of_useful_life = '';
		let time_to_replacement = this.conditionCheckforTimeToReplacement();

		if (time_to_replacement < 5) {
			time_to_replacement = 5;
			end_of_useful_life = 'It is already at or is approaching the end of its expected useful life.';
		} else if (time_to_replacement >= 5) {
			end_of_useful_life = `Based on the date it was ${this.language.method} and its condition, the ${this.language.source} has an expected remaining useful life of ${time_to_replacement} years.`;
		}
		return {end_of_useful_life, time_to_replacement};
	}


	getReplacementCost() {
		let costObject = {};
		if (this.sourceObject.capacity <= 100) {
			costObject = this.costObjects.tiny;
		} else if (this.sourceObject.capacity <= 300) {
			costObject = this.costObjects.small;
		} else if (this.sourceObject.capacity <= 500) {
			costObject = this.costObjects.medium;
		} else if (this.sourceObject.capacity <= 1000) {
			costObject = this.costObjects.large;
		} else if (this.sourceObject.capacity > 1000) {
			costObject = this.costObjects.huge;
		}
		return costObject.fixedCosts + (costObject.variableCosts * this.sourceObject.capacity);
	}

	getContributionPerYear() {
		let get_years_to_replacement_return = this.getYearsToReplacement();
		let total_replacement_cost = this.getReplacementCost();
		let annual_reserve_fund_contribution_for_replacement = (total_replacement_cost) / (get_years_to_replacement_return.time_to_replacement);
		this.sourceObject.years_to_replacement = get_years_to_replacement_return.time_to_replacement;
		this.sourceObject.total_replacement_cost = total_replacement_cost;
		this.sourceObject.annual_reserve_fund_contribution_for_replacement = (annual_reserve_fund_contribution_for_replacement.toFixed(0) * 1);
		let sourceAlgorithmFindings = (`Based on the age, capacity, and condition of the ${this.sourceObject.source_name}, $${annual_reserve_fund_contribution_for_replacement.toFixed(0)} should be contributed to the Reserve Fund annually to account for its eventual replacement.  ` + get_years_to_replacement_return.end_of_useful_life);
		return [sourceAlgorithmFindings, this.sourceObject];
	}

}

module.exports = SourceReplacementCalculator;
