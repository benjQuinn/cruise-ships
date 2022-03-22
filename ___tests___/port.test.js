const Port = require('../src/port');

let portOne;
let shipOne;
let shipTwo;
let shipThree;

beforeEach(() => {
    portOne = new Port('Liverpool');
    shipOne = {};
    shipTwo = {};
    shipThree = {};
});

describe('Port constructor', () => {
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
    it('removes a Ship instance from its ships property', () => {
        portOne.ships = [shipOne, shipTwo, shipThree]
        portOne.removeShip(shipTwo)
        expect(portOne.ships.length).toBe(2);
        expect(portOne.ships).toStrictEqual([shipOne, shipThree]);
    });
});