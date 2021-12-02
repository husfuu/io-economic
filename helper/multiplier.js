const nj = require('numjs');
const mathjs = require('mathjs');

function getAllocationMatrix(transaction, output) {
/**
 * get Allocation matrix
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 * 
 * return => type: numjs obj    
 */
    let indexRow = 0, indexCol = 0;
    const numrow = transaction.shape[0], numcol = transaction.shape[1];
    let allocation = nj.zeros(transaction.shape);

    while (true) {
        let a = transaction.get(indexRow, indexCol) / output.get(indexCol);
        allocation.set(indexRow, indexCol, a)
        
        if (indexRow == (numrow-1)) {
            indexRow = 0;
            indexCol += 1;
        }else{
            indexRow += 1
        }
        if (indexCol == numcol){
            break
        }
    }
    return allocation;
}


function getLeontiefInv(transaction, output){
/**
 * get leontief inverse matrix
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 * 
 * return => type: numjs obj
 */
    const numcol = transaction.shape[1]
    const identity = nj.identity(numcol); // size is (numrow, numcol) 
    const allocation = getAllocationMatrix(transaction, output)
    
    const temp = identity.subtract(allocation)
    const leontiefInv = mathjs.inv(temp.tolist())

    return nj.array(leontiefInv);
}


function getGhoshianInv (transaction, output) {
/**
 * get ghoshian inverse matrix
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 * 
 * return => type: numjs obj
 */
    const numcol = transaction.shape[1]
    const identity = nj.identity(numcol)
    const transactionTranspose = transaction.T
    const allocation = getAllocationMatrix(transactionTranspose, output);
    
    const temp = identity.subtract(allocation);
    const ghoshianInv = mathjs.inv(temp.tolist());

    return nj.array(ghoshianInv);
}


function getImpactAnalysis(transaction, output, scenario) {
/**
 * get output impact of given scenario 
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 *      sector => type: numjs obj | scenario 
 * 
 * return => type: numjs obj
 */

    const leontiefInv = nj.array(getLeontiefInv(transaction, output));
    return nj.dot(leontiefInv, scenario)
}


function getOutputMultiplier(transaction, output) {
/**
 * get output multiplier 
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector 
 * 
 * return => type: numjs obj | output multiplier vector
 */

    let outputMult = nj.zeros(output.shape);
    const leontiefInv = getLeontiefInv(transaction, output)
    const numrow = leontiefInv.shape[0], numcol = leontiefInv.shape[1] 

    for (let j = 0; j < numcol; j++) {
        
        let Oj = 0;
        for (let i = 0; i < numrow; i++){
            Oj += leontiefInv.get(i, j)
        }

        outputMult.set(j, Oj)
    }
    return outputMult;
}

function getIncomeMultiplier(transaction, output, income){
/**
 * get income multiplier 
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 *      sector => type: numjs obj | scenario 
 * 
 * return => type: numjs obj | income multiplier vector
 */
    const leontiefInv = getLeontiefInv(transaction, output);
    const a = nj.divide(income, output);

    return nj.dot(a, leontiefInv);
}

function getEmploymentMultiplier(transaction, output, employment) {
/**
 * get employment multiplier 
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 *      sector => type: numjs obj | scenario 
 * 
 * return => type: numjs obj | employment multiplier vector
 */
    const leontiefInv = getLeontiefInv(transaction, output)
    const w = nj.divide(employment, output);
    
    return nj.dot(w, leontiefInv)
}

function getSupplyMultiplier(transaction, output) {
/**
 * get supply (input) multiplier 
 * 
 * Args:
 *      transaction =>  type: numjs obj | transaction matrix
 *      output => type: numjs obj | ouput vector
 *      sector => type: numjs obj | scenario 
 * 
 * return => type: numjs obj | supply multiplier vector
 */
    const ghoshianInv = getGhoshianInv(transaction, output);
    let supplyMult = nj.zeros(output.shape);
    const numrow = ghoshianInv.shape[0], numcol = ghoshianInv.shape[1]

    for (let j = 0; j < numcol; j++) {
        
        let Oj = 0;
        for (let i = 0; i < numrow; i++) {
            
            Oj += ghoshianInv.get(i, j)
        }
        supplyMult.set(j, Oj)   
    }

    return supplyMult;
}


module.exports = { 
                    getAllocationMatrix, getLeontiefInv, getEmploymentMultiplier, 
                    getGhoshianInv, getImpactAnalysis, getIncomeMultiplier, 
                    getOutputMultiplier, getSupplyMultiplier 
                 };