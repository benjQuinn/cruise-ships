class Port {
    constructor(name) {
        this.name = name;
        this.ships = [];
    }
    addShip (ship) {
        this.ships.push(ship);
    }
    removeShip (ship) {
        this.ships.splice(this.ships.indexOf(ship), 1);
    }
}





module.exports = Port;