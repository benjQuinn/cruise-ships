const Ship = require('../src/ship');
const Port = require('../src/port');

describe('constructor', () => {
    const portOne = new Port('Liverpool');
    const ship = new Ship(portOne);
    
    it('returns an object', () => {
        expect(new Ship()).toBeInstanceOf(Object);
    });
    it('has a starting port', () => {
        expect(ship.currentPort).toBe(portOne);
    });
});

describe('leavePort', () => {
    const portOne = new Port('Liverpool');
    const ship = new Ship(portOne);

    it('can set sail', () => {
        ship.leavePort();

        expect(ship.currentPort).toBeFalsy();
    });
});

describe('dock', () => {
    const portOne = new Port('Dublin');
    const ship = new Ship(portOne);
    const portTwo = new Port('Dublin');

    it('can dock at a port', () => {
        ship.dock(portTwo);

        expect(ship.currentPort).toBe(portTwo);
    });
});

