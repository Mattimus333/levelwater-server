let SourceReplacementCalculator = require('./SourceReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');

class SurfaceWaterSourceReplacementCalculator extends SourceReplacementCalculator {

	constructor(sourceObject) {
		super(sourceObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(40, 32, 25); // expected useful life for great/fair/poor surface water intake
		this.language = {method: 'constructed', source: 'intake'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(400000, 1000, 550000, 750, 600000, 650, 750000, 450, 1000000, 250)
	}
}


module.exports = SurfaceWaterSourceReplacementCalculator;
