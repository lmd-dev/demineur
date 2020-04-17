class Cell
{
    /**
     * Constructor
     */
    constructor()
    {
        this._landmine = false;
        this._revealed = false;
        this._indicator = 0;
    }

    //Getter / Setter landmine
    isLandmine() { return this._landmine; }
    setLandmine(value) { this._landmine = value; }

    //Getter / Setter revealed
    isRevealed() { return this._revealed; }
    setRevealed(value) { this._revealed = value; }

    //Getter / Setter indicator
    getIndicator() { return this._indicator; }
    setIndicator(value) { this._indicator = value; }
}