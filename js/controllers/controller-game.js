class ControllerGame extends Subject
{
    constructor()
    {
        super();

        this.minesweeper = new MinesWeeper();
    }

    getMinesWeeper()
    {
        return this.minesweeper;
    }

    startNewGame()
    {
        this.minesweeper.generateGrid();
        this.notify();
    }

    reveal(row, column)
    {
        this.minesweeper.reveal(row, column);
        this.notify();
    }
}