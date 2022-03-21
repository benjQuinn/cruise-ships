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
    const portTwo = new Port('Dublin');
    const itinerary = new Itinerary([portOne, portTwo]);
    const ship = new Ship(itinerary);

    it('adds a Ship instance to its ships property', () => {
        portOne.addShip(ship);
        expect(portOne.ships.length).toBe(1);
        expect(portOne.ships).toStrictEqual([ship]);
    });
});

describe('removeShip', () => {
    const portOne = new Port('Liverpool');
    const portTwo = new Port('Dublin');
    const itinerary = new Itinerary([portOne, portTwo]);
    const ship = new Ship(itinerary);
    const shipTwo = new Ship(itinerary);
    const shipThree = new Ship(itinerary);

    // mocks would be useful here....
    it('removes a Ship instance from its ships property', () => {
        portOne.ships = [ship, shipTwo, shipThree]
        portOne.removeShip(shipTwo)
        expect(portOne.ships.length).toBe(2);
        expect(portOne.ships).toStrictEqual([ship, shipThree]);
    });
});