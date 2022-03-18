const Ship = require('../src/ship');
const Port = require('../src/port');
const Itinerary = require('../src/itinerary')


describe('Ship constructor', () => {
    const portOne = new Port('Liverpool');
    const itinerary = new Itinerary([portOne]);
    const ship = new Ship(itinerary);
    
    it('returns an object', () => {
        expect(ship).toBeInstanceOf(Object);
    });

    it('has a starting port', () => {
        expect(ship.currentPort).toBe(portOne);
    });

    it('has a previous port property', () => {
        expect(ship.previousPort).toBe(null)
    });
});

describe('leavePort', () => {
    const portOne = new Port('Liverpool');
    const portTwo = new Port('Dublin');
    const itinerary = new Itinerary([portOne, portTwo]);
    const ship = new Ship(itinerary);
    ship.leavePort();

    it('can set sail', () => {
        expect(ship.currentPort).toBeFalsy();
    });

    it('changes ships previous port', () => {
        expect(ship.previousPort).toBe(portOne);
    });

    
});

describe('dock', () => {
    const portOne = new Port('Liverpool');
    const portTwo = new Port('Dublin');
    const itinerary = new Itinerary([portOne, portTwo]);
    const ship = new Ship(itinerary);
    ship.leavePort();
    ship.dock();

    it('can dock at another port', () => {
        expect(ship.currentPort).toBe(portTwo);
    });

    it('can\'t sail further than its itinerary', () => {
        expect(() => ship.leavePort()).toThrowError('End of itinerary reached');
    });
});

