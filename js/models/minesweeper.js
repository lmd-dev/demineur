class MinesWeeper
{
    /**
     * Constructor
     */
    constructor()
    {
        this._gridSize = 10;
        this._landmines = 10;
        this._gameStatus = MinesWeeperGameStatus.inProgress;

        this._unrevealedCells = this._gridSize * this._gridSize;
        this._cells = [];

        this.generateGrid();
    }

    //Getter / Setter gridsize
    getGridSize() { return this._gridSize; }
    setGridSize(value) { this._gridSize = value; }

    //Getter / Setter landmines
    getLandmines() { return this._landmines; }
    setLandmines(value) { this._landmines = value; }

    //Getter gamestatus
    getGameStatus() { return this._gameStatus; }

    //Getter cells
    getCells() { return this._cells; }

    /**
     * Generates the grid of the minesweeper 
     */
    generateGrid()
    {
        this._gameStatus = MinesWeeperGameStatus.inProgress;
        this.createCells();
        this.placeLandmines();
        this.computeIndicators();
    }

    /**
     * Creates cells of the grid
     */
    createCells()
    {
        this._cells = [];

        for (let iRow = 0; iRow < this.getGridSize(); ++iRow)
        {
            let row = [];
            for (let iColumn = 0; iColumn < this.getGridSize(); ++iColumn)
            {
                row.push(new Cell());
            }

            this._cells.push(row);
        }

        this._unrevealedCells = this._gridSize * this._gridSize
    }

    /**
     * Places landmines in the grid
     */
    placeLandmines()
    {
        let temp = [];

        for (let iRow = 0; iRow < this._cells.length;  ++iRow)
        {
            let row = this._cells[iRow];

            for (let iColumn = 0; iColumn < row.length; ++iColumn)
            {
                temp.push(row[iColumn]);
            }
        }

        for (let iMine = 0; iMine < this.getLandmines(); ++iMine)
        {
            let index = Math.floor(Math.random() * temp.length);
            
            temp[index].setLandmine(true);

            temp.splice(index, 1);
        }
    }

    /**
     * Computes indocators for all cells of the grid
     */
    computeIndicators()
    {
        for (let iRow = 0; iRow < this._cells.length; ++iRow)
        {
            for (let iColumn = 0; iColumn < this._cells[iRow].length; ++iColumn)
            {
                if(this._cells[iRow][iColumn].isLandmine() == false)
                    this.computeIndicator(iRow, iColumn);
            }
        }
    }

    /**
     * Computes infocator for the given cell
     * @param {any} row Row of the cell
     * @param {any} column Column of the cell
     */
    computeIndicator(row, column)
    {
        let indicator = 0;

        for (let iRow = row - 1; iRow <= row + 1; ++iRow)
        {
            if (iRow >= 0 && iRow < this.getGridSize())
            {
                for (let iColumn = column - 1; iColumn <= column + 1; ++iColumn)
                {
                    if (iColumn >= 0 && iColumn < this.getGridSize())
                    {
                        if (this._cells[iRow][iColumn].isLandmine())
                            ++indicator;
                    }
                }
            }
        }

        this._cells[row][column].setIndicator(indicator);
    }

    /**
     * Reveals a cell of the grid
     * @param {any} row Row of the cell
     * @param {any} column Column of the cell
     */
    reveal(row, column)
    {
        this._cells[row][column].setRevealed(true);
        this._unrevealedCells--;

        if (this._cells[row][column].isLandmine())
            this._gameStatus = MinesWeeperGameStatus.lost;
        else
        {
            if (this._cells[row][column].getIndicator() == 0)
            {
                for (let iRow = row - 1; iRow <= row + 1; ++iRow)
                {
                    if (iRow >= 0 && iRow < this.getGridSize())
                    {
                        for (let iColumn = column - 1; iColumn <= column + 1; ++iColumn)
                        {
                            if (iColumn >= 0 && iColumn < this.getGridSize())
                            {                       
                                if(this._cells[iRow][iColumn].isRevealed() == false)
                                    this.reveal(iRow, iColumn);
                            }
                        }
                    }
                }
            }

            if (this._unrevealedCells == this.getLandmines())
                this._gameStatus = MinesWeeperGameStatus.won;
        }
    }
}