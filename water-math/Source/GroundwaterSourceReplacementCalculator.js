let SourceReplacementCalculator = require('./SourceReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel')


class GroundwaterSourceReplacementCalculator extends SourceReplacementCalculator {

	constructor(sourceObject) {
		super(sourceObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(50, 42, 35); // expected useful life for great/fair/poor groundwater well
		this.costObjects = new CostConditionalModel(400000, 1000, 550000, 750, 600000, 650, 750000, 450, 1000000, 250)
		this.language = {method: 'drilled', source: 'well'}; // language for end of life GW;
	}
}


module.exports = GroundwaterSourceReplacementCalculator;
