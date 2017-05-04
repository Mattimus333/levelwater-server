let TreatmentReplacementCalculator = require('./TreatmentReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class CorrosionControlTreatmentReplacementCalculator extends TreatmentReplacementCalculator {

	constructor(treatmentObject) {
		super(treatmentObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(15, 10, 8); // expected useful life for great/fair/poor surface water intake
		this.language = {method: 'constructed', treatmentType: 'corrosion control treatment plant'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(45000, 100, 75000, 100, 200000, 100, 500000, 100, 900000, 100);
	}
}


module.exports = CorrosionControlTreatmentReplacementCalculator;
