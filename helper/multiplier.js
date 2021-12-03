const mathjs = require('mathjs');


function getAllocationMatrix(transaction, output) {
    /**
     * get Allocation matrix
     * 
     * Args:
     *      transaction =>  type: array | transaction matrix
     *      output => type: array | ouput vector
     * 
     * return => type: Matrix mathjs obj
     */
    let indexRow = 0, indexCol = 0;
    const numrow = mathjs.size(transaction)[0], numcol = mathjs.size(transaction[1])
    
    // const numrow = mathjs.size(transaction)[0] , numcol = mathjs.size(transaction[1]);
    let allocation = mathjs.zeros(mathjs.size(transaction))

    while (true) {
        let t_ij = mathjs.column(transaction, indexCol)[indexRow]; // transaction item in i, j index
        let o_j = output[indexCol]; // output item in j index
        let a = t_ij/o_j; // allocation coefficient
        allocation[indexRow][indexCol] = a; 
        
        if (indexRow == numrow-1) {
            indexRow = 0;
            indexCol += 1;
        }else{
            indexRow += 1
        }
        if (indexCol == numcol){
            break;
        }
    }
    return mathjs.matrix(allocation);
}


function getLeontiefInv(transaction, output){
    /**
     * get leontief inverse matrix
     * 
     * Args:
     *      transaction =>  type: array | transaction matrix
     *      output => type: array | ouput vector
     * 
     * return => type: Matrix mathjs obj
     */
    const numcol = mathjs.size(transaction)[1];
    const identity = mathjs.identity(numcol); // size is (numrow, numcol)
    const allocation = getAllocationMatrix(transaction, output)
    
    const temp = mathjs.subtract(identity, allocation);
    const leontiefInv = mathjs.inv(temp);

    return leontiefInv;
}

function getGhoshianInv (transaction, output) {
    /**
     * get ghoshian inverse matrix
     * 
     * Args:
     *      transaction =>  type: array | transaction matrix
     *      output => type: array | ouput vector
     * 
     * return => type: Matrix mathjs obj
     */
    const numcol = mathjs.size(transaction)[1];
    const identity = mathjs.identity(numcol); // size is (numrow, numcol)
    const transactionTranspose = mathjs.transpose(transaction)
    const allocation = getAllocationMatrix(transactionTranspose, output)
    
    
    const temp = mathjs.subtract(identity, allocation)
    const ghoshianInv = mathjs.inv(temp);

    return ghoshianInv
}

function getImpactAnalysis(transaction, output, scenario) {
    /**
     * get output impact from given scenario 
     * 
     * Args:
     *      transaction =>  type: array | transaction matrix
     *      output => type: array | ouput vector
     *      scenario => type: array | scenario vector
     * 
     * return => type: Matrix mathjs obj
     */

    const leontiefInv = getLeontiefInv(transaction, output);
    return mathjs.multiply(leontiefInv, scenario)
}

function getOutputMultiplier(transaction, output) {
    /**
     * get output multiplier 
     * 
     * Args:
     *      transaction =>  type: array | transaction matrix
     *      output => type: array | ouput vector
     * 
     * return => type: Matrix mathjs obj | output multiplier vector
     */

    let outputMult = mathjs.zeros(mathjs.size(output));
    const leontiefInv = getLeontiefInv(transaction, output);
    const numrow = mathjs.size(transaction)[0], numcol = mathjs.size(transaction)[1]


    for (let j = 0; j < numcol; j++) {
        
        let Oj = 0;
        for (let i = 0; i < numrow; i++){
            Oj += leontiefInv.subset(mathjs.index(i, j));
        }
        outputMult[j] = Oj;
    }
    return outputMult;
}

function getIncomeMultiplier(transaction, output, income){
    /**
     * get income multiplier 
     * 
     * Args:
     *      transaction => type: array | transaction matrix
     *      output => type: array | ouput vector
     *      income => type: array | income vector
     * 
     * return => type: Matrix mathjs obj | income multiplier vector
     */
    const leontiefInv = getLeontiefInv(transaction, output);
    
    const inputMult = mathjs.zeros(mathjs.size(income));
    let a;
    for (let i = 0; i < income.length; i++) {
        a = income[i] / output[i] 
        inputMult[i] = a
    }

    return mathjs.multiply(inputMult, leontiefInv)
}

function getEmploymentMultiplier(transaction, output, employment) {
    /**
     * get employment multiplier 
     * 
     * Args:
     *      transaction => type: array | transaction matrix
     *      output => type: array | ouput vector
     *      employment => type: array | employment
     * 
     * return => type: array | employment multiplier vector
     */
        const leontiefInv = getLeontiefInv(transaction, output)
        
        const employmentMult = mathjs.zeros(mathjs.size(employment))
        let w;
        for (let i = 0; i < employment.length; i++) {
            
            w = employment[i] / output[i]; 
            employmentMult[i] = w;
        }

        return mathjs.multiply(employmentMult, leontiefInv)
    }
    

function getSupplyMultiplier(transaction, output) {
    /**
     * get supply (input) multiplier 
     * 
     * Args:
     *      transaction => type: array | transaction matrix
     *      output => type: array | ouput vector
     * 
     * return => type: Matrix mathjs obj| supply multiplier vector
     */
        const ghoshianInv = getGhoshianInv(transaction, output);

        let supplyMult = mathjs.zeros(mathjs.size(output))
        const numrow = mathjs.size(transaction)[0], numcol = mathjs.size(transaction)[1]

        for (let j = 0; j < numcol; j++) {
            
            let Oj = 0;
            for (let i = 0; i < numrow; i++) {
                Oj += ghoshianInv.subset(mathjs.index(i, j));
            }
            supplyMult[j] = Oj;   
        }
        return supplyMult;
}


module.exports = { 
    getAllocationMatrix,
    getLeontiefInv,
    getGhoshianInv,
    getImpactAnalysis,
    getOutputMultiplier,
    getIncomeMultiplier,
    getEmploymentMultiplier,
    getSupplyMultiplier
}