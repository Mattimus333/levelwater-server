let TreatmentReplacementCalculator = require('./TreatmentReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class SWTreatmentReplacementCalculator extends TreatmentReplacementCalculator {

	constructor(treatmentObject) {
		super(treatmentObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(50, 40, 30); // expected useful life for great/fair/poor surface water intake
		this.language = {method: 'constructed', treatmentType: 'conventional surface water treatment plant'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(120000, 100, 200000, 100, 450000, 100, 1000000, 100, 1250000, 100);
	}
}


module.exports = SWTreatmentReplacementCalculator;
