class ViewGame extends Observer
{
    /**
     * Constructor
     */
    constructor(controller)
    {
        super();

        this._controller = controller;
        this._controller.addObserver(this);
    }

    notify()
    {
        let minesweeper = this._controller.getMinesWeeper();
        this.display(minesweeper);
    }

    /**
     * Displays the grid of the minesweeper
     */
    display(minesweeper)
    {
        let cells = minesweeper.getCells();
        let htmlGrid = $('#grid');
        htmlGrid.html('');

        for (let iRow = 0; iRow < cells.length; ++iRow)
        {
            let row = cells[iRow];

            let htmlRow = $('<div class="row"></div>');

            for (let iColumn = 0; iColumn < row.length; ++iColumn)
            {
                let cell = cells[iRow][iColumn];

                let htmlCell = $('<div class="cell"></div>');

                if (cell.isRevealed())
                {
                    htmlCell.addClass('revealed');

                    if (cell.isLandmine())
                    {
                        htmlCell.addClass('landmine');
                    }
                    else if (cell.getIndicator() != 0)
                    {
                        htmlCell.html(cell.getIndicator());
                    }
                }

                htmlCell.on('click', () => { this._controller.reveal(iRow, iColumn); });

                htmlRow.append(htmlCell);
            }

            htmlGrid.append(htmlRow);
        }
    }
}