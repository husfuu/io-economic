const { typeOf } = require('mathjs');
const multiplier = require('./multiplierRev')

const transaction = [
    [16, 5, 24, 10, 6, 17, 10,	0], 
    [7.2, 17, 11, 48, 26, 0, 8, 0],
    [43, 82, 33, 13, 17, 81, 51, 4],
    [35, 9, 93, 7, 19, 99, 30, 2],
    [19, 20, 19, 6,	59,	16,	16,	0],
    [15, 15, 99, 45, 66, 11, 12, 7],
    [25, 22, 47, 4,	42, 26, 45, 1],
    [0, 0, 75, 0, 12, 7, 12, 3]
]

const output = [700, 320, 607, 432, 375, 345, 561, 187];

const finDemand = [20005.1, 13538.6, 55734.3, 1541.1, 36438.9, 55488.5, 25897.0, -842.1]

const income = [29870.9, 18720.0, 66563.8, 2607.0, 19007.7, 69883.0, 10194.2, 173.1]

const employement = [10, 20, 30, 52, 10, 75, 51, 40];


// scenario 1
const s1 = [50, 10, 10, 30, 18, 88, 37, 70];
// scenario 2
const s2 = [0, 20, 0, 0, 0, 0, 0, 0];
// scenario 3
const s3 = [0, 0, 0, 1, 0, 0, 0, 0];


// result 
const allocation = multiplier.getAllocationMatrix(transaction, output); 
console.log(allocation);
console.log(typeOf(allocation));

console.log("=================== leontief Inverse =================== ");

const leontiefInv = multiplier.getLeontiefInv(transaction, output)
console.log(leontiefInv);
console.log(typeOf(leontiefInv));

console.log("=================== ghoshian Inverse =================== ");

const ghoshianInv = multiplier.getGhoshianInv(transaction, output)
console.log(ghoshianInv);
console.log(typeOf(ghoshianInv));

console.log("=================== impact analysis =================== ");

const impactAnalysis = multiplier.getImpactAnalysis(transaction, output, s1)
console.log(impactAnalysis);
console.log(typeOf(impactAnalysis));

console.log("=================== Output Multiplier =================== ");

const outputMult = multiplier.getOutputMultiplier(transaction, output)
console.log(outputMult);
console.log(typeOf(outputMult));

console.log("=================== Income Multiplier =================== ");

const incomeMult = multiplier.getIncomeMultiplier(transaction, output, income)
console.log(incomeMult);
console.log(typeOf(incomeMult));

console.log("=================== Employmet Multiplier =================== ");

const employementMult = multiplier.getEmploymentMultiplier(transaction, output, employement)
console.log(employementMult);
console.log(typeOf(employementMult));

console.log("=================== Supply Multiplier =================== ");

const supplyMult = multiplier.getSupplyMultiplier(transaction, output)
console.log(supplyMult);
console.log(typeOf(supplyMult));

// console.log(multiplier.getLeontiefInv(A2, Output21));
// console.log(multiplier.getGhoshianInv(A2, Output21));
// console.log(multiplier.getImpactAnalysis(A2, Output21, s1));
// console.log(multiplier.getOutputMultiplier(A2, Output21));
// console.log(multiplier.getIncomeMultiplier(A2, Output21, income));
// console.log(multiplier.getEmploymentMultiplier(A2, Output21, employement));
// console.log(multiplier.getSupplyMultiplier(A2, Output21));