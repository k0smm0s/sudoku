/**
  * Return possible range value in matrix;
  * @param {Integer} x Position x zero value
  * @param {Integer} y Position y zero value
  * @param {Array} matrix Unsolved sudoku
 */
function getPossibleValueRange(matrix,x,y){
  let fullRangeVal = new Set([1,2,3,4,5,6,7,8,9]);
  let currRangeVal = [];
  for(let i = 0; i<9; i++){

    if (matrix[i][y] > 0){
      currRangeVal.push(matrix[i][y]);
    }
      
    if (matrix[x][i] > 0){
      currRangeVal.push(matrix[x][i]);
    }
  }

  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (matrix[Math.trunc(x/3)*3+i][Math.trunc(y/3)*3+j] > 0){
        currRangeVal.push(matrix[Math.trunc(x/3)*3+i][Math.trunc(y/3)*3+j]);
      }
    }   
  }

  currRangeVal = new Set(currRangeVal);
  return Array.from(new Set([...fullRangeVal].filter(x => !currRangeVal.has(x)))); 
}

/**
* Recursive brouteForce correct value for sudoku
* @param {Array} matrix Sudoku for solving
* @returns {Array} matrix Solving sudoku
*/
module.exports = function solveSudoku(matrix) {
  var solvedSudoku = [];

  for(let x = 0; x < 9; x++){
    for (let y = 0; y < 9; y++){
      if (matrix[x][y] == 0){
        let possibleValueRange = getPossibleValueRange(matrix,x,y);
        for(let i = 0; i < possibleValueRange.length; i++){
          matrix[x][y] = possibleValueRange[i];

          if ((solvedSudoku = solveSudoku(matrix))){
            return solvedSudoku;
          }
        }
        matrix[x][y] = 0;
        return false;
      }
    }
  }
  return matrix;
}