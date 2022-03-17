class Ship {
    constructor(currentPort) {
        this.currentPort = currentPort;
    }
    leavePort () {
        this.currentPort = null;
    } 
    dock(destination) {
        this.currentPort = destination;
    }






}

module.exports = Ship;