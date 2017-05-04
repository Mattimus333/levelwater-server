let StorageReplacementCalculator = require('./StorageReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class RedwoodStorageReplacementCalculator extends StorageReplacementCalculator {

	constructor(storageObject) {
		super(storageObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(40, 35, 30); // expected useful life for great/fair/poor redwood finished water storage tank
		this.language = {method: 'constructed', storageType: 'redwood storage tank'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(10000, 2, 120000, 1.5, 350000, 1, 500000, .4, 800000, .25);
	}
}


module.exports = RedwoodStorageReplacementCalculator;
