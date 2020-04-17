class MinesWeeperApp
{
    constructor()
    {
        this.controller = new ControllerGame();
        this.viewGame = new ViewGame(this.controller);
        this.viewGameOver = new viewGameOver(this.controller);

        this.controller.startNewGame();
    }
}


$(window).ready(() =>
{
    let app = new MinesWeeperApp();
});