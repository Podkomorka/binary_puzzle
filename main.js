generateGrid()

function generateGrid() {
    // Starting grid
    let grid = [[1, 1, 1, 0, 0, 0],
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
        swapType ? grid = swapRandRows(grid) : grid = swapRandRows(rotateGrid(grid))

        if (checkRowDuplicates(grid)) console.log("No row dups")
        if (checkRowDuplicates(rotateGrid(grid))) console.log("No row dups")

        // Check grid for all requirements
        if (checkRowsTriples(grid) && checkRowsTriples(rotateGrid(grid))) {
            console.log("Found a grid in " + count + " tries.")
            console.log(grid)
            break
        }
    
        // Prevent looping too long
        if (count >= 10000 ) {
            console.log("Reached count " + count + ". Too many tries.")
            break;
        }
    
        console.log()
        swapType = !swapType
    }
}

function checkRowDuplicates(inputGrid) {
    let duplicate = false

    for (let i = 0; i < inputGrid.length; i++) {
        for (let k = (i + 1); k < inputGrid.length; k++) {
            if (inputGrid[i].toString() === inputGrid[k].toString()) {
                duplicate = true
                return !duplicate
            }
        }
    }

    return !duplicate
}

function rotateGrid(inputGrid) {
    rotatedGrid = []

    for (let i = 0; i < inputGrid.length; i++) {
        column = []
        inputGrid.forEach((row) => {
            column.push(row[i])
        })

        rotatedGrid.push(column)
    }

    return rotatedGrid
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

    return !triples
}
          
function swapRandRows(inputGrid) {
    // Make array of numbers equal to grid length
    for (var i = 0, rows = []; i < inputGrid.length; i++) {
        rows.push(i)
    }
    
    // Get two random row positions without repeating a position
    const [randRow1] = rows.splice(Math.floor(Math.random()*rows.length - 1), 1)
    const [randRow2] = rows.splice(Math.floor(Math.random()*rows.length - 1), 1)
    
    // Make temporary first row from grid
    const tempRow = inputGrid[randRow1]
    
    // Set the first random row equal to the second random row
    inputGrid[randRow1] = inputGrid[randRow2]
    
    // Set the second random row equal to the temporary row
    inputGrid[randRow2] = tempRow
    
    return inputGrid
}

ar1 = [1,2,3,4]
ar2 = [1,2,3,4]

console.log(ar1.toString() === ar2.toString())