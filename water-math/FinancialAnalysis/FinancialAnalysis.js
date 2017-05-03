const knex = require('../../knex');


class FinancialAnalysis {

	constructor(ratesFinancesObjectArray, algorithmSourceResults, algorithmTreatmentResults, algorithmStorageResults, algorithmDistributionResults) {
		this.ratesFinancesObject = ratesFinancesObjectArray[0];
		this.algorithmSourceResults = algorithmSourceResults;
		this.algorithmTreatmentResults = algorithmTreatmentResults;
		this.algorithmStorageResults = algorithmStorageResults;
		this.algorithmDistributionResults = algorithmDistributionResults;
		this.criticalInfrastructure = [];
		this.noncriticalInfrastructure = [];
		this.total_source_replacement_costs = 0;
		this.critical_annual_source_replacement_costs = 0;
		this.noncritical_annual_source_replacement_costs = 0;
		this.total_treatment_replacement_costs = 0;
		this.critical_annual_treatment_replacement_costs = 0;
		this.noncritical_annual_treatment_replacement_costs = 0;
		this.total_storage_replacement_costs = 0;
		this.critical_annual_storage_replacement_costs = 0;
		this.noncritical_annual_storage_replacement_costs = 0;
		this.total_distribution_replacement_costs = 0;
		this.annual_distribution_replacement_costs = 0;
		this.annualRevenue = 0;
		this.annualCosts = 0;
		this.annualSurplus = 0;
		this.annualDeficit = 0;
		this.totalFinancialReserves = ratesFinancesObjectArray[0].total_financial_reserves;
		this.annualFinancialReserveSavings = ratesFinancesObjectArray[0].annual_savings_to_financial_reserves;
	}

	getSourceCosts() {
		for (let i =0; i < this.algorithmSourceResults.length; i++) {
			// console.log('this is algorithmSourceResults', this.algorithmSourceResults);
			// console.log('this is algorithmSourceResults:', this.algorithmSourceResults);
			this.total_source_replacement_costs += this.algorithmSourceResults[i][1].total_replacement_cost;
			if (this.algorithmSourceResults[i][1].critical_to_operations === 'true') {
				this.critical_annual_source_replacement_costs += this.algorithmSourceResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let criticalArray = [this.algorithmSourceResults[i][1].source_name, this.algorithmSourceResults[i][1].total_replacement_cost, this.algorithmSourceResults[i][1].years_to_replacement,  this.algorithmSourceResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.criticalInfrastructure.push(criticalArray);
			} else {
				this.noncritical_annual_source_replacement_costs += this.algorithmSourceResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let noncriticalArray = [this.algorithmSourceResults[i][1].source_name, this.algorithmSourceResults[i][1].total_replacement_cost, this.algorithmSourceResults[i][1].years_to_replacement,  this.algorithmSourceResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.noncriticalInfrastructure.push(noncriticalArray);
			}
		}
    // console.log('source critical/noncritical', this.criticalAnnualSourceReplacementCosts, this.noncritical_annual_source_replacement_costs);
	}

	getTreatmentCosts() {
		for (let i =0; i < this.algorithmTreatmentResults.length; i++) {
			// console.log('this is algorithmTreatmentResults:', this.algorithmTreatmentResults);
			this.total_treatment_replacement_costs += this.algorithmTreatmentResults[i][1].total_replacement_cost;
			if (this.algorithmTreatmentResults[i][1].critical_to_operations === 'true') {
				this.critical_annual_treatment_replacement_costs += this.algorithmTreatmentResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let criticalArray = [this.algorithmTreatmentResults[i][1].treatment_name, this.algorithmTreatmentResults[i][1].total_replacement_cost, this.algorithmTreatmentResults[i][1].years_to_replacement,  this.algorithmTreatmentResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.criticalInfrastructure.push(criticalArray);
			} else {
				this.noncritical_annual_treatment_replacement_costs += this.algorithmTreatmentResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let noncriticalArray = [this.algorithmTreatmentResults[i][1].treatment_name, this.algorithmTreatmentResults[i][1].total_replacement_cost, this.algorithmTreatmentResults[i][1].years_to_replacement,  this.algorithmTreatmentResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.noncriticalInfrastructure.push(noncriticalArray);
			}
		}
	}

	getStorageCosts() {
		for (let i =0; i < this.algorithmStorageResults.length; i++) {
			// console.log('this is algorithmStorageResults:', this.algorithmStorageResults);
			this.total_storage_replacement_costs += this.algorithmStorageResults[i][1].total_replacement_cost;
			if (this.algorithmStorageResults[i][1].critical_to_operations === 'true') {
				this.critical_annual_storage_replacement_costs += this.algorithmStorageResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let criticalArray = [this.algorithmStorageResults[i][1].reservoir_name, this.algorithmStorageResults[i][1].total_replacement_cost, this.algorithmStorageResults[i][1].years_to_replacement,  this.algorithmStorageResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.criticalInfrastructure.push(criticalArray);
			} else {
				this.noncritical_annual_storage_replacement_costs += this.algorithmStorageResults[i][1].annual_reserve_fund_contribution_for_replacement;
				let noncriticalArray = [this.algorithmStorageResults[i][1].reservoir_name, this.algorithmStorageResults[i][1].total_replacement_cost, this.algorithmStorageResults[i][1].years_to_replacement,  this.algorithmStorageResults[i][1].annual_reserve_fund_contribution_for_replacement];
				this.noncriticalInfrastructure.push(noncriticalArray);
			}
		}
    // console.log('storage critical/noncritical', this.criticalAnnualStorageReplacementCosts, this.noncriticalAnnualStorageReplacementCosts);
	}

	getDistributionCosts() {
		this.total_distribution_replacement_costs += this.algorithmDistributionResults[0][1].total_replacement_cost;
		this.annual_distribution_replacement_costs += this.algorithmDistributionResults[0][1].annual_reserve_fund_contribution_for_replacement;
		let criticalArray = [this.algorithmDistributionResults[0][1].distribution_name, this.total_distribution_replacement_costs, this.algorithmDistributionResults[0][1].years_to_replacement, this.algorithmDistributionResults[0][1].annual_reserve_fund_contribution_for_replacement];
		this.criticalInfrastructure.push(criticalArray);    // console.log('distribution total/annual', this.total_distribution_replacement_costs, this.annual_distribution_replacement_costs);
	}

	getFinancialPicture() {
    // console.log(this.ratesFinancesObject);
		this.annualRevenue = ((this.ratesFinancesObject.annual_revenue_water_sales * 1) + (this.ratesFinancesObject.annual_revenue_fees_charged * 1) + (this.ratesFinancesObject.annual_revenue_subsidies * 1));
		this.annualCosts = ((this.ratesFinancesObject.annual_personnel_costs * 1) + (this.ratesFinancesObject.annual_operations_costs * 1) + (this.ratesFinancesObject.annual_debt_costs * 1));

		if (this.annualRevenue > this.annualCosts) {
			this.annualSurplus = this.annualRevenue - this.annualCosts;
		} else {
			this.annualDeficit = this.annualCosts - this.annualRevenue;
		}
	}

	getContributionPerYear() {
		let sourceCosts = this.getSourceCosts();
		let treatmentCosts = this.getTreatmentCosts();
		let storageCosts = this.getStorageCosts();
		let distributionCosts = this.getDistributionCosts();
		let financialPicture = this.getFinancialPicture();
		let algorithm_results_object = { 'ratesFinancesObject': this.ratesFinancesObject, 'criticalInfrastructure': this.criticalInfrastructure, 'noncriticalInfrastructure': this.noncriticalInfrastructure};
		console.log('sup sasha');
		// algorithm_results_object = '1';
		// console.log(algorithm_results_object);
		return algorithm_results_object;
	}
};

module.exports = FinancialAnalysis;
