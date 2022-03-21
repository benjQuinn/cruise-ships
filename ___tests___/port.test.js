const Port = require('../src/port');
const Ship = require('../src/ship');
const Itinerary = require('../src/itinerary')

describe('Port constructor', () => {
    const portOne = new Port('Liverpool');

    it('returns an object', () => {
        expect(new Port()).toBeInstanceOf(Object);
    });

    it('has a name property', () => {
        expect(portOne.name).toBe('Liverpool');
    });

    it('has ships property', () => {
        expect(portOne.ships).toEqual([]);
    });
});

describe('addShip', () => {
    const portOne = new Port('Liverpool');
    const shipOne = {};
    const shipTwo = {};

    it('adds a Ship instance to its ships property', () => {
        expect(portOne.ships.length).toBe(0);
        portOne.addShip(shipOne);
        expect(portOne.ships.length).toBe(1);
        expect(portOne.ships).toStrictEqual([shipOne]);
        portOne.addShip(shipTwo);
        expect(portOne.ships.length).toBe(2);
        expect(portOne.ships).toStrictEqual([shipOne, shipTwo])
    });
});

describe('removeShip', () => {
    const portOne = new Port('Liverpool');
    const shipOne = {};
    const shipTwo = {};
    const shipThree = {};

    // mocks would be useful here....
    it('removes a Ship instance from its ships property', () => {
        portOne.ships = [shipOne, shipTwo, shipThree]
        portOne.removeShip(shipTwo)
        expect(portOne.ships.length).toBe(2);
        expect(portOne.ships).toStrictEqual([shipOne, shipThree]);
    });
});