let SurfaceWaterSourceReplacementCalculator = require('./Source/SurfaceWaterSourceReplacementCalculator');
let GroundwaterSourceReplacementCalculator = require('./Source/GroundwaterSourceReplacementCalculator');
let SWTreatmentReplacementCalculator = require('./Treatment/SWTreatmentReplacementCalculator');
let IXTreatmentReplacementCalculator = require('./Treatment/IXTreatmentReplacementCalculator');
let CorrosionControlTreatmentReplacementCalculator = require('./Treatment/CorrosionControlTreatmentReplacementCalculator');
let ConcreteStorageReplacementCalculator = require('./Storage/ConcreteStorageReplacementCalculator');
let PlasticStorageReplacementCalculator = require('./Storage/PlasticStorageReplacementCalculator');
let RedwoodStorageReplacementCalculator = require('./Storage/RedwoodStorageReplacementCalculator');
let SteelStorageReplacementCalculator = require('./Storage/SteelStorageReplacementCalculator');
let DistributionReplacementCalculator = require('./Distribution/DistributionReplacementCalculator');
let FinancialAnalysis = require('./FinancialAnalysis/FinancialAnalysis');



let algorithmSourceResults;
let algorithmTreatmentResults;
let algorithmStorageResults;
let algorithmDistributionResults;
let algorithmResultsObject;



// <-------------- ROUTING FUNCTIONS ---------------->

// Initial function which routes source, treatment, storage, and distribution to their respective trees
function startAlgorithm(sourceObjectArray, treatmentObjectArray, storageObjectArray, distributionObjectArray, ratesFinancesObjectArray) {
		// console.log(sourceObjectArray);
	algorithmSourceResults = [];
	algorithmTreatmentResults = [];
	algorithmStorageResults = [];
	algorithmDistributionResults = [];
	algorithmResultsObject = {};
	sourceCheckType(sourceObjectArray);
	treatmentCheckType(treatmentObjectArray);
	storageCheckType(storageObjectArray);
	distributionCheckType(distributionObjectArray);
	return financialCalculation(ratesFinancesObjectArray, algorithmSourceResults, algorithmTreatmentResults, algorithmStorageResults, algorithmDistributionResults);
}


function sourceTypeSwitch(sourceObject) {
	switch (sourceObject.source_type) {
	case ('gw'):
		gwSourceCalculate(sourceObject);
		break;
	case ('sw'):
		swSourceCalculate(sourceObject);
		break;
	}
}

function treatmentTypeSwitch(treatmentObject) {
	switch (treatmentObject.treatment_type) {
	case ('conventional-sw'):
		conventionalSWTreatmentCalculate(treatmentObject);
		break;
	case ('ion-exchange'):
		IXTreatmentCalculate(treatmentObject);
		break;
	case ('corrosion-control'):
		corrosionControlTreatmentCalculate(treatmentObject);
		break;
	}
}

function storageTypeSwitch(storageObject) {
	switch (storageObject.reservoir_type) {
	case ('concrete'):
		concreteStorageCalculate(storageObject);
		break;
	case ('steel'):
		steelStorageCalculate(storageObject);
		break;
	case ('redwood'):
		redwoodStorageCalculate(storageObject);
		break;
	case ('plastic'):
		plasticStorageCalculate(storageObject);
		break;
	}
}

// Checking if system has sources, and then routing each source object to source type switcher
function sourceCheckType(sourceObjectArray) {
	if (sourceObjectArray[0].source_type === undefined) {
		console.log('System has no source information in the database');
	}
	for (let i = 0; i < sourceObjectArray.length; i++) {
		sourceTypeSwitch(sourceObjectArray[i]);
	}
}


// Checking if system has treatment, and then routing each treatment object to treatment object switcher
function treatmentCheckType(treatmentObjectArray) {
	if (treatmentObjectArray[0].treatment_type === undefined) {
		console.log('System has no treatment information in the database');
	}
	for (let i = 0; i < treatmentObjectArray.length; i++) {
		treatmentTypeSwitch(treatmentObjectArray[i]);
	}
}

// Checking if system has storage, and then routing each storage object to storage object switcher
function storageCheckType(storageObjectArray) {
	if (storageObjectArray[0].reservoir_type === undefined) {
		console.log('System has no storage information in the database');
	}
	for (let i = 0; i < storageObjectArray.length; i++) {
		storageTypeSwitch(storageObjectArray[i]);
	}
}

// Checking if system has storage, and then routing each storage object to storage object switcher
function distributionCheckType(distributionObjectArray) {
	if (distributionObjectArray[0].total_length_miles === undefined) {
		console.log('System has no distribution information in the database');
	}
	for (let i = 0; i < distributionObjectArray.length; i++) {
		distributionCalculate(distributionObjectArray[i]);
	}
}

// <-------------- END ROUTING FUNCTIONS ---------------->



// <---------- BEGINNING GROUNDWATER SOURCE ONLY SECTION ------------------------->



// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function gwSourceCalculate(sourceObject) {

	let gwSource = new GroundwaterSourceReplacementCalculator(sourceObject);
	let gwSourceResults = gwSource.getContributionPerYear();
	console.log('sup matt', algorithmSourceResults);
	algorithmSourceResults.push(gwSourceResults);
	// console.log(algorithmSourceResults);
}



// <------------------ END GROUNDWATER SOURCE ONLY SECTION -------------------------->


// <------------- BEGINNING SURFACE WATER SOURCE SECTION ----------------------->

// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function swSourceCalculate(sourceObject) {
	let swSource = new SurfaceWaterSourceReplacementCalculator(sourceObject);
	let swSourceResults = swSource.getContributionPerYear();
	algorithmSourceResults.push(swSourceResults);
	// console.log(algorithmSourceResults);
}


// <------------- END SURFACE WATER SOURCE SECTION ----------------------->



// <------------- BEGINNING TREATMENT SECTION ----------------------->


// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function conventionalSWTreatmentCalculate(treatmentObject) {

	let swTreatmentPlant = new SWTreatmentReplacementCalculator(treatmentObject);
	let swTreatmentResults = swTreatmentPlant.getContributionPerYear();
	algorithmTreatmentResults.push(swTreatmentResults);
}


// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function IXTreatmentCalculate(treatmentObject) {

	let ixTreatmentPlant = new IXTreatmentReplacementCalculator(treatmentObject);
	let ixTreatmentResults = ixTreatmentPlant.getContributionPerYear();
	algorithmTreatmentResults.push(ixTreatmentResults);
}


// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function corrosionControlTreatmentCalculate(treatmentObject) {

	let corrosionControlTreatmentPlant = new CorrosionControlTreatmentReplacementCalculator(treatmentObject);
	let corrosionControlTreatmentResults = corrosionControlTreatmentPlant.getContributionPerYear();
	algorithmTreatmentResults.push(corrosionControlTreatmentResults);
}


// <------------- END TREATMENT SECTION ----------------------->



// <------------- BEGINNING STORAGE SECTION ----------------------->

// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function concreteStorageCalculate(storageObject) {
	let concreteStorageReservoir = new ConcreteStorageReplacementCalculator(storageObject);
	let concreteStorageResults = concreteStorageReservoir.getContributionPerYear();
	algorithmStorageResults.push(concreteStorageResults);
}

// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function steelStorageCalculate(storageObject) {
	let steelStorageReservoir = new SteelStorageReplacementCalculator(storageObject);
	let steelStorageResults = steelStorageReservoir.getContributionPerYear();
	algorithmStorageResults.push(steelStorageResults);
}

// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function redwoodStorageCalculate(storageObject) {
	let redwoodStorageReservoir = new RedwoodStorageReplacementCalculator(storageObject);
	let redwoodStorageResults = redwoodStorageReservoir.getContributionPerYear();
	algorithmStorageResults.push(redwoodStorageResults);
}

// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function plasticStorageCalculate(storageObject) {
	let plasticStorageReservoir = new PlasticStorageReplacementCalculator(storageObject);
	let plasticStorageResults = plasticStorageReservoir.getContributionPerYear();
	algorithmStorageResults.push(plasticStorageResults);
}


// <------------- END STORAGE SECTION ----------------------->

// <------------- BEGINNING DISTRIBUTION SECTION ----------------------->


// Single GW source in great condition, estimating replacement cost in order to determine annual reserve fund contribution needed
function distributionCalculate(distributionObject) {
	let distributionSystem = new DistributionReplacementCalculator(distributionObject);
	let distributionResults = distributionSystem.getContributionPerYear();
	algorithmDistributionResults.push(distributionResults);
}


// <------------- END DISTRIBUTION SECTION ----------------------->


//<------------- BEGINNING COSTS/REVENUE SECTION -------------->

function financialCalculation(ratesFinancesObjectArray, algorithmSourceResults, algorithmTreatmentResults, algorithmStorageResults, algorithmDistributionResults) {
	let financialAnalysis = new FinancialAnalysis(ratesFinancesObjectArray, algorithmSourceResults, algorithmTreatmentResults, algorithmStorageResults, algorithmDistributionResults);
	algorithmResultsObject = financialAnalysis.getContributionPerYear();
	return algorithmResultsObject;
}


//<------------- END COSTS/REVENUE SECTION -------------->


module.exports = startAlgorithm;
