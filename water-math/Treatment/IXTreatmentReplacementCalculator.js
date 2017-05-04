let TreatmentReplacementCalculator = require('./TreatmentReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class IXTreatmentReplacementCalculator extends TreatmentReplacementCalculator {

	constructor(treatmentObject) {
		super(treatmentObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(15, 12, 8); // expected useful life for great/fair/poor surface water intake
		this.language = {method: 'constructed', treatmentType: 'ion exchange treatment plant'}; // language for end of life IX;
		this.costObjects = new CostConditionalModel(85000, 100, 125000, 100, 300000, 100, 650000, 100, 1000000, 100);
	}
}


module.exports = IXTreatmentReplacementCalculator;
