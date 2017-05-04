let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class DistributionReplacementCalculator {

	constructor(distributionObject) {
		this.distributionObject = distributionObject;
		this.distributionObject.replacement_rate = 0;
		this.currentTime = new Date();
		this.maxAgeConditional = new MaxAgeConditionalModel(90, 80, 70);
		this.costObjects = new CostConditionalModel(0, 25, 0, 30, 0, 35, 0, 45, 0, 55);
		this.language = {method: '', distribution: ''};
	}

	conditionCheckforTimeToReplacement() {
		return this.maxAgeConditional[this.distributionObject.condition] - this.distributionObject.average_age_of_pipes;
	}

	getYearsToReplacement() {
		let end_of_useful_life = '';
		let time_to_replacement = this.conditionCheckforTimeToReplacement();

		if (time_to_replacement < 5) {
			time_to_replacement = 5;
			this.distributionObject.replacement_rate = 0.065;
			end_of_useful_life = 'It is already at or is approaching the end of its expected useful life.  The estimated annual replacement rate is 6.5%';
		} else if (time_to_replacement < 20) {
			this.distributionObject.replacement_rate = 0.04;
			end_of_useful_life = `Based on the average age of the distribution system and its condition, it has an expected remaining useful life of ${time_to_replacement} years.  The estimated annual replacement rate is 4%.`;
		} else {
			this.distributionObject.replacement_rate = 0.025;
			end_of_useful_life = `Based on the average age of the distribution system and its condition, it has an expected remaining useful life of ${time_to_replacement} years.  The estimated annual replacement rate is 2.5%.`;
		}
		// console.log('this is dist end of useful life: ', end_of_useful_life);
		// console.log('this is dist time to replacement: ', time_to_replacement);
		return {end_of_useful_life, time_to_replacement};
	}

	getReplacementCost() {

		let costObject = {};
		if (this.distributionObject.average_main_diameter_inches <= 4) {
			costObject = this.costObjects.tiny;
		} else if (this.distributionObject.average_main_diameter_inches <= 6) {
			costObject = this.costObjects.small;
		} else if (this.distributionObject.average_main_diameter_inches <= 8) {
			costObject = this.costObjects.medium;
		} else if (this.distributionObject.average_main_diameter_inches <= 12) {
			costObject = this.costObjects.large;
		} else if (this.distributionObject.average_main_diameter_inches > 24) {
			costObject = this.costObjects.huge;
		}
		return (costObject.variableCosts * ((this.distributionObject.total_length_miles * 1) * 5280));
	}

	getContributionPerYear() {
		let get_years_to_replacement_return = this.getYearsToReplacement();
		let total_replacement_cost = this.getReplacementCost();
		let annual_reserve_fund_contribution_for_replacement = (total_replacement_cost * this.distributionObject.replacement_rate) / (get_years_to_replacement_return.time_to_replacement);
		this.distributionObject.years_to_replacement = get_years_to_replacement_return.time_to_replacement;
		this.distributionObject.total_replacement_cost = total_replacement_cost;
		this.distributionObject.annual_reserve_fund_contribution_for_replacement = (annual_reserve_fund_contribution_for_replacement.toFixed(0) * 1);
		let distributionAlgorithmResults = (`Based on the age, total length, average main diameter, and condition of the distribution system, $${annual_reserve_fund_contribution_for_replacement.toFixed(0)} should be contributed to the Reserve Fund annually to account for its eventual replacement.  The model assumes an annual distribution main replacement rate of 2.5%.  The pricing includes costs for valves, meters, and service lines.  ` + get_years_to_replacement_return.end_of_useful_life);
		return [distributionAlgorithmResults, this.distributionObject];
	}

}

module.exports = DistributionReplacementCalculator;
