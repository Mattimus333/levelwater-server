class CostConditionalModel {
	constructor(num0, num1, num2, num3, num4, num5, num6, num7, num8, num9) {
		this.tiny = {fixedCosts: num0, variableCosts: num1};
		this.small = {fixedCosts: num2, variableCosts: num3};
		this.medium = {fixedCosts: num4, variableCosts: num5};
    this.large = {fixedCosts: num6, variableCosts: num7};
    this.huge = {fixedCosts: num8, variableCosts: num9};
	}
}

module.exports = CostConditionalModel;
