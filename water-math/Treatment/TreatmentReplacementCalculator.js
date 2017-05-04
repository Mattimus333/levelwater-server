let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');

class TreatmentReplacementCalculator {

	constructor(treatmentObject) {
		this.treatmentObject = treatmentObject;
		this.currentTime = new Date();
		this.fixedCostsWellReplacement = 0;
		this.costPerGPMWellReplacement = 0;
		this.maxAgeConditional = new MaxAgeConditionalModel(3, 2, 1);
		this.costObjects = new CostConditionalModel(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		this.language = {method: '', treatmentType: ''};
	}

	conditionCheckforTimeToReplacement() {
		let age = this.currentTime.getFullYear() - (this.treatmentObject.year_constructed * 1); //Change to parseint
		return this.maxAgeConditional[this.treatmentObject.condition] - age;
	}

	getYearsToReplacement() {
		let end_of_useful_life = '';
		let time_to_replacement = this.conditionCheckforTimeToReplacement();
		// console.log('this is timeToReplacemet', time_to_replacement);

		if (time_to_replacement < 3) {
			time_to_replacement = 3;
			end_of_useful_life = 'It is already at or is approaching the end of its expected useful life.';
		} else if (time_to_replacement >= 3) {
			end_of_useful_life = `Based on the date it was ${this.language.method} and its condition, the ${this.language.treatmentType} has an expected remaining useful life of ${time_to_replacement} years.`;
		}
		return {end_of_useful_life, time_to_replacement};
	}

	getReplacementCost() {

		let costObject = {};
		if (this.treatmentObject.capacity <= 100) {
			costObject = this.costObjects.tiny;
		} else if (this.treatmentObject.capacity <= 300) {
			costObject = this.costObjects.small;
		} else if (this.treatmentObject.capacity <= 500) {
			costObject = this.costObjects.medium;
		} else if (this.treatmentObject.capacity <= 1000) {
			costObject = this.costObjects.large;
		} else if (this.treatmentObject.capacity > 1000) {
			costObject = this.costObjects.huge;
		}
		return costObject.fixedCosts + (costObject.variableCosts * this.treatmentObject.capacity);
	}

	getContributionPerYear() {
		let get_years_to_replacement_return = this.getYearsToReplacement();
		let total_replacement_cost = this.getReplacementCost();
		let annual_reserve_fund_contribution_for_replacement = (total_replacement_cost) / (get_years_to_replacement_return.time_to_replacement);
		this.treatmentObject.years_to_replacement = get_years_to_replacement_return.time_to_replacement;
		this.treatmentObject.total_replacement_cost = total_replacement_cost;
		this.treatmentObject.annual_reserve_fund_contribution_for_replacement = (annual_reserve_fund_contribution_for_replacement.toFixed(0) * 1);
		let treatmentAlgorithmFindings = (`Based on the age, capacity, and condition of the ${this.treatmentObject.name}, $${annual_reserve_fund_contribution_for_replacement.toFixed(0)} should be contributed to the Reserve Fund annually to account for its eventual replacement.  ` + get_years_to_replacement_return.end_of_useful_life);
		return [treatmentAlgorithmFindings, this.treatmentObject];
	}

}

module.exports = TreatmentReplacementCalculator;
