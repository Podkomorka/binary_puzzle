// Starting grid
const grid = [[1, 1, 1, 0, 0, 0],
              [1, 1, 1, 0, 0, 0],
              [1, 1, 1, 0, 0, 0],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 0, 1, 1, 1],
              [0, 0, 0, 1, 1, 1]]


// Main loop to swap and check if the grid is legal
let swapType = true
let count = 0
while (true) {
    count++

    // Alternate swapping columns and rows each loop
    swapType ? swapRandCols() : swapRandRows()

    // Check grid for all requirements
    if (checkTriples()) {
        console.log("Found a grid in " + count + " tries.")
        console.log(grid)
        break
    }

    // Prevent looping too long
    if (count >= 1000 ) {
        console.log("Reached count " + count + ". Too many tries.")
        break;
    }

    const currentGrid = [...grid]
    console.log(currentGrid)

    swapType = !swapType
}

// Function check duplicate rows and columns

function checkTriples() {
    if (checkRowsTriples(grid)) {
        console.log("Triples in rows")
        return false
    }

    if (checkColsTriples()) {
        console.log("Triples in cols")
        return false
    }

    return true
}

function checkColsTriples() {
    let triples = false
    columnsAsRows = []

    for (let i = 0; i < grid.length; i++) {
        column = []
        grid.forEach((row) => {
            column.push(row[i])
            
        })

        columnsAsRows.push(column)
    
        if (checkRowsTriples(columnsAsRows)) {
            triples = true
        }
    }

    return triples
}

function checkRowsTriples(inputGrid) {
    let triples = false

    inputGrid.forEach((row) => {
        let count = 1
        let lastNum = row[0]
    
        row.forEach((num, i) => {
            if (i < 1) {
                return
            }
            if (num === lastNum) {
                count++
            }
            else {
                count = 1
            }

            if (count === 3) {
                triples = true
            }

            lastNum = num         
        })  
    })

    return triples
}
          
function swapRandRows() {

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

function swapRandCols() {
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