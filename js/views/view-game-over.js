class viewGameOver extends Observer
{
    /**
     * Constructor
     * @param {any} controller Main controller of the game
     */
    constructor(controller)
    {
        super();

        this._controller = controller;
        this._controller.addObserver(this);

        $('#btn-new').on('click', () => { this._controller.startNewGame(); });
    }

    /**
     * Notification function of the view
     */
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

    /**
     * Displays won message
     */
    displayWon()
    {
        $('#message-content').html('VICTOIRE !');
        $('#message').addClass('visible');
    }

    /**
     * Dispays lost message
     */
    displayLost()
    {
        $('#message-content').html('ECHEC !');
        $('#message').addClass('visible');
    }

    /**
     * Hides message
     */
    hideMessage()
    {
        $('#message').removeClass('visible');
    }
}