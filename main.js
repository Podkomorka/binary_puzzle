// Starting grid
const grid = [[1, 1, 1, 0, 0, 0],
              [1, 1, 1, 0, 0, 0],
              [1, 1, 1, 0, 0, 0],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 0, 1, 1, 1]]

// Function: Check if more than two of the same digit in a row
const noTriples = () => {
    return grid[0][0] === 0 && grid[0][1] === 0 && grid[0][2] === 0 && grid[0][3] === 1 && grid[0][4] === 1 && grid[0][5] === 1
        && grid[1][0] === 0 && grid[1][1] === 0 && grid[1][2] === 0 && grid[1][3] === 1 && grid[1][4] === 1 && grid[1][5] === 1
        && grid[2][0] === 0 && grid[2][1] === 0 && grid[2][2] === 0 && grid[2][3] === 1 && grid[2][4] === 1 && grid[2][5] === 1
        && grid[3][0] === 1 && grid[3][1] === 1 && grid[3][2] === 1 && grid[3][3] === 0 && grid[3][4] === 0 && grid[3][5] === 0
        && grid[4][0] === 1 && grid[4][1] === 1 && grid[4][2] === 1 && grid[4][3] === 0 && grid[4][4] === 0 && grid[4][5] === 0
        && grid[5][0] === 1 && grid[5][1] === 1 && grid[5][2] === 1 && grid[5][3] === 0 && grid[5][4] === 0 && grid[5][5] === 0
}

// Function: Swap two random rows of the grid              
const swapRandRows = () => {

    // Make array of numbers equal to grid length
    for (var i = 0, rows = []; i < grid.length; i++) {
        rows.push(i)
    }

    // Get two random row positions without repeating a position
    const [randRow1] = rows.splice(Math.floor(Math.random()*rows.length - 1), 1)
    const [randRow2] = rows.splice(Math.floor(Math.random()*rows.length - 1), 1)

    // Make temporary first row from grid
    const tempRow = grid[randRow1]
    
    // Set the first random row equal to the second random row
    grid[randRow1] = grid[randRow2]

    // Set the second random row equal to the temporary row
    grid[randRow2] = tempRow
}

// Function: Swap two random columns of the grid 
const swapRandCols = () => {
    // Make array of numbers equal to grid length
    for (var i = 0, cols = []; i < grid.length; i++) cols.push(i)

    // Get two random column positions without repeating a position
    const [randCol1] = cols.splice(Math.floor(Math.random()*cols.length - 1), 1)
    const [randCol2] = cols.splice(Math.floor(Math.random()*cols.length - 1), 1)

    // Make temporary first column from grid
    const tempCol = []
    grid.forEach((row) => tempCol.push(row[randCol1]))

    // Set the first random column equal to the second random column
    grid.forEach((_, i) => grid[i][randCol1] = grid[i][randCol2])

    // Set the second random column equal to the temporary column
    grid.forEach((_, i) => grid[i][randCol2] = tempCol[i])
}

// Main loop to swap and check if the grid is legal
let swapType = true
let count = 0
while (true) {
    count++

    // Alternate swapping columns and rows each loop
    swapType ? swapRandCols() : swapRandRows()

    // Check grid for all requirements
    if (noTriples()) {
        console.log("We found a grid in " + count + " tries.")
        console.log(grid)
        break
    }

    // Prevent looping too long
    if (count >= 1000 ) {
        console.log("Reached count " + count + ". Too many tries.")
        break;
    }

    swapType = !swapType
}