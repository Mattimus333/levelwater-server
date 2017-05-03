let StorageReplacementCalculator = require('./StorageReplacementCalculator');
let MaxAgeConditionalModel = require('../MaxAgeConditionalModel');
let CostConditionalModel = require('../CostConditionalModel');


class SteelStorageReplacementCalculator extends StorageReplacementCalculator {

	constructor(storageObject) {
		super(storageObject);
		this.maxAgeConditional = new MaxAgeConditionalModel(35, 30, 25); // expected useful life for great/fair/poor steel finished water storage tank
		this.language = {method: 'constructed', storageType: 'steel storage tank'}; // language for end of life SW;
		this.costObjects = new CostConditionalModel(50000, 2, 200000, 1.5, 550000, 1, 800000, .4, 1000000, .25);
	}
}


module.exports = SteelStorageReplacementCalculator;
