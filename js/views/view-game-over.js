class viewGameOver extends Observer
{
    constructor(controller)
    {
        super();

        this._controller = controller;
        this._controller.addObserver(this);

        $('#btn-new').on('click', () => { this._controller.startNewGame(); });
    }

    notify()
    {
        let gameStatus = this._controller.getMinesWeeper().getGameStatus();

        if (gameStatus == MinesWeeperGameStatus.won)
        {
            this.displayWon();
        }
        else if (gameStatus == MinesWeeperGameStatus.lost)
        {
            this.displayLost();
        }
        else
        {
            this.hideMessage();
        }
    }

    displayWon()
    {
        $('#message-content').html('VICTOIRE !');
        $('#message').addClass('visible');
    }

    displayLost()
    {
        $('#message-content').html('ECHEC !');
        $('#message').addClass('visible');
    }

    hideMessage()
    {
        $('#message').removeClass('visible');
    }
}