let StorageReplacementCalculator = require('./StorageReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class ConcreteStorageReplacementCalculator extends StorageReplacementCalculator {

	constructor(storageObject) {
		super(storageObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(30, 28, 25); // expected useful life for great/fair/poor concrete finished water storage tank
		this.language = {method: 'constructed', storageType: 'concrete storage tank'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(50000, 2, 200000, 1.5, 550000, 1, 800000, .4, 1000000, .25);
	}
}


module.exports = ConcreteStorageReplacementCalculator;
